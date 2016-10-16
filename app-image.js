var crypto = require('crypto'),
FormData = require('form-data'),
fs = require('fs'),
http = require('http'),
util = require('util'),
config = require('./config'),
method = 'PUT';
var imageStream = fs.createReadStream('image2.jpg');

var form = new FormData();
form.append('image', imageStream);
var headers = form.getHeaders();
date = Date(),
path = util.format('/backend/%s', config.uuid);
console.log(path);


auth = crypto.createHmac('sha256', config.apiSecret)
     .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', headers['content-type'], date, path))
     .digest('base64')

headers.Date = date;
headers.Authorization = util.format('%s:%s', config.apiKey, auth);

var request = http.request({
   method: method,
   host: config.host,
   port: config.port,
   path: path,
   headers: headers
});

// console.log(util.inspect(form, {showHidden: false, depth: null}));
form.pipe(request);

console.log('uuid : ',config.uuid);
console.log('host : ',config.host);
console.log('content-type : ',headers['content-type']);
console.log('apiKey : ',config.apiKey);
console.log('apiSecret : ',config.apiSecret);
console.log('requete url : ',config.host+':'+'8081'+path);
console.log('headers : ',util.inspect(headers, {showHidden: false, depth: null}));

request.on('response', function (res) {
    console.log(res.statusCode);
   var body = '';
   if (res.statusCode  != 200) {
      console.log('Error: ' + res.statusCode)
   }
  imageStream.on('error', function(err) {
    res.end('error imageStream : ',err);
  });
  res.on('data', function (chunk) {
      console.log('chocolate ',chunk);
    body += chunk;
  });
  res.on('end', function () {
    console.log('end : ' + body);
  });
});

// request.end();
