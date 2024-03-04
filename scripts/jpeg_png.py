from PIL import Image

def convert_jpeg_to_png(input_path, output_path):
    try:
        # Open the JPEG image
        with Image.open(input_path) as img:
            # Convert and save as PNG
            img.save(output_path, "PNG")
        print(f"Conversion successful. PNG image saved at {output_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:
input_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/frames/test_video_1.jpeg"
output_path = "output_image.png"
convert_jpeg_to_png(input_path, output_path)
