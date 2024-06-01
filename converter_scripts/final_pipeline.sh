#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <input_video_file>"
    exit 1
fi

input_video="$1"

if [ ! -f "$input_video" ]; then
    echo "Error: Input video file '$input_video' does not exist."
    exit 1
fi

# REMOVE ALL NUMBERS
input_video="${input_video%[0-9]*}"
input_video="${input_video}4"


############ @@@@@@@@@@@@@@@@@@@@@@ FRAME EXTRACTION


echo "Input video file: $input_video"
frames_folder="video_information/frames"
if [ -d "$frames_folder" ] && [ "$(ls -A $frames_folder)" ]; then
    echo "Wiping the contents of the frames folder"
    rm -rf "$frames_folder"/*
fi
echo "Beggining Frame Extraction"
python frame_extracter.py --video_file "$input_video" --output_dir video_information/frames
if [ $? -ne 0 ]; then
    echo "Error encountered during frame extraction."
    exit 1
fi
echo "Frame Extraction Complete"


############ @@@@@@@@@@@@@@@@@@@@@@ AUDIO STREAM EXTRACTION




echo "Checking for audio streams"
has_audio=$(ffprobe -loglevel error -select_streams a:0 -show_entries stream=codec_type -of csv=p=0 "$input_video")
if [ "$has_audio" == "audio" ]; then
    audio_intermediate_file="video_information/original_video_audio.m4a"
    echo "Beginning Audio Extraction"
    ffmpeg -y -i "$input_video" -vn -sn -c:a aac -b:a 384k "$audio_intermediate_file"
    if [ $? -ne 0 ]; then
        echo "Error encountered during audio extraction."
        exit 1
    fi
    echo "Audio Extraction Completed"
else
    echo "No audio stream found in the input video. Skipping audio extraction."
fi

############ @@@@@@@@@@@@@@@@@@@@@@ MiDaS Inference 


rm -rf MiDaS/input/*
cp -r video_information/frames MiDaS/input

# IT SEEMS AS THOUGH YOU WILL NEED TO ACTIVATE CONDA ENV BEFORE GLOBALLY
source miniconda3/bin/activate
conda activate midas-py310



cd MiDaS
rm -rf output/*

python run.py --input_path input/frames --output_path output --grayscale
if [ $? -ne 0 ]; then
    echo "Error encountered during MiDaS inference."
    exit 1
fi

# Deactivate the conda environment
conda deactivate

echo "MiDaS Inference Completed"


########### @@@@@@@@@@@@@@@@@@@@@@ SBS FRAME CREATION 

echo "SBS Frame Creation Started"
cd .. 
poetry shell
source miniconda3/bin/activate
# DELETE OLD SBS FILES
rm -rf spm_cli/spatialconverter/spatialconverter/sbs_frames/*
python spm_cli/spatialconverter/spatialconverter/main.py --photo_folder video_information/frames --depth_folder MiDaS/output
echo "Stitching SBS Frame Video"
if [ $? -ne 0 ]; then
    echo "Error encountered during stitching SBS frame video."
    exit 1
fi
echo "SBS Frame Creation Finished"
#########

# # @@@@@@ MAKE SURE DOCKER IMAGE HAS POETRY INSTALLED

########## SBS VIDEO STITCHING 



############ @@@@@@@@@@@@@@@@@@@@@@ SBS IMAGES TO VIDEO

##### INPUTS: SBS VIDEO , ORIGINAL VIDEO



echo "Stitching SBS Video"
if [ $? -ne 0 ]; then
    echo "Error encountered during spatial video conversion."
    exit 1
fi

python image_to_video.py --original_video_path "$input_video" --image_folder spm_cli/spatialconverter/spatialconverter/sbs_frames --output_video_path video_information/sbs_video_test_video.mp4

echo "SBS Video Stitched"




############ @@@@@@@@@@@@@@@@@@@@@@ SPATIAL VIDEO (WILL TAKE IN SBS VIDEO, NO NEED TO STITCH)

##### INPUTS: SBS VIDEO , ORIGINAL VIDEO

# ./spatial_media_kit/new_convert_hsbs.sh video_information/sbs_video_test_video.mp4



# echo "Beginning Spatial Video Conversion"
# if [ $? -ne 0 ]; then
#     echo "Error encountered during spatial video conversion."
#     exit 1
# fi
# echo "Spatial Video Created"

# echo "Spatial Video Returned"
# echo "All Intermediary Files Deleted"

# echo "Operations completed. Exiting"
