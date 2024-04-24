#!/bin/bash

source .env

# Set the initial date
start_date=$(date --date "$range_start_date" '+%Y-%m-%d')
end_date=$(date --date "$start_date +$step_size" '+%Y-%m-%d')

while [[ $(date --date "$end_date +$step_size" '+%s') -le $(date --date "$range_end_date" '+%s') ]]
do
    echo "Starting, getting: $start_date"

    formatted_start_date=$(date --date "$start_date" '+%d/%m/%Y')
    formatted_end_date=$(date --date "$end_date" '+%d/%m/%Y')

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
        --data-urlencode "from_date=$formatted_start_date" \
        --data-urlencode 'from=struct' \
        --data-urlencode 'from_tz=Europe/London' \
        --data-urlencode 'from_time=00:00' \
        --data-urlencode "to_date=$formatted_end_date" \
        --data-urlencode 'to=struct' \
        --data-urlencode 'to_tz=Europe/London' \
        --data-urlencode 'to_time=23:59' \
        --data-urlencode "aggregateAttribute=$aggregate_attribute" \
        --data-urlencode 'location.id=2806' \
        --output "data/$start_date-to-$end_date.csv.gz"

    # Increment the date for the next iteration
    # TODO: double check if we really need to add a day here
    start_date=$(date --date "$end_date +1 day" '+%Y-%m-%d')
    end_date=$(date --date "$start_date +$step_size" '+%Y-%m-%d')
done
    echo "Done."



