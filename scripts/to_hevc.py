import ffmpeg

def convert_to_hevc(input_file, output_file):
    (
        ffmpeg
        .input(input_file)
        .output(output_file, codec='hevc')
        .run()
    )

# Example usage
input_file = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/mv_hevc_videos/stitched_pup_2.hevc.mov"
output_file = "stitched_pup_new.mov"
convert_to_hevc(input_file, output_file)
