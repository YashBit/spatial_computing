import os
import cv2

def images_to_video(image_folder, output_video_path, fps=24):
    # Get the list of image files in the folder
    image_files = [f for f in os.listdir(image_folder) if f.endswith(('.jpg', '.jpeg', '.png', '.bmp'))]
    image_files.sort()  # Sort files alphabetically

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

# Example usage:
image_folder = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/joint_images"
output_video_path = "test_video.mp4"
images_to_video(image_folder, output_video_path)
