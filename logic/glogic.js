var request = require('request');
var parse = require('./parse.js');

function msgFix(x){
  if (x[0] == "\'"){
    return;
  } else {
    x = x.toLowerCase();
    return x.replace(/\"/g, "").split(' ').join('+');
  }
}

function img(params, msg){
  request(`http://api.giphy.com/v1/gifs/translate?s=${params}&api_key=dc6zaTOxFJmzC`, function(err, res, body){
    // console.log(parse.jsonParse(res));
    console.log('+++++++++++++++++++++++++++++++');
    var parsedBody = parse.jsonParse(body);
    var pass = parsedBody.data[0].bitly_url;
    msg.channel.sendMessage(pass);
  })
}
module.exports = {
  msgFix: msgFix,
  img: img
}
