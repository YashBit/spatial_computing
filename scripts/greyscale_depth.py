import subprocess

def combine_video_with_depth(input_video, depth_video, output_video):
    ffmpeg_command = [
        'ffmpeg',
        '-i', depth_video,
        '-i', input_video,
        '-map', '0:v',
        '-map', '1:a',
        '-metadata', 'stereo_mode=1',
        output_video
    ]
    subprocess.run(ffmpeg_command)

# Example usage:
image_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/frames/test_video_1.png"
depth_map_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/depth/test_video_1-dpt_beit_large_512.png"
output_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/outputvideo.mp4"

combine_video_with_depth(image_path, depth_map_path, output_path)
