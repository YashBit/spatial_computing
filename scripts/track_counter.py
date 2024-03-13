import ffmpeg
from moviepy.editor import VideoFileClip

def analyze_video(filename):
    # Open the video file and get information about its streams
    probe = ffmpeg.probe(filename)
    video_streams = [stream for stream in probe['streams'] if stream['codec_type'] == 'video']

    # Check the number of video streams
    num_video_streams = len(video_streams)
    if num_video_streams > 1:
        print(f"The video file '{filename}' contains {num_video_streams} video streams.")
        print("This may indicate that multiple views are stored in tracks.")
    else:
        print(f"The video file '{filename}' contains only 1 video stream.")
def get_video_encoding(filename):
    probe = ffmpeg.probe(filename)
    video_streams = [stream for stream in probe['streams'] if stream['codec_type'] == 'video']
    if video_streams:
        codec_name = video_streams[0]['codec_name']
        print(f"Codec Name is: {codec_name}")
        return codec_name
    else:
        return "Unknown"


# Example usage
filename = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/stitched_pup.mov"
analyze_video(filename)
get_video_encoding(filename)
