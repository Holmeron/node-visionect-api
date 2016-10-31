var api = require('./visionect-api');
var config = require('./config');

api.setConfig(config);

var uuid = '46004900-1351-3432-3434-373300000000';


/**

// get liveview

var fs = require('fs');
api.getServerLiveView(uuid).then(function (response) {
    fs.writeFile("image.png", response, 'binary', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
})



 var uuid = 'your_uuid';

 // add a user

 sjcl = require('sjcl'),
 user = "Abitbol",
 password = "faitrêverlesménagères",
 salt = "saufquemoi";
 // or, less funny salt = sjcl.codec.hex.fromBits(sjcl.random.randomWords(2));
 var enc_pass = salt + ':' + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(salt + ':' + user + ':' + password))

 var newUser = {
    "Username": user,
    "Password": enc_pass,
    "IsActive": true,
    "IsAPI": false
}

 api.createUser(newUser).then(function (response) {
    console.log(response);
})

 // remove a user

 api.removeUser('Abitbol').then(function (response) {
    console.log(response);
});

 // update a device

 api.getDevice(uuid).then(function (device) {
    device = JSON.parse(device);
    device["Options"]["Name"] = "newDeviceName";
    api.updateDevice(uuid, device).then(function (response) {
        console.log(reponse["Options"]["Name"]);
    });
})

 // get device status

 var dateFrom = Math.floor(Date.now() / 1000) - 240,
 dateTo = Math.floor(Date.now() / 1000);

 api.getDeviceStatus(uuid, dateFrom, dateTo, true).then(function (response) {
    console.log(response);
})
 **/
