import argparse
import logging
import sys
# from spatialconverter.video_handler import VideoHandler
from spatialconverter.image_handler2 import Image2Handler
import re
import os 

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
def extract_number(filename):
    match = re.search(r'\d+', filename)
    # print(match)
    if match:
        return match.group()
    else:
        return None

def find_matching_depth_file(folder_file_number, depth_folder):
    for filename in os.listdir(depth_folder):
        match = re.search(r'(\d+)-dpt', filename)
        if match and match.group(1) == folder_file_number:
            return os.path.join(depth_folder, filename)
    return None
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process 2D Photos & Videos")
    parser.add_argument("--photo", type=str, help="a file path to a photo")
    parser.add_argument("--video", type=str, help="a file path to a video")
    parser.add_argument("--photo_folder", type=str, help="a file path to a second photo")
    parser.add_argument("--depth_folder", type=str, help="a file path to a second photo")

    args = parser.parse_args()
    photo_filename = args.photo
    video_filename = args.video
    photo_folder = args.photo_folder
    depth_folder  = args.depth_folder
    if photo_folder and depth_folder:
        for filename in os.listdir(photo_folder):
            if filename.endswith(('.jpg', '.jpeg', '.png')):
                folder_file_number = extract_number(filename)
                file_path = os.path.join(photo_folder, filename)
                if folder_file_number:
                    depth_file_path = find_matching_depth_file(folder_file_number, depth_folder)
                    # print(depth_file_path)
                    if depth_file_path:
                        print(f"Processing File Name: {folder_file_number}")
                        image_handler = Image2Handler(file_path)
                        image_handler.make_3d_image(depth_file_path)
    else:
        logging.info("Please add a photo or video if you want to see anything happen!")
