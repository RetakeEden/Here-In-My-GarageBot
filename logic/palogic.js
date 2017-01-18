var config = require('../config.json'),
    request = require('request'),
    parse = require('./parse.js'),
    curconn = '',
    disp = null,
    base = "https://tuner.pandora.com/services/json/";


var partinfo = {
  "username": "android",
  "password": "AC7IBG09A3DTSYM4R41UJWL07VLN8JI7",
  "deviceModel": "android-generic",
}

var loginfo = {
  "method": "POST",
  "url": base,
  "qs": {
    "method": "auth.partnerLogin"
  },
  "body": JSON.stringify(partinfo)
}
function plogin(msg){
  request(loginfo, function(err, res, body){
    if (err) {
      console.log(err);
    }
    console.log(JSON.parse(body));
  })
}


module.exports = {
  plogin: plogin,

}
