from PIL import Image

def get_image_resolution(image_path):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            return width, height
    except IOError:
        print(f"Unable to open image file: {image_path}")
        return None

# Example usage:
image_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/depth/test_video_1-dpt_beit_large_512.png"
resolution = get_image_resolution(image_path)
if resolution:
    print(f"Image resolution: {resolution[0]}x{resolution[1]} pixels")
