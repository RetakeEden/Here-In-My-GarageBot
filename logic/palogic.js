var config = require('../config.json'),
    request = require('request'),
    parse = require('./parse.js'),
    curconn = '',
    disp = null,
    base = "https://tuner.pandora.com/services/json";


var partinfo = {
  "username": "android",
  "password": "AC7IBG09A3DTSYM4R41UJWL07VLN8JI7",
  "deviceId": "android-generic"
}

var loginfo = {
  "uri": `${base}`,
  "method": "POST",
  form: JSON.stringify(partinfo)
}
function plogin(msg){
  request(loginfo, function(err, res, body){
    if (err) {
      console.log(err);
    }
    console.log(body);
  })
}


module.exports = {
  plogin: plogin,

}
