var visionectApi = {
  // getDevice : getDevice,
  getDeviceList : getDeviceList
  // updateDevice : updateDevice,
  // updateDeviceList : updateDeviceList,
  // removeDevice : removeDevice,
  // rebootDevice : rebootDevice,
}

module.exports = visionectApi;

var methods = require('./visionect-methods');

function getDeviceList(){

  return methods.visionectGetMethod('/api/device/');
}
