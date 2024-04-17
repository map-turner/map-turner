import 'dotenv/config'
var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');

var options = {
  'method': 'POST',
  'hostname': process.env.api_url,
  'path': '/library/rpc/aggregateLoanReport',
  'headers': {
    'Host': process.env.api_url,
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-GB,en;q=0.7,fr;q=0.3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://' + process.env.api_url + '/',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': 'https://' + process.env.api_url + '',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Cookie': process.env.cookie,
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'host': process.env.api_url
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = qs.stringify({
  'from_date': '15/03/2024',
  'from': 'struct',
  'from_tz': 'Europe/London',
  'from_time': '00:00',
  'to_date': '15/04/2024',
  'to': 'struct',
  'to_tz': 'Europe/London',
  'to_time': '23:59',
  'aggregateAttribute': 'zip',
  'location.id': '2806'
});

req.write(postData);

req.end();