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

echo "Beginning MiDaS Inference"
if [ $? -ne 0 ]; then
    echo "Error encountered during MiDaS inference."
    exit 1
fi
echo "MiDaS Inference Completed"

if [ "$(ls -A video_information/sbs_frames)" ]; then
    # If not empty, wipe it clean
    echo "Removing existing files from video_information/sbs_frames directory..."
    rm -rf video_information/sbs_frames/*
fi

echo "Beginning SBS Frame Creation"
python /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/spm_cli/spatialconverter/spatialconverter/main.py --photo_folder /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/video_information/frames --depth_folder /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/video_information/depth  
# Your SBS frame creation logic goes he

##########

# @@@@@@ MAKE SURE DOCKER IMAGE HAS POETRY INSTALLED

##########

echo "SBS Frame Extraction Complete"
poetry run python /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/spm_cli/spatialconverter/spatialconverter/main.py --photo_folder /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/video_information/frames --depth_folder /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/video_information/depth
echo "Stitching SBS Frame Video"
if [ $? -ne 0 ]; then
    echo "Error encountered during stitching SBS frame video."
    exit 1
fi
echo "SBS Video Complete"


echo "Beginning Spatial Video Conversion"
if [ $? -ne 0 ]; then
    echo "Error encountered during spatial video conversion."
    exit 1
fi
echo "Spatial Video Created"

echo "Spatial Video Returned"
echo "All Intermediary Files Deleted"

echo "Operations completed. Exiting"
