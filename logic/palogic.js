var config = require('../config.json'),
    request = require('request'),
    parse = require('./parse.js'),
    curconn = '',
    disp = null,
    pan = required('anesidora');

var pandora = new pan(`${config.info.panlog}`, `${config.info.panpass}`);

function plogin(msg){
  pandora.login(function(err){
    if(err) {console.log(err)};
    pandora.requrest(function(err, stations){
      if(err) {console.log(err)};
      msg.channel.sendMessage("Current Pandora Stations: " + stations);
    })
  })
}


module.exports = {
  plogin: plogin,

}
