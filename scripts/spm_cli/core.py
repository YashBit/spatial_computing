import os
import cv2
import numpy as np
import argparse

def find_matching_depth_map(image_filename, depth_folder):
    image_number = ''.join(filter(str.isdigit, image_filename))
    print(image_number)
    for filename in os.listdir(depth_folder):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            parts = filename.split("-")
            prefix = parts[0]
            depth_number = ''.join(filter(str.isdigit, prefix))
            print(f"Depth Number is Given As: {depth_number}")
            if image_number == depth_number:
                return os.path.join(depth_folder, filename)
    return None

def create_sbs_image(image_path, depth_map_path, output_folder):
    image = cv2.imread(image_path)
    depth_map = cv2.imread(depth_map_path, cv2.IMREAD_GRAYSCALE)

    min_disparity = 0
    max_disparity = 64
    disparity_map = (depth_map - min_disparity) / (max_disparity - min_disparity) * 255
    disparity_map = np.uint8(disparity_map)

    baseline = 10
    focal_length = 1000

    left_view = image.copy()
    right_view = np.zeros_like(image)
    for y in range(image.shape[0]):
        for x in range(image.shape[1]):
            disparity = disparity_map[y, x]
            left_x = x - disparity
            right_x = x + disparity - baseline
            if 0 <= left_x < image.shape[1]:
                right_view[y, right_x] = image[y, left_x]

    sbs_image = np.hstack((left_view, right_view))

    filename = os.path.splitext(os.path.basename(image_path))[0]
    output_path = os.path.join(output_folder, f'{filename}_sbs.jpg')
    cv2.imwrite(output_path, sbs_image)

def process_folders(image_folder, depth_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for image_filename in os.listdir(image_folder):
        if image_filename.endswith(('.jpg', '.jpeg', '.png')):
            depth_map_path = find_matching_depth_map(image_filename, depth_folder)
            print(depth_map_path)
            # if depth_map_path:
            #     image_path = os.path.join(image_folder, image_filename)
            #     create_sbs_image(image_path, depth_map_path, output_folder)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create stereoscopic 3D Side-By-Side (SBS) images from 2D images and their depth maps")
    parser.add_argument("--image_folder", help="Path to the folder containing the 2D images")
    parser.add_argument("--depth_folder", help="Path to the folder containing the depth maps")
    parser.add_argument("--output_folder", help="Path to the output folder where SBS images will be saved")
    args = parser.parse_args()
    process_folders(args.image_folder, args.depth_folder, args.output_folder)
