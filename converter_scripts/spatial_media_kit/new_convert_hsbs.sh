#!/bin/bash
export PATH="$PATH:$(dirname "$0")"

# Check if input files are provided
if [[ $# -ne 2 ]]; then
    echo "Usage: $0 <input_video_file> <audio_intermediate_file>"
    exit 1
fi

echo "Using existing left and right intermediate files..."

input_file="$1"
base_name="${input_file%.*}"
audio_intermediate_file="$2"
left_intermediate_file="${base_name}_left_eye.mov"
right_intermediate_file="${base_name}_right_eye.mov"
mv_hevc_intermediate_file="${base_name}_MV-HEVC.mp4"
output_file="${base_name}_Spatial_Video.mp4"

# Split the video file
ffmpeg -i "$input_file" -filter_complex "[0]crop=iw/2:ih:0:0[left];[0]crop=iw/2:ih:ow:0[right]" -map "[left]" -c:v libx264 -crf 18 -preset fast -an "$left_intermediate_file" -map "[right]" -c:v libx264 -crf 18 -preset fast -an "$right_intermediate_file"
echo "Video Splitting Completed!"

spatial-media-kit-tool merge --left-file "$left_intermediate_file" --right-file "$right_intermediate_file" --quality 50 --left-is-primary --horizontal-field-of-view 65 --horizontal-disparity-adjustment 200 --output-file "$mv_hevc_intermediate_file"

echo "Encoding MV-HEVC complete. Output file: $mv_hevc_intermediate_file. Remuxing audio back in..."

MP4Box -add "$mv_hevc_intermediate_file" -add "$audio_intermediate_file" "$output_file"

echo "Success! Output is $output_file. Deleting all other created intermediate files now..."

# rm "$left_intermediate_file" "$right_intermediate_file" "$mv_hevc_intermediate_file"

echo "Cleanup complete! Enjoy your spatial video!"
