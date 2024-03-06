import os
import cv2

def flip_images(input_folder, output_folder):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Get list of files in the input folder
    image_files = [f for f in os.listdir(input_folder) if f.endswith(('.jpg', '.jpeg', '.png', '.bmp'))]

    for image_file in image_files:
        # Read the image
        image_path = os.path.join(input_folder, image_file)
        image = cv2.imread(image_path)

        if image is None:
            print(f"Error: Unable to read image '{image_file}'. Skipping...")
            continue

        # Flip the image 180 degrees
        flipped_image = cv2.flip(image, -1)

        # Construct the path for the output image
        output_path = os.path.join(output_folder, f"flipped_{image_file}")

        # Save the flipped image
        cv2.imwrite(output_path, flipped_image)

        print(f"Image '{image_file}' flipped and saved as '{output_path}'.")

# Example usage:
input_folder = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/depth"
output_folder = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/depth"
flip_images(input_folder, output_folder)
