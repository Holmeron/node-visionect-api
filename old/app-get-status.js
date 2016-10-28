var crypto = require('crypto'),

fs = require('fs'),
http = require('http'),
util = require('util'),
config = require('./config'),
method = 'GET';

var headers = {
 'content-type':'application/json'
},
dateFrom = 1476257955,
to = 1476258955,
group = 'johny',
date = Date(),
path = util.format('/api/devicestatus/%s?from=%s&to=%s&group=%s', config.uuid,dateFrom,to,group);
authPath = util.format('/api/devicestatus/%s', config.uuid);

auth = crypto.createHmac('sha256', config.apiSecret)
     .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', headers['content-type'], date, authPath))
     .digest('base64')

headers.Date = date;
headers.Authorization = util.format('%s:%s', config.apiKey, auth)

var request = http.request({
   method: method,
   host: config.host,
   port: config.port,
   path: path,
   headers: headers
});
request.end();

console.log('host : ',config.host);
console.log('apiKey : ',config.apiKey);
console.log('apiSecret : ',config.apiSecret);
console.log('requete url : ',config.host+':'+'8081'+path);
console.log(util.inspect(headers, {showHidden: false, depth: null}));

request.on('response', function (response) {
   var body = '';
   if (response.statusCode  != 200) {
      console.log('Error: ' + response.statusCode)
   }
  response.on('data', function (chunk) {
    body += chunk;
  });
  response.on('end', function () {
    console.log('BODY: ' + body);
  });
});
request.end();
