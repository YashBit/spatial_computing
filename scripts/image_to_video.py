import cv2
import os
import re

def get_video_fps(video_path):
    # Open the video file
    video = cv2.VideoCapture(video_path)
    
    # Get the frames per second (FPS) of the video
    fps = video.get(cv2.CAP_PROP_FPS)
    
    # Release the video object
    video.release()
    
    return fps

def extract_frame_number(filename):
    # Extract numeric part from the filename
    match = re.search(r'\d+', filename)
    if match:
        return int(match.group())
    else:
        return float('inf')  # Assign a high number if no numeric part found

def images_to_video(image_folder, output_video_path, fps):
    # Get the list of image files in the folder
    image_files = [f for f in os.listdir(image_folder) if f.endswith('.jpg')]
    print(f"Length of Image Files : {len(image_files)}")
    # Sort image files based on the numeric part of their filenames
    image_files.sort(key=lambda x: extract_frame_number(x))

    # Determine the size of the first image
    first_image = cv2.imread(os.path.join(image_folder, image_files[0]))
    height, width, _ = first_image.shape

    # Initialize video writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Video codec
    video_writer = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

    # Loop through image files and write them to video
    for image_file in image_files:
        image_path = os.path.join(image_folder, image_file)
        image = cv2.imread(image_path)
        video_writer.write(image)

    # Release video writer
    video_writer.release()

    print(f"Video created: {output_video_path}")


# Path to the original MP4 video
original_video_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/original_video.mp4"

# Determine the FPS of the original video
fps = get_video_fps(original_video_path)

# Path to the folder containing modified frames
modified_frames_folder = "/Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/above_below"

# Output video path for stitched frames
output_video_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/z_pup.mp4"

# Convert modified frames to video with the same FPS as original video
images_to_video(modified_frames_folder, output_video_path, fps)
