var api = require('./visionect-api.js');

var config = {
    apiKey: '',
    apiSecret: '',
    host: '',
    port: ''
}

api.setConfig(config);

// get server config

api.getVisionectConfig().then(function (response) {
    console.log(response);
})