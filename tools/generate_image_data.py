import sys
import base64
import os
import os.path as path

IMAGES_PATH = path.join("assets", "images")

OUTPUT_FILE_ENUM = path.join("src", "generated", "ImageId.ts")
OUTPUT_FILE_DATA = path.join("src", "generated", "ImageData.ts")

image_files = [f for f in os.listdir(IMAGES_PATH) if path.isfile(path.join(IMAGES_PATH, f))]

output_enum = f"// THIS FILE HAS BEEN GENERATED. DO NOT MODIFY BY HAND.{os.linesep * 2}"
output_enum += f"export enum ImageId {{{os.linesep}"

output_data = f"// THIS FILE HAS BEEN GENERATED. DO NOT MODIFY BY HAND.{os.linesep * 2}"
output_data += f"import {{ ImageId }} from \"./ImageId\";{os.linesep * 2}"
output_data += f"export const IMAGE_DATA: {{[key in ImageId]: string}} = {{{os.linesep}"

for image_file in image_files:
    file_name, file_extension = path.splitext(image_file)

    if not file_extension == ".png":
        print("Can not handle file", image_file, "Unknown file extension:", file_extension, file=sys.stderr)
        sys.exit(1)
    
    with open(path.join(IMAGES_PATH, image_file), "rb") as file:
        bytes = file.read()
        data = base64.b64encode(bytes).decode("ascii")
        output_enum += f"    {file_name.upper()},{os.linesep}"
        output_data += f"    [ImageId.{file_name.upper()}]: \"data:image/png;base64,{data}\",{os.linesep}"

output_enum += f"    COUNT{os.linesep}"
output_enum += f"}}{os.linesep}"

output_data += f"    [ImageId.COUNT]: \"\",{os.linesep}"
output_data += f"}};{os.linesep}"

if not path.exists(path.dirname(OUTPUT_FILE_ENUM)):
    os.makedirs(path.dirname(OUTPUT_FILE_ENUM))
if not path.exists(path.dirname(OUTPUT_FILE_DATA)):
    os.makedirs(path.dirname(OUTPUT_FILE_DATA))

with open(OUTPUT_FILE_ENUM, "w+") as file:
    file.write(output_enum)

with open(OUTPUT_FILE_DATA, "w+") as file:
    file.write(output_data)