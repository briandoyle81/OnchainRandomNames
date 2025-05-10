#!/bin/bash
set -eu

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR"

# Process all .txt files in the current directory
for file in *.txt; do
  # Skip if no files found
  [ -f "$file" ] || continue

  echo "Cleaning $file..."

  # Create a temporary file
  tmp_file="${file}.tmp"

  # First convert ampersands using perl
  perl -pe 's/&amp;/&/g' "$file" > "$tmp_file"

  # Then apply all other cleaning operations
  cat "$tmp_file" | \
    sed -e 's/"//g' \
        -e "s/'/'/g" \
        -e 's/[()]//g' \
        -e 's/&#8212;/-/g' \
        -e 's/&#160;/ /g' \
        -e 's/–/-/g' \
        -e 's/&#8211;/-/g' \
        -e 's/&#8205;//g' > "${tmp_file}.2"

  # Replace original file with cleaned version
  mv "${tmp_file}.2" "$file"
  rm -f "$tmp_file"
done

echo "✅ All files cleaned"
