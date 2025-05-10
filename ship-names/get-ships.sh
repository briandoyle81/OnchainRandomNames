#!/bin/bash
export LC_ALL=en_US.UTF-8
set -eu

# Output folder
mkdir -p ship-names
cd ship-names

# Function to scrape a list of links from a category or index page and extract ship names
scrape_ships() {
  local base_url="$1"
  local output_file="$2"
  local tmp_links="tmp_links.txt"
  local tmp_html="tmp_html.html"

  echo "Fetching links from: $base_url"

  # Add error handling for lynx
  if ! lynx -dump "$base_url" > /dev/null 2>&1; then
    echo "Error: Failed to fetch $base_url"
    return 1
  fi

  lynx -dump "$base_url" |
    grep -Eo '[0-9]+\. https://en.wikipedia.org/wiki/List_of_[^ ]+' |
    sed 's/^[0-9]*\. //' |
    sort -u > "$tmp_links"

  local num_pages=$(wc -l < "$tmp_links")
  echo "Found $num_pages list pages. Fetching content..."

  # If no pages found, create empty output file and exit
  if [ "$num_pages" -eq 0 ]; then
    echo "Warning: No list pages found for $base_url"
    touch "$output_file"
    rm -f "$tmp_links"
    return 0
  fi

  > "$output_file"
  while read -r url; do
    echo "Fetching $url"
    # Add error handling for curl
    if ! curl -s "$url" > "$tmp_html"; then
      echo "Warning: Failed to fetch $url, skipping..."
      continue
    fi

    # Add error handling for grep/sed pipeline
    if ! grep '<i>' "$tmp_html" |
      sed 's#.*<i>##' |
      sed 's#</i>.*##' |
      grep -v '>' |
      egrep '[A-Z][a-z]' >> "$output_file" 2>/dev/null; then
      echo "Warning: No ship names found in $url"
    fi

    # Only sleep after we've processed the content
    sleep 1
  done < "$tmp_links"

  sort -u "$output_file" -o "$output_file"
  echo "Saved to $output_file"

  # Only remove files if they exist
  rm -f "$tmp_links" "$tmp_html"
}

# Function to check if a file exists and has content
check_file() {
  local file="$1"
  if [ -f "$file" ] && [ -s "$file" ]; then
    return 0  # File exists and has content
  else
    return 1  # File doesn't exist or is empty
  fi
}

# United States
if ! check_file "america.txt"; then
  echo "Scraping United States ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/List_of_United_States_Navy_ships" "america.txt"
else
  echo "Skipping United States (already scraped)"
fi

# Royal Navy
if ! check_file "britain.txt"; then
  echo "Scraping Royal Navy ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/List_of_ship_names_of_the_Royal_Navy" "britain.txt"
else
  echo "Skipping Royal Navy (already scraped)"
fi

# France
if ! check_file "france.txt"; then
  echo "Scraping French ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/Category:Lists_of_ships_of_France" "france.txt"
else
  echo "Skipping France (already scraped)"
fi

# Germany
if ! check_file "germany.txt"; then
  echo "Scraping German ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/List_of_naval_ships_of_Germany" "germany.txt"
else
  echo "Skipping Germany (already scraped)"
fi

# Italy
if ! check_file "italy.txt"; then
  echo "Scraping Italian ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/Category:Lists_of_ships_of_Italy" "italy.txt"
else
  echo "Skipping Italy (already scraped)"
fi

# China
if ! check_file "china.txt"; then
  echo "Scraping Chinese ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/Category:Ships_of_the_People%27s_Liberation_Army_Navy" "china.txt"
else
  echo "Skipping China (already scraped)"
fi

# India
if ! check_file "india.txt"; then
  echo "Scraping Indian ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/List_of_ships_of_the_Indian_Navy" "india.txt"
else
  echo "Skipping India (already scraped)"
fi

# Japan
if ! check_file "japan.txt"; then
  echo "Scraping Japanese ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/Category:Lists_of_ships_of_Japan" "japan.txt"
else
  echo "Skipping Japan (already scraped)"
fi

# Turkey (includes Ottoman)
if ! check_file "turkey.txt"; then
  echo "Scraping Turkish ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/Category:Lists_of_ships_of_Turkey" "turkey.txt"
  scrape_ships "http://en.wikipedia.org/wiki/Category:Lists_of_ships_of_the_Ottoman_Empire" "ottoman.txt"
  cat ottoman.txt >> turkey.txt && sort -u turkey.txt -o turkey.txt && rm ottoman.txt
else
  echo "Skipping Turkey (already scraped)"
fi

# Spain
if ! check_file "spain.txt"; then
  echo "Scraping Spanish ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/Category:Lists_of_ships_of_Spain" "spain.txt"
else
  echo "Skipping Spain (already scraped)"
fi

# Scandinavia combined
if ! check_file "scandinavia.txt"; then
  echo "Scraping Scandinavian ship names..."
  scrape_ships "http://en.wikipedia.org/wiki/Category:Lists_of_ships_of_Sweden" "sweden.txt"
  scrape_ships "http://en.wikipedia.org/wiki/Category:Ships_of_the_Finnish_Navy" "finland.txt"
  scrape_ships "http://en.wikipedia.org/wiki/Category:Ships_of_the_Royal_Norwegian_Navy" "norway.txt"
  scrape_ships "http://en.wikipedia.org/wiki/Category:Ships_of_Denmark" "denmark.txt"
  cat sweden.txt finland.txt norway.txt denmark.txt > scandinavia.txt
  sort -u scandinavia.txt -o scandinavia.txt
  rm sweden.txt finland.txt norway.txt denmark.txt
else
  echo "Skipping Scandinavia (already scraped)"
fi

echo "✅ All ship name lists saved in: $(pwd)"

# ✅ Combine all ship name lists into one file
echo "Combining all ship names into all_ships.txt..."
cat *.txt | sort -u > all_ships.txt
echo "Saved combined list to: ship-names/all_ships.txt"
