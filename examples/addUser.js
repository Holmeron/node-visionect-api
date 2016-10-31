var api = require('../visionect-api');
var config = require('./config');

api.setConfig(config);

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
