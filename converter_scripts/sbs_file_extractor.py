import os
import argparse
import shutil

def extract_sbs_images(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    files = os.listdir(input_folder)
    sbs_images = [file for file in files if "sbs" in file.lower()]
    sbs_images.sort(key=lambda x: int(''.join(filter(str.isdigit, x))))

    for i, sbs_image in enumerate(sbs_images):
        shutil.copyfile(os.path.join(input_folder, sbs_image), os.path.join(output_folder, f"sbs_image_{i}.png"))

    print("SBS images extracted and saved successfully.")

if __name__ == "__main__":
    # Parse command line arguments
    parser = argparse.ArgumentParser(description="Extract SBS images from a folder.")
    parser.add_argument("--input_folder", help="Path to the folder containing SBS images.")
    parser.add_argument("--output_folder", help="Path to the folder to save the extracted SBS images.")
    args = parser.parse_args()

    # Extract SBS images
    extract_sbs_images(args.input_folder, args.output_folder)
