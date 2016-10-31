var api = require('../visionect-api');
var config = require('./config');

api.setConfig(config);

var uuid = 'your_uuid';


// upload an image
api.sendImage(uuid,'../upload1.jpg').then(function (res) {
    console.log("image uploaded !", res);
})
