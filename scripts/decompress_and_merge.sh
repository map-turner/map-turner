#!/bin/bash

MASTER_FILE="collection.csv"

echo '"Value","Count","Amount"' > "data/$MASTER_FILE"

for file in data/*.csv; do
    # Skip the master file itself
    if [ "$file" != "$MASTER_FILE" ]; then
        # Add a column with the filename to each row and append to the master file
        awk -v filename="$file" '{if (NR!=1) {print $0 "," filename}}' "$file" >> "data/$MASTER_FILE"
    fi
done
