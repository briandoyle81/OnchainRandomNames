#!/bin/bash
set -eu

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR"

echo "Creating JSON file from ship names..."

# Start the JSON array
echo "[" > ships.json

# Read the file and format each line as a JSON string
# Add commas between items, but not after the last one
awk '{
    if (NR > 1) print ",";
    printf "  \"%s\"", $0
}' all_ships.txt >> ships.json

# Close the JSON array
echo -e "\n]" >> ships.json

echo "✅ Created ships.json with ship names array"
