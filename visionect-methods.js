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

function visionectGetMethod(path){
    var method = 'GET',
    contentType = 'application/json',
    date = Date(),
    expectedHttpCode = 200;

    var authorization = helper.getAuthorization(path,method,contentType,date);

    var headers = {
      'content-type' : contentType,
      'Date' : date,
      'Authorization' : authorization
    };

    var request = http.request({
       method: method,
       host: helper.getHost(),
       port: helper.getPort(),
       path: path,
       headers: headers
    });

    var promise = new Promise(
    function(resolve, reject) {

      request.on('response', function (response) {
         var body = '';
         if (response.statusCode  != expectedHttpCode) {
            resolve(('Error: ' + response.statusCode));
         }
        response.on('data', function (chunk) {
          body += chunk;
        });
        response.on('end', function () {
          resolve(body);
        });
      });
      request.end();

  });
  return promise;

}
function visionectPutMethod(){

}

function visionectPostMethod(){

}

function visionectDeleteMethod(){

}
