import subprocess

def combine_video_with_depth(input_2d_video, input_depth_map, output_combined_video):
    command = [
        'ffmpeg',
        '-i', input_2d_video,
        '-i', input_depth_map,
        '-filter_complex', '[1:v]format=gray[depth];[depth]disparity2depth=scaled=true[depth];[0:v][depth]depth2space=scaled=true[video]',
        '-map', '[video]',
        '-c:v', 'libx264',
        '-crf', '18',
        '-preset', 'slow',
        output_combined_video
    ]
    
    subprocess.run(command)

# Example usage
input_2d_video = 'input_2d_video.mp4'
input_depth_map = 'input_depth_map.png'
output_combined_video = 'output_combined_video.mp4'

combine_video_with_depth(input_2d_video, input_depth_map, output_combined_video)
