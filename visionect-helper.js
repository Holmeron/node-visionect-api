var visionectHelper = {
  getAuthorization : getAuthorization,
  setApiKey : setApiKey,
  getApiKey : getApiKey,
  setApiSecret : setApiSecret,
  getApiSecret : getApiSecret,
  setHost : setHost,
  getHost : getHost,
  setPort : setPort,
  getPort : getPort,
  _apiKey : '',
  _apiSecret : ''
}

module.exports = visionectHelper;

var crypto = require('crypto'),
util = require('util');

function getAuthorization(path,method,contentType,date){

  var auth = crypto.createHmac('sha256', this.getApiSecret())
       .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', contentType, date, path))
       .digest('base64');
  return authorizaton =  util.format('%s:%s', this.getApiKey(), auth);
}

function setApiKey(apiKey){
  this._apiKey = apiKey;
}

function getApiKey(){
  return this._apiKey;
}

function setApiSecret(apiSecret){
  this._apiSecret = apiSecret;
}

function getApiSecret(){
  return this._apiSecret;
}

function setHost(host){
  this._host = host;
}

function getHost(){
  return this._host;
}

function setPort(port){
  this._port = port;
}

function getPort(){
  return this._port;
}
