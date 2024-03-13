import cv2
import os

def get_image_info(image_path):
    # Check if the image file exists
    if not os.path.exists(image_path):
        return "Error: Image file not found."

    # Read the image using OpenCV
    image = cv2.imread(image_path)

    if image is None:
        return "Error: Unable to read image file."

    # Get image resolution
    height, width = image.shape[:2]

    # Get image size in bytes
    size_bytes = os.path.getsize(image_path)

    # Get image channels and color space
    channels = "Grayscale" if len(image.shape) == 2 else "RGB"
    if len(image.shape) == 3 and image.shape[2] == 4:
        channels = "RGBA"

    return {
        "Resolution": (width, height),
        "Size": size_bytes,
        "Channels": channels
    }

if __name__ == "__main__":
    # Example usage
    image_path = input("Enter the path to the image: ")
    image_info = get_image_info(image_path)
    if isinstance(image_info, str):
        print(image_info)
    else:
        print("Image Information:")
        for key, value in image_info.items():
            print(f"{key}: {value}")
