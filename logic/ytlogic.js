var config = require('../config.json'),
    ytdl = require('ytdl-core'),
    request = require('request');

function base(passed, msg){
  var final;
  console.log(passed, "passed one");
  if (passed[0] == "\'"){
    return;
  } else {
    passed = passed.toLowerCase();
    final = passed.replace(/\"/g, "").split(' ').join(',');
  }
  console.log(final, "final one")
  request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${final}&key=${config.info.apiKEY}`, function(err, res, body){
    var testbody = JSON.parse(body)
    var search = testbody.items[0].id.videoId;
    ytpb(search, msg);
  })
}

function ytpb(search, msg){
  var streamOptions = { seek: 0, volume: 1 };
  if (msg.member.voiceChannel){
    msg.member.voiceChannel.join()
    .then(function(connection){
      var stream = ytdl(`https://www.youtu.be/${search}`, {filter: "audioonly"})
      connection.playStream(stream, streamOptions);
    })
  } else {
    msg.channel.sendMessage(`https://www.youtu.be/${search}`)
  }
}


module.exports = {
  base: base,
}
