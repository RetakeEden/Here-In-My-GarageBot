var Discord = require('discord.js');
var config = require('./config.json')

var discordjs = new Discord.Client();

var recent = true;

discordjs.on("ready", function() {
  console.log('Currently on. Connected.');
});


discordjs.on('message', function(msg){
  var smsg = msg.toString()
  var umsg = smsg.toUpperCase();
  if(msg.member.voiceChannel){
    if (umsg == "$KNOWLEDGE") {
      console.log("knowledge was called")
      msg.member.voiceChannel.join()
      .then(function(connection){
        connection.playFile('./himg.mp3')
        recent = true;
      setTimeout(function(){
        msg.member.voiceChannel.leave();}, 5000);
      });
    } else if (umsg == "HI TAI!") {
      msg.channel.sendMessage("Hello "+msg.author.username + ". Have you seen my 47 lambourghinis??");
      recent = false;
      console.log("Hi was called");
    } else if (umsg == "$FULLTHING"){
      console.log("fullthing was called");
      msg.member.voiceChannel.join()
      .then(function(connection){
        connection.playFile('./fullthing.mp3')
        recent = false;
      setTimeout(function(){
        msg.member.voiceChannel.leave();}, 200000);
      });
    } else if (umsg == "$KNAWLEDGE") {
      console.log("knawledge was called");
      msg.member.voiceChannel.join()
      .then(function(connection){
        connection.playFile('./garaaaage.mp3')
        recent = false;
      setTimeout(function(){
        msg.member.voiceChannel.leave();}, 3000);
      });
    } else if (umsg == "TAI PLS GO"){
      msg.member.voiceChannel.leave();
    } else if (umsg == "TAI CLEAN") {
      getChannelLogs(msg.channel || msg.member.channel, 25, before, function(err, del){
        deleteMessages(del, function(err){
          if (err) console.log(err);
        })
      });
    }
  } else {
    if (recent){
      msg.channel.sendMessage("I can't tell you about my self-help if you don't join a voice channel, "+ msg.author.username + "!")
      console.log("user had no voice channel");
      return "no voice channel";
      recent = true;
    }
  }
});



discordjs.login(config.info.email, config.info.password);
