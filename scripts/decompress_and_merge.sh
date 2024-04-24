#!/bin/bash

gzip -d data/*.csv.gz

#!/bin/bash

# Define the master file
MASTER_FILE="collection.csv"

# Loop through each CSV file
for file in data/*.csv; do
    # Skip the master file itself
    if [ "$file" != "$MASTER_FILE" ]; then
        # Add a column with the filename to each row and append to the master file
        awk -v filename="$file" '{print $0 "," filename}' "$file" >> "data/$MASTER_FILE"
    fi
done
