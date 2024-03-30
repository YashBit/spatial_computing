import cv2
import os
import argparse

def extract_frames(video_file, output_dir):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Open the video file
    cap = cv2.VideoCapture(video_file)
    
    # Initialize frame count
    frame_count = 0
    
    # Read until video is completed
    while(cap.isOpened()):
        ret, frame = cap.read()
        if ret:
            # Save frame as JPEG image
            frame_path = os.path.join(output_dir, f"{os.path.splitext(os.path.basename(video_file))[0]}_{frame_count}.jpeg")
            cv2.imwrite(frame_path, frame)
            print(f"Saved frame {frame_count}")
            frame_count += 1
        else:
            break

    # Release the video capture object and close all windows
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Extract frames from a video and save them as JPEG images")
    parser.add_argument("--video_file", help="Path to the input video file")
    parser.add_argument("--output_dir", help="Path to the output directory where frames will be saved")
    args = parser.parse_args()

    # Extract frames from the video
    extract_frames(args.video_file, args.output_dir)
