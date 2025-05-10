#!/bin/bash
set -eu

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR"

# Process all .txt files in the current directory
for file in *.txt; do
  # Skip if no files found or if it's all_ships.txt
  [ -f "$file" ] || continue
  [[ "$file" == "all_ships.txt" ]] && continue

  echo "Removing publications from $file..."

  # Create a temporary file
  tmp_file="${file}.tmp"

  # Remove lines that match common publication patterns
  cat "$file" | \
    grep -v -i -E '^(The |A |An )?(Journal|Magazine|Review|Book|Publication|Press|Publishing|Press|Series|Library|Collection|Archive|Gazette|Chronicle|Bulletin|Newsletter|Quarterly|Annual|Yearbook|Almanac|Digest|Reader|Anthology|Compendium|Handbook|Manual|Guide|Directory|Index|Catalog|Bibliography|Reference|Textbook|Monograph|Thesis|Dissertation|Report|Paper|Article|Volume|Issue|Number|Edition|Print|Copy|Manuscript|Document|Text|Work|Title|Name|Author|Editor|Publisher|Press|House|Company|Corporation|Inc|LLC|Ltd|Limited|Publishing|Publications|Books|Press|Media|Group|International|Global|World|National|Regional|Local|University|College|Institute|Academy|Society|Association|Organization|Foundation|Center|Bureau|Office|Department|Division|Section|Unit|Team|Group|Committee|Council|Board|Commission|Agency|Service|Program|Project|Initiative|Enterprise|Venture|Business|Firm|Studio|Workshop|Laboratory|Research|Development|Production|Distribution|Marketing|Sales|Retail|Store|Shop|Market|Exchange|Trade|Commerce|Industry|Sector|Field|Domain|Area|Region|Zone|Territory|District|Province|State|Country|Nation|Empire|Kingdom|Republic|Federation|Union|Alliance|League|Confederation|Coalition|Partnership|Corporation|Company|Firm|Enterprise|Venture|Business|Organization|Institution|Agency|Bureau|Office|Department|Division|Section|Unit|Team|Group|Committee|Council|Board|Commission|Service|Program|Project|Initiative|Studio|Workshop|Laboratory|Research|Development|Production|Distribution|Marketing|Sales|Retail|Store|Shop|Market|Exchange|Trade|Commerce|Industry|Sector|Field|Domain|Area|Region|Zone|Territory|District|Province|State|Country|Nation|Empire|Kingdom|Republic|Federation|Union|Alliance|League|Confederation|Coalition|Partnership)' > "$tmp_file"

  # Replace original file with cleaned version
  mv "$tmp_file" "$file"
done

echo "✅ Removed publication names from all files"

# Recreate all_ships.txt with the cleaned files
echo "Recreating all_ships.txt..."
cat *.txt | sort -u > all_ships.txt
echo "✅ Updated all_ships.txt"
