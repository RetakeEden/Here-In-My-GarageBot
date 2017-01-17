var config = require('../config.json'),
    request = require('request'),
    parse = require('./parse.js'),
    curconn = null,
    playm = require('playmusic'),
    disp = null,
    alls = null;


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

pm.getAllTracks(function(err, library) {
  if(err) {
    console.log(err);
  }
    alls = library.data.items;
    shuffle();
});

function newList(msg){
  pm.getAllTracks(function(err, library) {
    if(err) {
      console.log(err);
    }
      alls = library.data.items;
      msg.channel.sendMessage("New playlist created.");
      shuffle(msg);
  });
}

function playCurr(msg) {
  if (alls.length == 0){
    msg.channel.sendMessage("Out of songs.");
    return;
  }
  const streamOptions = { seek: 0, volume: 1 };
  var cursong = alls.pop();
  new Promise(function(resolve, reject){
    pm.getStreamUrl(cursong.id, function(err, streamUrl){
      console.log(streamUrl);
      resolve(streamUrl);
    });
  })
  .then(function(streamUrl){
    if(msg.member.voiceChannel){
      msg.member.voiceChannel.join()
      .then(function(connection){
        curconn = connection;
        if (disp == null){

          msg.channel.sendMessage(`Currently Playing: \"${cursong.title}\" by \"${cursong.artist}\"`);

          disp = connection.playStream(request({
            uri: streamUrl,
            followAllRedirects: true
          }));

          disp.on('end', () => {
            disp = null;
            playNext(msg, connection);
          })

          disp.on('error', (err) => {
            console.log(err)
            msg.channel.sendMessage("There was an error!");
          })
        }
      })
    } else {
      msg.channel.sendMessage("You're not in a voice channel!");
    }
  })
  .catch(console.log);
}

function clearq(msg){
  curconn = null;
  disp = null;
  // getAll(msg);
  msg.channel.sendMessage("Clearing Queue");
}

function shuffle(msg){
  var currentIndex = alls.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    alls[currentIndex] = alls[randomIndex];
    alls[randomIndex] = temporaryValue;
  }

  alls = alls;
  if (msg) {
    msg.channel.sendMessage("Playlist Shuffled");
  }
}

function gskip(msg){
  disp.end();
  msg.channel.sendMessage("Skipping current song.");
}

module.exports = {
  clearq: clearq,
  gskip: gskip,
  shuffle: shuffle,
  newList: newList,
}
