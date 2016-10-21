var visionectApi = {
  getDevice : getDevice,
  getDeviceList : getDeviceList,
  updateDevice : updateDevice,
  updateDeviceList : updateDeviceList,
  removeDevice : removeDevice,
  rebootDevice : rebootDevice,

  getSession : getSession,
  getSessionList : getSessionList,
  updateSession : updateSession,
  updateSessionList : updateSessionList,
  removeSession : removeSession,
  createSession : createSession,
  restartSession : restartSession,
  restartSessionList : restartSessionList,

  getUser : getUser,
  getUserList : getUserList,
  updateUser : updateUser,
  updateUserList : updateUserList,
  createUser : createUser,

  getConfig : getConfig,
  updateConfig : updateConfig,

  getLiveServerView : getLiveServerView,
  getDeviceLiveView : getDeviceLiveView,

  getDeviceStatus : getDeviceStatus,

  sendImage : sendImage


}

module.exports = visionectApi;

var methods = require('./visionect-methods');

function getDeviceList(){
  return methods.visionectGetMethod('/api/device/');
}

function getDevice(uuid){
  return methods.visionectGetMethod('/api/device/'+uuid);
}

function updateDevice(uuid,body){
  return methods.visionectPutMethod('/api/device/'+uuid,body,204);
}

function updateDeviceList(bodyList){
  return methods.visionectPutMethod('/api/device/',bodyList,204);
}

function removeDevice(){

}

function rebootDevice(){

}

function getSession(uuid){
  return methods.visionectGetMethod('/api/session/'+uuid);
}

function getSessionList(){
  return methods.visionectGetMethod('/api/session/');
}

function updateSession(uuid,body){
  return methods.visionectPutMethod('/api/session/'+uuid,body,204);
}

function updateSessionList(body){
  return methods.visionectPutMethod('/api/session/',body,204);
}

function removeSession(){

}

function createSession(){

}

function restartSession(){

}

function restartSessionList(){

}

function getUser(name){
  return methods.visionectGetMethod('/api/user/'+name);
}

function getUserList(){
  return methods.visionectGetMethod('/api/user/');
}

function updateUser(name,body){
  return methods.visionectPutMethod('/api/user/'+name,body,204);
}

function updateUserList(body){
  return methods.visionectPutMethod('/api/user/',body,201);
}

function createUser(){

}

function getConfig(){
  return methods.visionectGetMethod('/api/config/');
}

function updateConfig(body){
  return methods.visionectPutMethod('/api/config/',body,204);
}

function getLiveServerView(uuid){
return methods.visionectGetMethod('/api/live/device/'+uuid+'/cached.png','image/png');
}

function getDeviceLiveView(uuid){
  return methods.visionectGetMethod('/api/live/device/'+uuid+'/image.png','image/png');
}

function getDeviceStatus(uuid,dateFrom,dateTo,group){
  return methods.visionectGetMethod('/api/devicestatus/'+uuid+'?from='+dateFrom+'&to='+dateTo+'&group='+group);
}

function sendImage(){

}
