import os
import re

def lowercase_after_underscore(filename):
    # Use regex to find underscores followed by a letter and lowercase that letter
    return re.sub(r'_(\w)', lambda match: '_' + match.group(1).lower(), filename)

def rename_images(directory):
    for root, _, files in os.walk(directory):
        for filename in files:
            # Check if the file is an image by its extension
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                # Construct full file path
                old_file = os.path.join(root, filename)
                # Lowercase the first letter after each underscore
                new_filename = lowercase_after_underscore(filename)
                new_file = os.path.join(root, new_filename)
                # Rename the file
                os.rename(old_file, new_file)
                print(f'Renamed: {old_file} to {new_file}')

# Replace 'your_directory_path' with the path to your image directory
rename_images('/home/mrdrfeesh/Development/code/phase-1/phase-1-project-1/UI/Icons/Perks/')