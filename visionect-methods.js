var visionectMethods = {
  visionectGetMethod : visionectGetMethod,
  visionectPutMethod : visionectPutMethod,
  visionectPostMethod : visionectPostMethod,
  visionectDeleteMethod : visionectDeleteMethod
}

module.exports = visionectMethods;

var helper = require('./visionect-helper'),
    http = require('http'),
    util = require('util');

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
