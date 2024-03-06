import os
import argparse

def combine_frames_with_depth(frames_folder, depth_folder, output_folder):
    # Get list of frame files
    frame_files = sorted(os.listdir(frames_folder))
    
    # Iterate over each frame file
    for frame_file in frame_files:
        if frame_file.endswith('.jpeg'):
            frame_number = frame_file.split('_')[-1].split('.')[0]
            depth_file = f'test_video_{frame_number}-dpt_beit_large_512.png'
            
            # Check if depth file exists
            if os.path.exists(os.path.join(depth_folder, depth_file)):
                ffmpeg_command = [
                    'ffmpeg',
                    '-i', os.path.join(frames_folder, frame_file),
                    '-i', os.path.join(depth_folder, depth_file),
                    '-filter_complex', f'[0:v][1:v]overlay',
                    os.path.join(output_folder, frame_file)
                ]
                os.system(' '.join(ffmpeg_command))
            else:
                print(f"Depth map for frame {frame_number} not found.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Combine frames with corresponding depth maps using ffmpeg.')
    parser.add_argument('--frames_folder', type=str, help='Path to the folder containing the frames.')
    parser.add_argument('--depth_folder', type=str, help='Path to the folder containing the depth maps.')
    parser.add_argument('--output_folder', type=str, help='Path to the folder where the combined frames will be saved.')
    args = parser.parse_args()
    combine_frames_with_depth(args.frames_folder, args.depth_folder, args.output_folder)
