#!/bin/bash

#############################################################################
#
#  makespatial - version 2024030401/pre-alpha
#
#  by Scott Garrett
#
#  This is a program that will take a 3D movie, either side-by-side or
#  over/under, and split the frames apart and then merge them back together
#  in the MV-HEVC (i.e. "Spatial") format that is now the defacto 3D format
#  for the Apple Vision Pro and the Oculus Quest series.
#
#  It attempts to make educated guesses about the frames and act upon them,
#  but it may guess wrong.  Some things can be over-ridden with parameters,
#  but you might have to perform some of the steps by hand for really oddball
#  sources.
#

trap 'rm -rf /tmp/*.$$ *.$$ *.$$.* ; exit 0' 0 1 2 3 13 15

# If you are doing batches of movies, it's a good idea to run this before
# as your available space may go away as it is snapshotting all the huge
# temporary files.  The Finder may tell you that there is a lot of free space
# but the commands may confusingly tell you that you are out of space because
# not all of them are snapshot aware.  As long as you are getting your disk
# based Time Machine backups, there is no harm in removing local snapshots;
# they just provide faster recovery in the event you need to restore a file.

# sudo tmutil deletelocalsnapshots /

# To determine crop automatically:
# ffmpeg -ss 00:15:00 -t 10 -i <file> -vf cropdetect -f null - 2>&1 | awk '/crop/{print $NF}' | tail -n 1

FFMPEG="ffmpeg -loglevel quiet -stats -hide_banner"
AAC_TRACK_NAMES=""

# Set some default settings here.  Most content is in SBS,so
# I set that as the default format.

LEFT=left
RIGHT=right

DUAL=0
SBS=1
OU=0
SCALE=1
GRAYSCALE=""

# This is a faster encoder than prores_ks, but does not support scaling.  It is the better
# choice for full frame encodes, but will not work for half-frame video if you scale
# the frames from half to full.  I believe setting the DAR (display aspect ratio) is all
# that is necessary, but the option to scale is available with -h (half-height with scale).
# If you select that, it will change the codec to prores_ks.
#
PRORES=prores_videotoolbox

# This is the ffmpeg scaling algorithm.  It is really only needed if you are actually scaling
# (with -h).  Bicubic is the ffmpeg default, so I set that as the default.  See the ffmpeg
# documentation for other options.  In my experiments, I didn't see a marked difference.

SCALE_ALGORITHM=bicubic

# This is the storage aspect ratio, and you should not likely change it unless you know exactly
# what it is. See https://en.wikipedia.org/wiki/Display_aspect_ratio for more information than
# you would ever want.
#
SAR=1

# This is the display aspect ratio.  It should be set to the final aspect ratio of one eye;
# most likely 16/9, but could be a number of others.  Leave the parameter alone to have
# the script choose for you; it will handle most cases, but you may need to override for
# unusual settings.
#
# This will either be set by parameter, or if not explicitly set, derived from the original file.
DAR=0

# This is a constant quality setting, ranging from 0 to 100.  It is the same as the CQ value
# in HandBrake for the VideoToolbox H.265 encoder.

QUALITY=52

# Force detection of borders and crop them out.  Occasionally causes errors if the cropped
# left and right images are not exactly the same.  They should be, but in testing occasionally
# produce different sized streams which will cause the spatializer to throw an error.

CROP=0
CROP_FAST=0

while getopts cCl:q:a:d:sorkhg OPTION
do
        case "$OPTION"
        in
            c) CROP=1
               FAST_CROP=0
               ;;
            C) CROP=1
               CROP_FAST=1
               ;;
            l) SCALE_ALGORITHM=${OPTARG}
               ;;
            q) QUALITY=${OPTARG}
               ;;
            a) SAR=${OPTARG}
               ;;
            d) DAR=${OPTARG}
               ;;
            s) DUAL=0
               SBS=1
               OU=0
               ;;
            o) DUAL=0
               SBS=0
               OU=1
               ;;
            r) LEFT=right
               RIGHT=left
               ;;
            k) PRORES=prores_ks
               ;;
            # the videotoolbox version of prores does not seem to allow scaling, so
            # use the prores_ks encoder for half frame source regardless.
            h) SCALE=2
               PRORES=prores_ks
               ;;
            g) GRAYSCALE=",monochrome"
               ;;
            \?)     echo
                    echo "${0}"
                    echo
                    echo "    -c : Scan and crop both left and right eye."
                    echo "    -C : Scan left eye, and crop using left data for both eyes."
                    echo
                    echo "    -d : Set DAR - Display Aspect Ratio formatted as H/W"
                    echo "    -a : Set SAR - Storage Aspect Ratio formatted as H/W (default 1/1)"
                    echo
                    echo "    -q : VideoToolbox constant quality value (0-100); default 52."
                    echo
                    echo "    -s : File is a Side by Side track"
                    echo "    -o : File is a Over/Under track"
                    echo
                    echo "    -k : Use software prores encoder instead of VideoToolbox.  Use if you get an error."
                    echo "    -h : Scale the 'squished' dimension using ffmpeg - Generally not necessary."
                    echo "    -l : Scaling algorithm (default bicubic).  See ffmpeg documentation."
                    echo "    -g : Use a grayscale filter, removing color information."
                    echo
                    echo "    -r : Reverse the eyes - Swap left and right"
                    exit 0
                    ;;
        esac
done

# Need this to get the file name at the end.
#
shift $(( $OPTIND - 1 ))

FILE=${1}

echo "#############################################################################"
echo "Spatializing ${FILE##*/}..."
echo "#############################################################################"

if [ "${DAR}" == "0" ]
then
    DAR=$( ffprobe -v error -select_streams v:0 -show_entries stream=display_aspect_ratio -of default=noprint_wrappers=1:nokey=1 "${FILE}" | tr ':' ' ' )

    if [ "${DAR}" == "N/A" ]
    then
        echo "No aspect ratio detected.  Setting to 1/1 which is probably not right."
        DAR="1 1"
    fi

    # Some sources use DAR to double the width.  Since we are splitting them, we need to use
    # half that value. Aspect ratios vary a lot, but almost never are greater than 2.6, so if
    # it is, it's most likely a double-width aspect ratio for the side-by-side 3d, so this
    # will half that, to make the single frames the correct aspect ratio.  This can be
    # overridden if it guesses wrong.

    DAR=$( echo ${DAR} | awk '{ if ( $1 / $2 > 2.6 ) printf "%d/%d\n",$1/2,$2; else printf "%d/%d\n",$1,$2; }' )
fi

if [ "${DUAL}" -eq 1 ]
then
    # Dual track mp4 extract
    echo "Extracting dual track video..."
    ${FFMPEG} -i "${FILE}" -c:v copy -an -sn -map 0:0 -map_chapters -1 left.$$.mov
    ${FFMPEG} -i "${FILE}" -c:v copy -an -sn -map 0:2 -map_chapters -1 right.$$.mov
fi

if [ "${SBS}" -eq 1 ]
then
    echo -ne "Splitting side-by-side video (${DAR}) into two streams"
    if [ "${SCALE}" -eq 2 ]
    then
        echo -ne ", doubling width of frame"
    fi
    if [ "right" == "left" ]
    then
        echo " (reversed)..."
    else
        echo "..."
    fi

    # I added the -map 0:v:0 because I found that containers that have the subtitle track(s) before
    # the video track cause it to think that the subtitles are the video, and you get nothing but
    # black with words for the video.

    ${FFMPEG} -i "${FILE}" -filter_complex "[0]crop=iw/2:ih:0:0,scale=iw*${SCALE}:ih:flags=${SCALE_ALGORITHM},setsar=sar=${SAR},setdar=dar=${DAR}${GRAYSCALE}[left];[0]crop=iw/2:ih:ow:0,scale=iw*${SCALE}:ih:flags=${SCALE_ALGORITHM},setsar=sar=${SAR},setdar=dar=${DAR}${GRAYSCALE}[right]" -map "[left]" -c:v ${PRORES} -profile:v 3 -map 0:v:0 -an -map_chapters -1 left.$$.mov -map "[right]" -c:v ${PRORES} -profile:v 3 -an -map_chapters -1 right.$$.mov
    if [ $? -ne 0 ] && [ "${PRORES}" == "prores_videotoolbox" ]
    then
        # I am not sure why the videotoolbox prores encoder does not work with many sources, other
        # than it might not be compatible with scaling or filters.  Until I figure that out, try
        # it, and if it fails, fall back to the software encoder prores_ks.
        echo "VideoToolbox Prores does not like source... Falling back to software encoder."
        PRORES=prores_ks
        ${FFMPEG} -y -i "${FILE}" -filter_complex "[0]crop=iw/2:ih:0:0,scale=iw*${SCALE}:ih:flags=${SCALE_ALGORITHM},setsar=sar=${SAR},setdar=dar=${DAR}${GRAYSCALE}[left];[0]crop=iw/2:ih:ow:0,scale=iw*${SCALE}:ih:flags=${SCALE_ALGORITHM},setsar=sar=${SAR},setdar=dar=${DAR}${GRAYSCALE}[right]" -map "[left]" -c:v ${PRORES} -profile:v 3 -an -map_chapters -1 left.$$.mov -map "[right]" -c:v ${PRORES} -profile:v 3 -an -map_chapters -1 right.$$.mov
    fi

    if [ ${CROP} -eq 1 ]
    then
        # I have it skip the first five minutes of the video in the crop detection because
        # I have run across some videos that have full frame studio logos before it goes
        # letterbox for the movie, causing the detection to be wrong sometimes.  This
        # workaround has fixed most of the ones I have run across.
        CROP_START="-ss 00:5:00"

        echo "Calculating left border removal..."
        LEFT_CROP=$( ${FFMPEG} -loglevel info ${CROP_START} -i "left.$$.mov" -vf cropdetect -f null - 2>&1 | awk '/crop/{ print $8, $9, $10, $11; }' | grep -v detect | sed -e "s/[a-z]://g" | awk '{ w+=$1; h+=$2; x+=$3; y+=$4; } END { printf "crop=%d:%d:%d:%d",w/NR,h/NR,x/NR,y/NR; }' )

        if [ ${CROP_FAST} -eq 1 ]
        then
            echo "Using left eye crop value for right eye"
            RIGHT_CROP=${LEFT_CROP}
        else
            echo "Calculating right border removal..."
            RIGHT_CROP=$( ${FFMPEG} -loglevel info ${CROP_START} -i "right.$$.mov" -vf cropdetect -f null - 2>&1 | awk '/crop/{ print $8, $9, $10, $11; }' | grep -v detect | sed -e "s/[a-z]://g" | awk '{ w+=$1; h+=$2; x+=$3; y+=$4; } END { printf "crop=%d:%d:%d:%d",w/NR,h/NR,x/NR,y/NR; }' )

            # Sometimes splitting the frames exactly in half does not yield two identical frames,
            # when you trim off the black borders.  The spatial algorithm requires frames to
            # be the same size, so do a little "best guess" math here.  It might not be ideal, but
            # it seems to work reasonably well.  If you have a really oddball file, this script
            # may not be able to suss it out completely, and you will have to do the steps by hand,
            # making sure things line up.

            LEFT_H=$( echo ${LEFT_CROP} | sed -e "s/^crop=//" | cut -f 1 -d ':' )
            LEFT_W=$( echo ${LEFT_CROP} | sed -e "s/^crop=//" | cut -f 2 -d ':' )
            LEFT_X=$( echo ${LEFT_CROP} | sed -e "s/^crop=//" | cut -f 3 -d ':' )
            LEFT_Y=$( echo ${LEFT_CROP} | sed -e "s/^crop=//" | cut -f 4 -d ':' )

            RIGHT_H=$( echo ${RIGHT_CROP} | sed -e "s/^crop=//" | cut -f 1 -d ':' )
            RIGHT_W=$( echo ${RIGHT_CROP} | sed -e "s/^crop=//" | cut -f 2 -d ':' )
            RIGHT_X=$( echo ${RIGHT_CROP} | sed -e "s/^crop=//" | cut -f 3 -d ':' )
            RIGHT_Y=$( echo ${RIGHT_CROP} | sed -e "s/^crop=//" | cut -f 4 -d ':' )

            if [ "${LEFT_H}:${LEFT_W}" != "${RIGHT_H}:${RIGHT_W}" ]
            then
                # Here, I take the smaller value of each height and width, but keep the X and Y
                # values the same to make sure it still trims off the majority of the black borders.
                echo "Frame sizes differ.  Using smaller value for both eyes."
                LEFT_CROP="crop=$(( ${LEFT_H} <= ${RIGHT_H} ? ${LEFT_H} : ${RIGHT_H} )):$(( ${LEFT_W} <= ${RIGHT_W} ? ${LEFT_W} : ${RIGHT_W} )):${LEFT_X}:${LEFT_Y}"
                RIGHT_CROP="crop=$(( ${LEFT_H} <= ${RIGHT_H} ? ${LEFT_H} : ${RIGHT_H} )):$(( ${LEFT_W} <= ${RIGHT_W} ? ${LEFT_W} : ${RIGHT_W} )):${RIGHT_X}:${RIGHT_Y}"
            fi
        fi

        if [ "${LEFT_X}" == 0 ] && [ "${LEFT_Y}" == 0 ] && [ "${RIGHT_X}" == 0 ] && [ "${RIGHT_Y}" == 0 ]
        then
            echo "No cropping necessary."
        else
            echo "Cropping left eye (${LEFT_CROP})..."
            ${FFMPEG} -i "left.$$.mov" -vf $LEFT_CROP -c:v prores_videotoolbox -profile:v 3 "left-cropped.$$.mov"
            mv "left-cropped.$$.mov" "left.$$.mov"

            echo "Cropping right eye (${RIGHT_CROP})..."
            ${FFMPEG} -i "right.$$.mov" -vf $RIGHT_CROP -c:v prores_videotoolbox -profile:v 3 "right-cropped.$$.mov"
            mv "right-cropped.$$.mov" "right.$$.mov"
        fi
    fi
fi

# O/U processing is way behind SBS; I will clean that up and optimize it once I have
# gotten most of the kinks out of the SBS logic.  Some bits can be functionalized as well.

if [ "${OU}" -eq 1 ]
then
    echo -ne "Splitting over/under video into two streams"
    if [ "${SCALE}" -eq 2 ]
    then
        echo -ne ", doubling height of frame"
    fi
    if [ "right" == "left" ]
    then
        echo " (reversed)..."
    else
        echo "..."
    fi
    ${FFMPEG} -i "${FILE}" -filter_complex "[0]crop=iw:ih/2:0:0,scale=iw:ih*${SCALE}[left];[0]crop=iw:ih/2:ow:0,scale=iw:ih*${SCALE}[right]" -map "[left]" -c:v ${PRORES} -profile:v 3 -an -map_chapters -1 left.$$.mov -map "[right]" -c:v ${PRORES} -profile:v 3 -an -map_chapters -1 right.$$.mov

    if [ ${CROP} -eq 1 ]
    then
        # This scans the entire file, and takes some time for each.  Really, only a sample is needed, but
        # I haven't decided the best way, so I'll leave it as is for the moment
        # I am scanning both instead of just one because sometimes the top and bottom
        # crops aren't always the same with over/under.  This takes longer, but ensures that both
        # sides are cropped properly.

        echo "Calculating left border removal..."
        LEFT_CROP=$( ${FFMPEG} -loglevel info -i "left.$$.mov" -vf cropdetect -f null - 2>&1 | awk '/crop/{ print $8, $9, $10, $11; }' | grep -v detect | sed -e "s/[a-z]://g" | awk '{ w+=$1; h+=$2; x+=$3; y+=$4; } END { printf "crop=%d:%d:%d:%d",w/NR,h/NR,x/NR,y/NR; }' )

        echo "Cropping left eye..."
        ${FFMPEG} -i "left.$$.mov" -vf $LEFT_CROP -c:v prores_videotoolbox -profile:v 3 "left-cropped.$$.mov"
        mv "left-cropped.$$.mov" "left.$$.mov"

        if [ ${CROP_FAST} -eq 1 ]
        then
            echo "Using left eye crop value for right eye"
            RIGHT_CROP=${LEFT_CROP}
        else
            echo "Calculating right border removal..."
            RIGHT_CROP=$( ${FFMPEG} -loglevel info -i "right.$$.mov" -vf cropdetect -f null - 2>&1 | awk '/crop/{ print $8, $9, $10, $11; }' | grep -v detect | sed -e "s/[a-z]://g" | awk '{ w+=$1; h+=$2; x+=$3; y+=$4; } END { printf "crop=%d:%d:%d:%d",w/NR,h/NR,x/NR,y/NR; }' )
        fi

        echo "Cropping right eye..."
        ${FFMPEG} -i "right.$$.mov" -vf $RIGHT_CROP -c:v prores_videotoolbox -profile:v 3 "right-cropped.$$.mov"
        mv "right-cropped.$$.mov" "right.$$.mov"
    fi
fi

# Extract the audio tracks


###############

# @AUDIO EXTRACTION

###############

ffprobe -hide_banner -loglevel quiet -of default=noprint_wrappers=0 -print_format flat -select_streams a -show_entries stream=codec_name,channels,index -i "${FILE}" > audio_tracks.$$

AAC_TRACKS=$( cat audio_tracks.$$ | cut -f 3 -d '.' | sort -n | uniq )

for stream in ${AAC_TRACKS}
{
    CODEC=$( grep "streams.stream.${stream}." audio_tracks.$$ | grep "codec_name=" | cut -f 2 -d '=' | tr -d '"' )
    CHANNELS=$( grep "streams.stream.${stream}." audio_tracks.$$ | grep "channels=" | cut -f 2 -d '=' )

    # Assuming here if there are more than 2 channels that it is an N.1 scenario, so
    # subtracting 1 for the ".1" that will overflow the max bitrate for HE-AAC.
    # You might need to override for the rare quad channel movies that are out there.

    if [ ${CHANNELS} -gt 2 ]
    then
        BITRATE=$(( ( ${CHANNELS} - 1 ) * 40 ))
    else
        BITRATE=$(( ${CHANNELS} * 40 ))
    fi

    # If the audio is already AAC, there is no need to re-encode it.
    #
    if [ "${CODEC}" == "aac" ]
    then
        echo "Copying track ${stream} AAC audio..."
        ${FFMPEG} -i "${FILE}" -vn -sn -c:a copy -map 0:a -map_chapters -1 audio.${stream}.$$.mov
    elif [ ${CHANNELS} -gt 6 ]
    then
        # For some reason, the Audio Toolbox HE-AAC encoder barfs on > 5.1 channels (it works in
        # Handbrake; not sure why it doesn't in ffmpeg).  So, in the event of 7.1 audio, it will
        # use the Fraunhofer codec instead.
        echo "Re-encoding ${CODEC} track ${stream} to HE-AAC..."
        ${FFMPEG} -i "${FILE}" -vn -sn -c:a libfdk_aac -profile:a aac_he -b:a ${BITRATE}k -map 0:a:${stream} -map_chapters -1 audio.${stream}.$$.mov
    else
        echo "Re-encoding ${CODEC} track ${stream} to HE-AAC..."
        ${FFMPEG} -i "${FILE}" -vn -sn -c:a aac_at -b:a ${BITRATE}k -profile:a 4 -aac_at_mode cvbr -map 0:a:${stream} -map_chapters -1 audio.${stream}.$$.mov
    fi

    # Not sure if I need to export here; I forget whether inheritence is an issue
    # in for loops or while loops (or both).  Need to test and verify.
    # No real harm in having it.

    export AAC_TRACK_NAMES="${AAC_TRACK_NAMES} -add audio.${stream}.$$.mov "
}

# Here we take the left and right video streams, and work the magic into a spatial file
# I used the defaults as provided by the tool.  I have no played with the settings to see
# if they improve or detract.  The defaults look right to me, so I am leaving them.
# The q 52 value matches the setting I use in HandBrake when encoding with video toolbox.

spatial-media-kit-tool merge -l left.$$.mov -r right.$$.mov -q ${QUALITY} --left-is-primary --horizontal-field-of-view 90 -o spatial.$$.mov

# ffmpeg will NOT work for this, at least not without more investigation.
# When it copies the track, certain metadata that is *required* for the spatial
# video to be recognized will get stripped and you will end up with a file
# that will not play properly.
#
# This also applies to things like Subler which are based on ffmpeg.  You can use it
# to update the file without re-packaging, but if you "Optimize" the file, you will trash
# the spatial metadata.

MP4Box -new -add spatial.$$.mov ${AAC_TRACK_NAMES} "$( basename "${FILE}" .mp4 )-${QUALITY}-spatial.mp4"
