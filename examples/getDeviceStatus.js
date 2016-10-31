var api = require('../visionect-api');
var config = require('./config');

api.setConfig(config);

var uuid = 'your_uuid';

// get device status

var dateFrom = Math.floor(Date.now() / 1000) - 240,
    dateTo = Math.floor(Date.now() / 1000);

api.getDeviceStatus(uuid, dateFrom, dateTo, true).then(function (response) {
    console.log(response);
})
