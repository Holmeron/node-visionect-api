var api = require('../visionect-api');
var config = require('./config');

api.setConfig(config);

var uuid = 'your_uuid';

api.getDevice(uuid).then(function (device) {
    device = JSON.parse(device);
    device["Options"]["Name"] = "SignAllOufMalade#3";
    api.updateDevice(uuid, device).then(function (response) {
        console.log(reponse["Options"]["Name"]);
    });
})
