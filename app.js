var Discord = require('discord.js');
var config = require('./config.json')

var discordjs = new Discord.Client();


discordjs.on("ready", function() {
  console.log('Currently on. Connected to ' + discordjs.channels);
});


discordjs.on('message', function(msg){
  if (msg == "$KNAWLEDGE") {
    msg.member.voiceChannel.join()
    .then(function(connection){
      connection.playFile('./himg.mp3')
    setTimeout(function(){
      msg.member.voiceChannel.leave();}, 5000);
    });
  } else if (msg == "Hi Tai!") {
    msg.channel.sendMessage("Hello "+msg.author.username + ". Have you seen my 47 lambourghinis??");
  } else if (msg == "$FULLTHING"){
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
  }
});



discordjs.login(config.info.email, config.info.password);
