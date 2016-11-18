var Discord = require('discord.js');
var config = require('./config.json');
var parseLogic = require('./logic/parse.js');
var messageLogic = require('./logic/messagecheck.js');

//substantiates the bot client
var discordjs = new Discord.Client();

//Connection
discordjs.on("ready", function() {
  console.log('Currently running.');
});

//called on every message
discordjs.on('message', function(msg){
  if (msg.author.username == "Tai Lopez"){
    return;
  } else {
    //Stores parsed message to be passed to other
    //methods
    var umsg = parseLogic.parseCheck(msg)
    //Explains all the available commands and their usage.
    if (umsg == "TAI HELP"){
      msg.channel.sendMessage("Welcome! Most commands must be prefixed with the correct symbol! The current prefix is: "+config.info.prefix + " All commands are case insensitive.");
      msg.channel.sendMessage("My available commands are:");
      msg.channel.sendMessage(config.info.prefix + "knowledge : Plays the original sound bite of the original video!");
      msg.channel.sendMessage(config.info.prefix + "knawledge : Plays the beginning sound bite of the video I'm based on!");
      msg.channel.sendMessage(config.info.prefix + "fullthing : Plays the whole video I'm based on!");
      msg.channel.sendMessage(config.info.prefix + "drears  (Currently Broken! :c )");
      msg.channel.sendMessage("There are two commands that do not require a prefix. They are as follows: ")
      msg.channel.sendMessage("Hi Tai! : Just to say hi. I love it!");
      msg.channel.sendMessage("Tai Pls Go : I leave your channel! For when I'm getting annoying.");
      msg.channel.sendMessage("I will clean up any commands that are properly executed to keep your channel clean, but if you mistype it, I won't know what you mean and it'll stay there forever! (Or until you or an admin delete it)");
    }
    //Stores the return of chanCheck, which checks if
    //a user is in a voicechannel
    if (msg.member.voiceChannel){
      var chan = parseLogic.chanCheck(msg.member.voiceChannel);
    }
    //if the user is in a voicechannel
    if(chan){
      //Passes the parsed message and returns the key of
      //a method that can be called with the passed in
      //parsed message
      var call = messageLogic.returnMethod(umsg);
      //Takes the returned method key, and passes it
      //with the message json object to the logic
      //function that then calls individual methods
      messageLogic.toCall(call, msg);
      //else if they're not in a channel
    } else {
      //Passes the parsed message and returns the key of
      //a method that can be called with the passed in
      //parsed message
      var toCall = messageLogic.returnMethod(umsg)
      //if a key is returned through toCall
      if (toCall != null || toCall != "Bad Prefix"){
        //let the user know they must be in a channel
        messageLogic.noGo(msg);
      } else if (toCall == "Bad Prefix"){
        msg.channel.sendMessage(msg.author.username + ", you need to use the proper prefix! Currently set to " + config.info.prefix + ".");
      }
    }
  }
});


//Login info for the bot, stored in config.json
discordjs.login(config.info.email, config.info.password);
