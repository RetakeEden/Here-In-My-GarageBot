var config = require('../config.json'),
    request = require('request'),
    parse = require('./parse.js'),
    curconn = '',
    playm = require('playmusic'),
    disp = null;


var pm = new playm();

pm.init({email: `${config.info.gpemail}`, password: `${config.info.gppass}`}, function(err){
  if(err) {
    console.log(err)
  };
});

function getAll(msg) {
  pm.getAllTracks(function(err, library) {
        var alls = library.data.items;
        var firsong = alls.pop();
        console.log(firsong);
        pm.getStreamUrl(firsong.id, function(err, streamUrl) {
            console.log(streamUrl);
            msg.channel.sendMessage(streamUrl);
        });
    });
}


module.exports = {
  getAll = getAll,
}
