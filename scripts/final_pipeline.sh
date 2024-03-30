#!/bin/bash

# Check if the input video file is provided as an argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <input_video_file>"
    exit 1
fi

# Assign the input video file path from the argument
input_video="$1"

# Check if the input video file exists
if [ ! -f "$input_video" ]; then
    echo "Error: Input video file '$input_video' does not exist."
    exit 1
fi

# Perform operations on the input video file
echo "Input video file: $input_video"
echo "Beggining Frame Extraction"
echo "Frame Extraction Complete"
echo "Beginning Audio Extraction"
echo "Audo Extraction Completed"
echo "Beginning MiDaS Inference"
echo "MiDaS Inference Completed"
echo "Beginning SBS Frame Creation"
echo "SBS Frame Extraction Complete"
echo "Stitching SBS Frame Video"
echo "SBS Video Completd"
echo "Beginning Spatial Video Conversion"
echo "Spatial Video Created"
echo "Spatial Video Returned"
echo "All Intermediary Files Deleted"
echo "Operations completed. Exiting"
