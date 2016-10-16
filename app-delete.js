var crypto = require('crypto'),

fs = require('fs'),
http = require('http'),
util = require('util'),
config = require('./config');

function getDeviceInfo(uuid){
  var method = 'GET';

  var headers = {
   'content-type':'application/json'
  },
  date = Date(),
  path = util.format('/api/device/%s', config.uuid);

  auth = crypto.createHmac('sha256', config.apiSecret)
       .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', headers['content-type'], date, path))
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

  console.log('uuid : ',config.uuid);
  console.log('host : ',config.host);
  console.log('content-type : ',headers['content-type']);
  console.log('apiKey : ',config.apiKey);
  console.log('apiSecret : ',config.apiSecret);
  console.log('requete url : ',config.host+':'+'8081'+path);
  console.log(util.inspect(headers, {showHidden: false, depth: null}));
}
function setDeviceInfo(uuid,content){
  var method = 'PUT';

  var headers = {
   'content-type':'application/json'
  },
  date = Date(),
  path = util.format('/api/device/%s', config.uuid);

  auth = crypto.createHmac('sha256', config.apiSecret)
       .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', headers['content-type'], date, path))
       .digest('base64');

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
}
