import subprocess

def overlay_depth_on_image(normal_image_path, depth_image_path, output_path):
    # Check if the normal image has an alpha channel
    has_alpha_channel = check_alpha_channel(normal_image_path)
    
    # Determine overlay filter based on alpha channel presence
    if has_alpha_channel:
        overlay_filter = "[1:v]format=rgba,colorchannelmixer=aa=0.5[depth];[0:v][depth]overlay=format=auto"
    else:
        # Convert the normal image to a video with alpha channel
        subprocess.run(['ffmpeg',
                        '-i', normal_image_path,
                        '-vf', 'format=rgba',
                        '-c:v', 'libx264',  # Output video codec
                        '-preset', 'ultrafast',  # Preset for fast encoding
                        '-crf', '18',  # Constant Rate Factor for quality
                        '-pix_fmt', 'yuv420p',  # Pixel format for compatibility
                        '-y',  # Overwrite output file if exists
                        'temp_alpha_video.mp4'])

        # Use the converted video with alpha channel for overlay
        normal_image_path = 'temp_alpha_video.mp4'
        overlay_filter = "[0:v][1:v]overlay=format=auto"

    # Run ffmpeg command to overlay depth on the normal image
    subprocess.run(['ffmpeg',
                    '-i', normal_image_path,
                    '-i', depth_image_path,
                    '-filter_complex', overlay_filter,
                    '-c:a', 'copy',  # Copy audio stream if present
                    '-c:v', 'libx264',  # Output video codec
                    '-preset', 'ultrafast',  # Preset for fast encoding
                    '-crf', '18',  # Constant Rate Factor for quality
                    '-pix_fmt', 'yuv420p',  # Pixel format for compatibility
                    '-y',  # Overwrite output file if exists
                    output_path])

def check_alpha_channel(image_path):
    try:
        # Run ffprobe to check if the image has an alpha channel
        output = subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0',
                                          '-show_entries', 'stream=codec_name', '-of', 'csv=p=0',
                                          image_path])
        return b'rgba' in output.lower() or b'la' in output.lower()
    except subprocess.CalledProcessError:
        return False

# Example usage with provided paths:
depth_image_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/frames/test_video_1.png"
normal_image_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/depth/test_video_1-dpt_beit_large_512.png"
output_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/outputvideo.mp4"
overlay_depth_on_image(normal_image_path, depth_image_path, output_path)
