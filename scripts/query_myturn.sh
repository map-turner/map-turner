#!/bin/bash

source .env

# Set the initial date
start_date=$(date -u -d '2023-01-01' +%d/%m/%Y)
end_date=$(date -u -d "$start_date + 1 month" +%d/%m/%Y)
start_date_file_name=$(date -u -d "$start_date" +%d-%m-%Y)
end_date_file_name=$(date -u -d "$end_date" +%d-%m-%Y)



# Set the number of iterations
iterations=5



# Loop through the iterations
for ((i=1; i<=$iterations; i++)); do
    echo "Iteration $i - starting"
    echo "url: $api_url"
	

    curl --location "https://$api_url/library/rpc/aggregateLoanReport" \
        --header "Host: $api_url" \
        --header 'Accept: application/json, text/javascript, */*; q=0.01' \
        --header 'Accept-Encoding: gzip, deflate, br' \
        --header "Referer: https://$api_url/" \
        --header 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
        --header 'X-Requested-With: XMLHttpRequest' \
        --header "Origin: https://$api_url" \
        --header 'DNT: 1' \
        --header 'Connection: keep-alive' \
        --header "Cookie: $cookie" \
        --header 'Sec-Fetch-Dest: empty' \
        --header 'Sec-Fetch-Mode: cors' \
        --header 'Sec-Fetch-Site: same-origin' \
        --header "host: $api_url" \
        --data-urlencode "from_date=$start_date" \
        --data-urlencode 'from=struct' \
        --data-urlencode 'from_tz=Europe/London' \
        --data-urlencode 'from_time=00:00' \
        --data-urlencode "to_date=$end_date" \
        --data-urlencode 'to=struct' \
        --data-urlencode 'to_tz=Europe/London' \
        --data-urlencode 'to_time=23:59' \
        --data-urlencode 'aggregateAttribute=zip' \
        --data-urlencode 'location.id=2806' \
        --output "data/$start_date_file_name-to-$end_date_file_name.csv.gz"

    # Print the response
    echo "Iteration $i - done"

    # Increment the date for the next iteration
    start_date=$end_date
    end_date=$(date -u -d "$start_date + 1 month" +%d/%m/%Y)
    start_date_file_name=$(date -u -d "$start_date" +%d-%m-%Y)
    end_date_file_name=$(date -u -d "$end_date" +%d-%m-%Y)
done



