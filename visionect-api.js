var visionectApi = {
    getDevice: getDevice,
    getDeviceList: getDeviceList,
    updateDevice: updateDevice,
    updateDeviceList: updateDeviceList,
    removeDevice: removeDevice,
    rebootDevice: rebootDevice,

    getSession: getSession,
    getSessionList: getSessionList,
    updateSession: updateSession,
    updateSessionList: updateSessionList,
    removeSession: removeSession,
    createSession: createSession,
    restartSession: restartSession,
    restartSessionList: restartSessionList,

    getUser: getUser,
    getUserList: getUserList,
    updateUser: updateUser,
    updateUserList: updateUserList,
    createUser: createUser,
    removeUser: removeUser,

    getVisionectConfig: getVisionectConfig,
    updateConfig: updateConfig,

    getServerLiveView: getServerLiveView,
    getDeviceLiveView: getDeviceLiveView,

    getDeviceStatus: getDeviceStatus,

    sendImage: sendImage,

    setConfig: setConfig
}

module.exports = visionectApi;

var methods = require('./visionect-methods');
var helper = require('./visionect-helper');

function getDeviceList() {
    return methods.visionectGetMethod('/api/device/');
}

function getDevice(uuid) {
    return methods.visionectGetMethod('/api/device/' + uuid);
}

function updateDevice(uuid, body) {
    return methods.visionectPutMethod('/api/device/' + uuid, body, 204);
}

function updateDeviceList(bodyList) {
    return methods.visionectPutMethod('/api/device/', bodyList, 204);
}

function removeDevice(id) {
    return methods.visionectDeleteMethod('api/device/' + id, 204, 'application/json');
}

function rebootDevice(id) {
    return methods.visionectPostMethod('api/device/' + id, 204, 'application/json');
}

function getSession(uuid) {
    return methods.visionectGetMethod('/api/session/' + uuid);
}

function getSessionList() {
    return methods.visionectGetMethod('/api/session/');
}

function updateSession(uuid, body) {
    return methods.visionectPutMethod('/api/session/' + uuid, body, 204);
}

function updateSessionList(body) {
    return methods.visionectPutMethod('/api/session/', body, 204);
}

function removeSession(id) {
    return methods.visionectDeleteMethod('/api/session/' + id, 204, 'application/json');
}

function createSession(id, body) {
    return methods.visionectPostMethod('/api/session/' + id, body, 201, 'application/json');
}

function restartSession(id) {
    return methods.visionectPostMethod('/api/session/' + id + '/restart', null, 201, 'application/json');
}

function restartSessionList(id, body) {
    return methods.visionectPostMethod('/api/session/restart', body, 201, 'application/json');
}

function getUser(name) {
    return methods.visionectGetMethod('/api/user/' + name);
}

function getUserList() {
    return methods.visionectGetMethod('/api/user/');
}

function updateUser(name, body) {
    return methods.visionectPutMethod('/api/user/' + name, body, 204);
}

function updateUserList(body) {
    return methods.visionectPutMethod('/api/user/', body, 201);
}

function createUser(body) {
    return methods.visionectPostMethod('/api/user/', body, 201, 'application/json');
}
function removeUser(username) {
    return methods.visionectDeleteMethod('/api/user/' + username, 204, 'application/json');
}

function getVisionectConfig() {
    return methods.visionectGetMethod('/api/config/');
}

function updateConfig(body) {
    return methods.visionectPutMethod('/api/config/', body, 204);
}

function getServerLiveView(uuid) {
    return methods.visionectGetMethod('/api/live/device/' + uuid + '/cached.png', 200, 'image/png');
}

function getDeviceLiveView(uuid) {
    return methods.visionectGetMethod('/api/live/device/' + uuid + '/image.png', 200, 'image/png');
}

function getDeviceStatus(uuid, dateFrom, dateTo, group) {
    return methods.visionectGetMethod('/api/devicestatus/' + uuid + '?from=' + dateFrom + '&to=' + dateTo + '&group=' + group);
}

function sendImage(uuid, imageFile) {
    return methods.visionectSendImage(uuid, imageFile);
}

function setConfig(config) {
    helper.setApiSecret(config.apiSecret);
    helper.setApiKey(config.apiKey);
    helper.setHost(config.host);
    helper.setPort(config.port);
}
