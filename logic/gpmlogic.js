var config = require('../config.json'),
    request = require('request'),
    parse = require('./parse.js'),
    curconn = '',
    playm = require('playmusic'),
    disp = null;


var pm = new playm();

pm.init({email: `ayoungbl0d@gmail.com`, password: `Fireheart214!`}, function(err){
  if(err) {
    console.log(err)
  };
});

// pm.login({email: `${config.info.gpemail}`, password: `${config.info.gppass}`}, function(err, res){
//   if(err) {
//     console.log(err)
//   };
//   console.log(res);
// });



function getAll(msg) {
  pm.getAllTracks(function(err, library) {
    if(err) {
      console.log(err);
    }
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
  getAll: getAll,
}
