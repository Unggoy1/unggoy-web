#!/bin/bash

# Path to your icons folder
icons_folder="../lib/components/icons"
output_file="$icons_folder/index.ts"

# Create or overwrite the index.js file
echo "// Auto-generated index file" > "$output_file"

# Loop through each .svelte file in the icons folder
for file in "$icons_folder"/*.svelte; do
    filename=$(basename -- "$file")
    component_name="${filename%.*}"
    echo "export { default as $component_name } from './$filename';" >> "$output_file"
done

echo "Index file generated at $output_file"

