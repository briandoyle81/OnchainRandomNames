#!/bin/bash
set -eu

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR"

echo "Compiling ship names from all files..."

# Combine all .txt files, sort alphabetically, and remove duplicates
cat *.txt | sort -u > all_ships.txt

# Count the number of unique ship names
count=$(wc -l < all_ships.txt)

echo "✅ Created all_ships.txt with $count unique ship names"
