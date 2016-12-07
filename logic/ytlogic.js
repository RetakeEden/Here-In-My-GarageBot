var config = require('../config.json'),
    ytdl = require('ytdl-core'),
    request = require('request'),
    search = [],
    searchname = [];

function base(passed, msg){
  if (passed[0] == "\'"){
    return;
  } else {
    passed = passed.toLowerCase();
    var final = passed.replace(/\"/g, "").split(' ').join(',');
  }
  request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${final}&maxResults=1&key=${config.info.apiKEY}`, function(err, res, body){
    var testbody = JSON.parse(body)
    console.log(testbody);
    search.push(testbody.items[0].id.videoId);
    console.log(testbody.items[0].snippet.title)
    searchname.push(testbody.items[0].snippet.title);
    msg.channel.sendMessage("")
    ytpb(msg);
  })
}

function queue(msg){
  msg.channel.sendMessage("The current queue is: " + searchname)
}

function ytpb(msg){
  if (msg.member.voiceChannel){
    msg.member.voiceChannel.join()
    .then(function(connection){
      queued(connection, msg);
    })
  } else {
    msg.channel.sendMessage("You're not in a voice channel!")
  }
}

function queued(conn, msg){
  var streamOptions = { seek: 0, volume: 1 };
  var stream = ytdl(`https://www.youtube.com/watch?v=${search[0]}`, {filter: "audioonly"})
  msg.channel.sendMessage("Now playing: " + searchname[0]);
  var disp = conn.playStream(stream, streamOptions);
  disp.on('end', function(){
    conn.disconnect();
    // search.splice(0,1);
    // searchname.splice(0,1);
    // ytpb(msg);
  })
}

module.exports = {
  base: base,
}
