import cv2
import os
import re
import argparse

    """
    
     python image_to_video.py --original_video_path /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/spatial_media_kit/test_video.mp4 --image_folder /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/scripts/sbs_frames/ --output_video_path /Users/yashbharti/Desktop/Engineering/core_projects/spatial_computing/utils/stitched_pictures_video/test_video.mp4
     
     
     NEED TO GIVE OUTPUT FILE NAME AS WELL
    
    
    
    """



def get_video_fps(video_path):
    video = cv2.VideoCapture(video_path)
    fps = video.get(cv2.CAP_PROP_FPS)
    video.release()
    print(f"FPS is: {fps}")
    return fps

def extract_frame_number(filename):
    match = re.search(r'\d+', filename)
    if match:
        return int(match.group())
    else:
        return float('inf')  # Assign a high number if no numeric part found

def images_to_video(image_folder, output_video_path, fps):
    image_files = [f for f in os.listdir(image_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]    
    print(f"Length of Image Files : {len(image_files)}")
    image_files.sort(key=lambda x: extract_frame_number(x))
    first_image = cv2.imread(os.path.join(image_folder, image_files[0]))
    height, width, _ = first_image.shape
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Video codec
    video_writer = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

    for image_file in image_files:
        image_path = os.path.join(image_folder, image_file)
        image = cv2.imread(image_path)
        video_writer.write(image)

    # Release video writer
    video_writer.release()

    print(f"Video created: {output_video_path}")




def main(args):
    fps = get_video_fps(args.original_video_path)
    images_to_video(args.image_folder, args.output_video_path, fps)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convert a folder of images into a video.')
    parser.add_argument('--original_video_path', type=str, help='Path to the original MP4 video')
    parser.add_argument('--image_folder', type=str, help='Path to the folder containing modified frames')
    parser.add_argument('--output_video_path', type=str, help='Output video path for stitched frames')
    args = parser.parse_args()
    main(args)