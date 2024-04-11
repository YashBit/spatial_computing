import os

def delete_non_flipped_files(folder_path):
    # Get list of files in the folder
    files = os.listdir(folder_path)
    
    # Iterate through each file
    for file_name in files:
        # Check if the file name does not start with "flipped_"
        if not file_name.startswith("flipped_"):
            file_path = os.path.join(folder_path, file_name)
            # Delete the file
            os.remove(file_path)
            print(f"Deleted: {file_path}")

# Example usage:
folder_path = "/Users/yashbharti/Desktop/Engineering/core_projects/spatio_Dev/spatial_computing/scripts/depth"
delete_non_flipped_files(folder_path)
