var config = require('../config.json'),
    ytdl = require('ytdl-core'),
    request = require('request'),
    parse = require('./parse.js'),
    search = [],
    searchname = [],
    client = '',
    disp = null;

function base(passed, msg, clie){
  if (passed[0] == "\'"){
    return;
  } else {
    passed = passed.toLowerCase();
    var final = passed.replace(/\"/g, "").split(' ').join(',');
  }
  request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${final}&maxResults=1&key=${config.info.apiKEY}`, function(err, res, body){
    if (search.length == 0) {
      var testbody = JSON.parse(body)
      search.push(testbody.items[0].id.videoId);
      searchname.push(testbody.items[0].snippet.title);
      msg.channel.sendMessage("\"" +testbody.items[0].snippet.title + "\" has been added to queue.")
      ytpb(msg);
    } else {
      var testbody = JSON.parse(body)
      search.push(testbody.items[0].id.videoId);
      searchname.push(testbody.items[0].snippet.title);
      msg.channel.sendMessage("\"" +testbody.items[0].snippet.title + "\" has been added to queue.")
    }
  })
}

function queue(msg){
  if (searchname.length > 1) {
    playwith = searchname;
    current = playwith.shift();
    nextup = playwith;
    msg.channel.sendMessage(`Currently Playing: \"${current}\"`);
    msg.channel.sendMessage(`In Queue: ${nextup}`);
  } else {
    msg.channel.sendMessage("Currently Playing: " + searchname)
    msg.channel.sendMessage("There is nothing else in queue");
  }
  console.log(search);
}

function ytpb(msg){
  const streamOptions = { seek: 0, volume: 1 };
  var stream = ytdl(`https://www.youtube.com/watch?v=${search[0]}`, {filter: "audioonly"});

  if (msg.member.voiceChannel){
    msg.member.voiceChannel.join()
    .then(function(connection){
      if (disp == null){
        msg.channel.sendMessage(`Currently Playing: ${searchname[0]}`);
        if (searchname.length > 1) {
          msg.channel.sendMessage(`Up Next: ${searchname[1]}`);
        }
        disp = connection.playStream(stream, streamOptions);
        var conn = disp;

        disp.on('end', () => {
          disp = null;
          search.splice(0,1);
          searchname.splice(0,1);
          playNext(msg, conn);
        });

        disp.on('error', (err) => {
          console.log(err)
          msg.channel.sendMessage("There was an error!");
        })
      } else {
        disp = connection.playStream(stream, streamOptions);
      }
    })
  } else {
    msg.channel.sendMessage("You're not in a voice channel!")
  }
}

function yskip(msg){

}

function playNext(msg, conn){
    if (search.length == 0) {
      msg.voiceChannel.disconnect();
      msg.channel.sendMessage("Queue empty. Disconnecting!");
    } else {
      ytpb(msg)
    }
}

module.exports = {
  base: base,
  queue: queue,
}
