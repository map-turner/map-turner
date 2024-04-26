#!/bin/bash

gzip -d data/*.json.gz

MASTER_FILE="collection.csv"

# Loop through each CSV file
for file in data/*.json; do
    # Skip the master file itself
    if [ "$file" != "$MASTER_FILE" ]; then
        jq -r '.data | map(join(",")) | join("\n")' "$file" > "$file.csv"
        # Add a column with the filename to each row and append to the master file
        awk -v filename="$file.csv" '{print $0 "," filename}' "$file.csv" >> "data/$MASTER_FILE"
    fi
done
