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

function updateDevice(){

}

function updateDeviceList(){

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

function updateSession(){

}

function updateSessionList(){

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

function updateUser(){

}

function updateUserList(){

}

function createUser(){

}

function getConfig(){
  return methods.visionectGetMethod('/api/config/');
}

function updateConfig(){

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
