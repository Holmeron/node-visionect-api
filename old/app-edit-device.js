var crypto = require('crypto'),

fs = require('fs'),
http = require('http'),
util = require('util'),
sjcl = require('sjcl'),
config = require('./config'),
method = 'PUT';

var headers = {
 'content-type':'bouyaka'
},
date = Date(),
path = util.format('/api/device/%s', config.uuid);

auth = crypto.createHmac('sha256', config.apiSecret)
     .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', headers['content-type'], date, path))
     .digest('base64')

headers.Date = date;
headers.Authorization = util.format('%s:%s', config.apiKey, auth)


var body = {
        "Uuid": "3d002800-0e47-3332-3631-383200000000",
        "Options": {
            "Name": "Meisslo"
        }
    };

var formatted = JSON.stringify(body);

console.log("formatted ", formatted);

var request = http.request({
   method: method,
   host: config.host,
   port: config.port,
   path: path,
   headers: headers,
 });
request.end(formatted);

console.log('host : ',config.host);
console.log('apiKey : ',config.apiKey);
console.log('apiSecret : ',config.apiSecret);
console.log('requete url : ',config.host+':'+'8081'+path);
console.log(util.inspect(headers, {showHidden: false, depth: null}));

request.on('response', function (response) {
   var body = '';
   if (response.statusCode  != 200) {
      console.log('Error---: ' + response.statusCode)
   }
  response.on('data', function (chunk) {
    body += chunk;
  });
  response.on('end', function () {
    console.log('BODY: ' + body);
  });
});
request.end();
