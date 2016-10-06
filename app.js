var Discord = require('discord.js');
var config = require('./config.json')

var discordjs = new Discord.Client();


discordjs.on("ready", function() {
  console.log('Currently on. Connected.');
});


discordjs.on('message', function(msg){
  if(msg.member.voiceChannel){
    if (msg == "$knowledge") {
      console.log("knowledge was called")
      msg.member.voiceChannel.join()
      .then(function(connection){
        connection.playFile('./himg.mp3')
      setTimeout(function(){
        msg.member.voiceChannel.leave();}, 5000);
      });
    } else if (msg == "Hi Tai!") {
      msg.channel.sendMessage("Hello "+msg.author.username + ". Have you seen my 47 lambourghinis??");
      console.log("Hi was called");
    } else if (msg == "$FULLTHING"){
      console.log("fullthing was called");
      msg.member.voiceChannel.join()
      .then(function(connection){
        connection.playFile('./fullthing.mp3')
      setTimeout(function(){
        msg.member.voiceChannel.leave();}, 200000);
      });
    } else if (msg == "$PYLONS"){
      msg.member.voiceChannel.join()
      .then(function(connection){
        connection.playFile('./fullthing.mp3')
      setTimeout(function(){
        msg.member.voiceChannel.leave();}, 5000);
      });
    } else if (msg == "$KNAWLEDGE") {
      console.log("knawledge was called");
      msg.member.voiceChannel.join()
      .then(function(connection){
        connection.playFile('./garaaaage.mp3')
      setTimeout(function(){
        msg.member.voiceChannel.leave();}, 3000);
      });
    } else if (msg =="$DREARS") {
      msg.member.voiceChannel.join()
      .then(function(connection){
        connection.playFile('./drears.mp3')
      setTimeout(function(){
        msg.member.voiceChannel.leave();}, 3000);
      });
    }
  } else {
    msg.channel.sendMessage("I can't tell you about my self-help if you don't join a voice channel, "+ msg.author.username + "!")
    console.log("user had no voice channel");
    return "no voice channel";
  }
});



discordjs.login(config.info.email, config.info.password);
