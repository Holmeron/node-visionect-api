var visionectMethods = {
  visionectGetMethod : visionectGetMethod,
  visionectPutMethod : visionectPutMethod,
  visionectPostMethod : visionectPostMethod,
  visionectDeleteMethod : visionectDeleteMethod,
  visionectSendImage : visionectSendImage
}

module.exports = visionectMethods;

var helper = require('./visionect-helper'),
    http = require('http'),
    util = require('util'),
    FormData = require('form-data'),
    fs = require('fs');

function visionectRequest(path,method,contentType,body,expectedHttpCode){
  var method = method ? method : 'GET',
      contentType = contentType ? contentType : 'application/json',
      expectedHttpCode = expectedHttpCode ? expectedHttpCode : 200,
      date = Date(),
      // strip get arguments from path
      cleanPath = (path.indexOf('?') > -1 ) ? path.substr(0, path.indexOf('?')) : path;

      var authorization = helper.getAuthorization(cleanPath,method,contentType,date);

      var headers = {
        'content-type' : contentType,
        'Date' : date,
        'Authorization' : authorization
      };

      body = body ? JSON.stringify(body) : null;

      var request = http.request({
         method: method,
         host: helper.getHost(),
         port: helper.getPort(),
         path: path,
         headers: headers
      });
      request.end(body);

console.log(method,helper.getHost(),helper.getPort(),path,body,authorization,date);

    var promise = new Promise(
      function(resolve, reject) {

        request.on('response', function (response) {
           var responseBody = '';
           if (response.statusCode  != expectedHttpCode) {
              resolve(('Error: ' + response.statusCode));
           }
          response.on('data', function (chunk) {
            responseBody += chunk;
          });
          response.on('end', function () {
              resolve(responseBody);
          });
        });
      }
    );
    return promise;

}

function visionectSendImage(uuid,imageFile){
  var imageStream = fs.createReadStream(imageFile);

  var form = new FormData();
  form.append('image', imageStream);
  var headers = form.getHeaders();
  date = Date(),
  path = util.format('/backend/%s', uuid),
  method = 'PUT',
  contentType = 'image/png';
  headers.Date = date;
  headers.Authorization =  helper.getAuthorization(path,method,contentType,date);


  var request = http.request({
     method: method,
     host: helper.getHost(),
     port: helper.getPort(),
     path: path,
     headers: headers
  });

  // console.log(util.inspect(form, {showHidden: false, depth: null}));

  console.log('uuid : ',uuid);
  console.log('host : ',helper.getHost());
  console.log('content-type : ',headers['content-type']);
  console.log('apiKey : ',helper.getApiKey());
  console.log('apiSecret : ',helper.getApiSecret());
  console.log('requete url : ',helper.getHost()+':'+'8081'+path);
  console.log('headers : ',util.inspect(headers, {showHidden: false, depth: null}));


  var promise = new Promise(
    function(resolve, reject) {

      form.pipe(request);

      request.on('response', function (res) {
         var body = '';
         if (res.statusCode  != 200) {
            reject('Error: ' + res.statusCode)
         }
        imageStream.on('error', function(err) {
          res.end('error imageStream : ',err);
        });
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('end', function () {
          resolve(body);
        });
      });
    }
  );
  return promise;
}

function visionectGetMethod(path,expectedHttpCode,contentType){
  return visionectRequest(path,'GET',contentType,null,expectedHttpCode)
}

function visionectPutMethod(path,body,expectedHttpCode,contentType){
  return visionectRequest(path,'PUT',contentType,body,expectedHttpCode);
}

function visionectPostMethod(path,body,expectedHttpCode,contentType){
  return visionectRequest(path,'POST',contentType,body,expectedHttpCode);
}

function visionectDeleteMethod(path,contentType,expectedHttpCode){
  return visionectRequest(path,'DELETE',contentType,null,expectedHttpCode);
}
