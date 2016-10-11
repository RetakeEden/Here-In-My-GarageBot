var Discord = require('discord.js');
var config = require('./config.json')

var discordjs = new Discord.Client();

var recent = true;

discordjs.on("ready", function() {
  console.log('Currently on. Connected.');
});


discordjs.on('message', function(msg){
  discordjs.getMessage(msg.channel, msg.id)
  .then(function(grabbed){
    var smsg = msg.toString()
    var umsg = smsg.toUpperCase();
    if(msg.member.voiceChannel){
      if (umsg == "$KNOWLEDGE") {
        console.log("knowledge was called")
        msg.member.voiceChannel.join()
        .then(function(connection){
          connection.playFile('./himg.mp3')
          recent = true;
          discordjs.deleteMessage(grabbed, 200, function(){
            console.log('message deleted');
          });
        setTimeout(function(){
          msg.member.voiceChannel.leave();}, 5000);
        });
      } else if (umsg == "HI TAI!") {
        msg.channel.sendMessage("Hello "+msg.author.username + ". Have you seen my 47 lambourghinis??");
        recent = false;
        discordjs.deleteMessage(grabbed, 3000, function(){
          console.log('message deleted');
        });
        console.log("Hi was called");
      } else if (umsg == "$FULLTHING"){
        console.log("fullthing was called");
        msg.member.voiceChannel.join()
        .then(function(connection){
          connection.playFile('./fullthing.mp3')
          recent = false;
          discordjs.deleteMessage(grabbed, 200, function(){
            console.log('message deleted');
          });
        setTimeout(function(){
          msg.member.voiceChannel.leave();}, 200000);
        });
      } else if (umsg == "$KNAWLEDGE") {
        console.log("knawledge was called");
        msg.member.voiceChannel.join()
        .then(function(connection){
          connection.playFile('./garaaaage.mp3')
          recent = false;
          discordjs.deleteMessage(grabbed, 200, function(){
            console.log('message deleted');
          });
        setTimeout(function(){
          msg.member.voiceChannel.leave();}, 3000);
        });
      } else if (umsg == "TAI PLS GO"){
        msg.member.voiceChannel.leave();
        discordjs.deleteMessage(grabbed, 200, function(){
          console.log('message deleted');
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
  })
});



discordjs.login(config.info.email, config.info.password);
