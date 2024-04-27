#!/bin/bash

MASTER_FILE="data/collection.csv"

echo '"Value","Count","Amount","Filename"' > "$MASTER_FILE"

for file in data/*.csv; do
    # Skip the master file itself
    if [ "$file" != "$MASTER_FILE" ]; then
        # Drop the header and add a column with the filename to each row and append to the master file
        awk -v filename="$file" '{if (NR!=1) {print $0 "," filename}}' "$file" >> "$MASTER_FILE"
    fi
done

