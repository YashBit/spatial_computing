import subprocess

def check_alpha_channel(video_path):
    try:
        # Run ffprobe to check if the video has an alpha channel
        output = subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0',
                                          '-show_entries', 'stream=codec_name,pix_fmt', '-of', 'csv=p=0',
                                          video_path])
        codec_info = output.decode('utf-8').split(',')
        codec_name = codec_info[0].lower()
        pixel_format = codec_info[1].lower()

        if 'rgba' in pixel_format or 'pal8a' in pixel_format:
            print("The video has an alpha channel.")
        else:
            print("The video does not have an alpha channel.")
    except subprocess.CalledProcessError:
        print("Error: Failed to check alpha channel.")

# Example usage:
video_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/outputvideo.png"
check_alpha_channel(video_path)
