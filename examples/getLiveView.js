var api = require('../visionect-api');
var config = require('./config');

api.setConfig(config);

var uuid = 'your_uuid';

var fs = require('fs');
api.getDeviceLiveView(uuid).then(function (response) {
    fs.writeFile("image.png", response, 'binary', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
})

