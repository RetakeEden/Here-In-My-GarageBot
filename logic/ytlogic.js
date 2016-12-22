var config = require('../config.json'),
    ytdl = require('ytdl-core'),
    request = require('request'),
    parse = require('./parse.js'),
    search = [],
    searchname = [],
    curconn = '',
    disp = null;

function base(passed, msg){
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
  if (searchname.length == 0){
    msg.channel.sendMessage("There is nothing in queue.");
  } else if (searchname.length > 1) {
    msg.channel.sendMessage(`Currently Playing: \"${searchname[0]}\"`);
    msg.channel.sendMessage(`Up Next: ${searchname[1]}`);
    if (searchname.length > 2) {
      var inq = searchname.slice(2, searchname.length);
      msg.channel.sendMessage(`In Queue:${inq}`)
    }
  } else {
    msg.channel.sendMessage("Currently Playing: " + searchname)
    msg.channel.sendMessage("There is nothing else in queue");
  }
}

function ytpb(msg){
  const streamOptions = { seek: 0, volume: 1 };
  var stream = ytdl(`https://www.youtube.com/watch?v=${search[0]}`, {filter: "audioonly"});

  if (msg.member.voiceChannel){
    msg.member.voiceChannel.join()
    .then(function(connection){
      curconn = connection;
      if (disp == null){
        msg.channel.sendMessage(`Currently Playing: ${searchname[0]}`);
        if (searchname.length > 1) {
          msg.channel.sendMessage(`Up Next: ${searchname[1]}`);
        }
        disp = connection.playStream(stream, streamOptions);

        disp.on('end', () => {
          disp = null;
          playNext(msg, connection);
        });

        disp.on('error', (err) => {
          console.log(err)
          msg.channel.sendMessage("There was an error!");
        })
      } else {
        msg.channel.sendMessage(`Currently Playing: ${searchname[0]}`);
        msg.channel.sendMessage("curp in non null disp line 83");
        if (searchname.length > 1){
          msg.channel.sendMessage(`Up Next: ${searchname[1]}`);
        }
        disp = connection.playStream(stream, streamOptions);
      }
    })
  } else {
    msg.channel.sendMessage("You're not in a voice channel!")
  }
}

function yskip(msg){
  playNext(msg, curconn);
}

function playNext(msg, conn){
  search.splice(0,1);
  searchname.splice(0,1);
    if (search.length == 0) {
      conn.disconnect();
      msg.channel.sendMessage("Queue empty. Disconnecting!");
    } else {
      ytpb(msg)
    }
}

module.exports = {
  base: base,
  queue: queue,
  yskip: yskip,
}
