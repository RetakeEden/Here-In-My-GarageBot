var config = require('../config.json'),
    request = require('request'),
    parse = require('./parse.js');

var data = {
  "jsonrpc": "2.0",
  "method": "generateIntegers",
  "params": {
      "apiKey": `${config.info.rapi}`,
      "n": 1,
      "min": 1,
      "max": 100,
      "replacement": true
  },
  "id": 1
}

var random = {
  "url": "https://api.random.org/json-rpc/1/invoke",
  "method": "POST",
  form: JSON.stringify(data)
}

function rng(msg){
  request(random, function(err,res,body){
    if (err) {console.log(err)};
    body = JSON.parse(body);
    msg.channel.sendMessage(`RNGesus has decreed: ${body.result.random.data[0]}`);
  })
}


module.exports = {
  rng: rng,
}
