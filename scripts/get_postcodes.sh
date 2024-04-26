#!/bin/bash

echo 'postcode,status,usertype,easting,northing,positional_quality_indicator,country,latitude,longitude,postcode_no_space,postcode_fixed_width_seven,postcode_fixed_width_eight,postcode_area,postcode_district,postcode_sector,outcode,incode' > postcodes.csv
curl https://www.getthedata.com/downloads/open_postcode_geo_merseyside.csv >> postcodes.csv
