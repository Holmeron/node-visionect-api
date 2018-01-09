# node-visionect-api

node package to easily use visionect services. 

NPM package here www.npmjs.com/package/visionect-api

## Prerequisite

You'll need an instance of Visionect Server to use it 
https://docs.visionect.com/VisionectSoftwareSuite/Installation.html
When your server is running, go to your backend, select the user tab, and add a new apiKey.

## Install the package

1. With npm installed : 
```
npm install visionect-api
```

2. Require it in your project

```
var api = require('./visionect-api')
```

3. Configure visionect-api

```
api.setConfig({
    {
      host : "your_host",
      port : 8081,
      apiKey : "your_apiKey",
      apiSecret : "your_apiSecret"
    }
})
```
## Usage

Right now all request returns a promise object, you can use it like so :
```
 api.getDevices().then(function (devices) {
    // console.log(devices);
})
```

## Troubleshooting

Don't forget to look up Visionect documentaton if you have any question regarding Visionect services
https://docs.visionect.com/

If sendImage returns "connection refused", try changing the settings of your device :
- directly in the back office :
    1. select your device
    2. under session/backend
    3. change to "HTTP - external renderer"
- or with the API
    1. getDevice(yourUuid)
    2. edit device object : ["Backend"]["Name"] = "HTTP"
    3. update device with your object
   
