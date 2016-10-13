var Discord = require('discord.js');
var config = require('./config.json')

var discordjs = new Discord.Client();

var recent = false;

discordjs.on("ready", function() {
  console.log('Currently on. Connected.');
});


discordjs.on('message', function(msg){
  // discordjs.getMessage(msg.channel, msg.id)
  // .then(function(grabbed){
    var smsg = msg.toString()
    var umsg = smsg.toUpperCase();
    if(msg.member.voiceChannel){
      console.log(msg.member.voiceChannel)
      if (umsg == "$KNOWLEDGE") {
        console.log("knowledge was called")
        msg.member.voiceChannel.join()
        .then(function(connection){
          connection.playFile('./himg.mp3')
          recent = false;
          msg.delete([2000]);
        setTimeout(function(){
          msg.member.voiceChannel.leave();}, 5000);
        });
      } else if (umsg == "HI TAI!") {
        msg.channel.sendMessage("Hello "+msg.author.username + ". Have you seen my 47 lambourghinis??");
        recent = false;
        msg.delete([2000]);
        console.log("Hi was called");
      } else if (umsg == "$FULLTHING"){
        console.log("fullthing was called");
        msg.member.voiceChannel.join()
        .then(function(connection){
          connection.playFile('./fullthing.mp3')
          recent = false;
          msg.delete([2000]);
        setTimeout(function(){
          msg.member.voiceChannel.leave();}, 200000);
        });
      } else if (umsg == "$KNAWLEDGE") {
        console.log("knawledge was called");
        msg.member.voiceChannel.join()
        .then(function(connection){
          connection.playFile('./garaaaage.mp3')
          recent = false;
          msg.delete([2000]);
        setTimeout(function(){
          msg.member.voiceChannel.leave();}, 3000);
        });
      } else if (umsg == "TAI PLS GO"){
        msg.member.voiceChannel.leave();
        msg.delete([200]);
      }
    } else {
      console.log(msg.member.voiceChannel)
      if (!recent){
        msg.channel.sendMessage("I can't tell you about my self-help if you don't join a voice channel, "+ msg.author.username + "!");
        recent = true;
        console.log("user had no voice channel");
        return "no voice channel";
      }
    }
  // })
});



discordjs.login(config.info.email, config.info.password);
