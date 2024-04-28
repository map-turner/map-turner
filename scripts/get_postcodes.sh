#!/bin/bash

echo 'postcode,status,usertype,easting,northing,positional_quality_indicator,country,latitude,longitude,postcode_no_space,postcode_fixed_width_seven,postcode_fixed_width_eight,postcode_area,postcode_district,postcode_sector,outcode,incode' > postcodes.csv

# If you're in the UK, this works but it's quite slow as the file has so many rows.
curl https://www.getthedata.com/downloads/open_postcode_geo.csv.tar.gz --output open_postcode_geo.csv.tar.gz
tar -zxvf open_postcode_geo.csv.tar.gz open_postcode_geo.csv
cat open_postcode_geo.csv >> postcodes.csv

# If you're lucky, regional extracts might be available see https://www.getthedata.com/open-postcode-geo eg for Merseyside:
# curl https://www.getthedata.com/downloads/open_postcode_geo_merseyside.csv >> postcodes.csv
