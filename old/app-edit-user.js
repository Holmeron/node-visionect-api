var crypto = require('crypto'),

fs = require('fs'),
http = require('http'),
util = require('util'),
sjcl = require('sjcl'),
config = require('./config'),
method = 'POST';

var headers = {
 'content-type':'application/json'
},
date = Date(),
path = '/api/user/';

auth = crypto.createHmac('sha256', config.apiSecret)
     .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', headers['content-type'], date, path))
     .digest('base64')

headers.Date = date;
headers.Authorization = util.format('%s:%s', config.apiKey, auth)

var user = "jeancharles";
var password = "159159159";
// hash password
var salt = "testons";
// var salt = sjcl.codec.hex.fromBits(sjcl.random.randomWords(2));
var enc_pass = salt + ':' + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(salt + ':' + user + ':' + password))

console.log('STEP 1 : ',sjcl.hash.sha256.hash(salt + ':' + user + ':' + password));
console.log('STEP 2 : ',sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(salt + ':' + user + ':' + password)));

var body = {
    "Username": user,
    "Password": enc_pass,
    "IsActive": true,
    "IsAPI": false
};

var formatted = JSON.stringify(body);

// console.log("formatted ", formatted);

var request = http.request({
   method: method,
   host: config.host,
   port: config.port,
   path: path,
   headers: headers,
 });
request.end(formatted);

// console.log('host : ',config.host);
// console.log('apiKey : ',config.apiKey);
// console.log('apiSecret : ',config.apiSecret);
// console.log('requete url : ',config.host+':'+'8081'+path);
// console.log(util.inspect(headers, {showHidden: false, depth: null}));

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
