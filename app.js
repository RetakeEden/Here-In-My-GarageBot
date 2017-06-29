var Discord = require('discord.js');
var config = require('./config.json');
var parseLogic = require('./logic/parse.js');
var messageLogic = require('./logic/messagecheck.js');
var ylog = require('./logic/ytlogic.js');
// var gplog = require('./logic/gpmlogic.js');
var dms = false;
var dmj = false;

//substantiates the bot client
var discordjs = new Discord.Client();

//Connection
discordjs.on("ready", () => {
  console.log('Startup complete. Awaiting commands.');
});

//called on every message
discordjs.on('message', msg => {
  if (msg.author.username == "nik4375"){
    msg.react(💩);
    return "reacted to nicki";
  }
  if (msg.author.username == "Tai Lopez"){
    return;
  }
  if (dms == true) {
    if (msg.author.username != "Splitbreed"){
      msg.channel.sendMessage("Command Ignored, DMS Tripped");
      return;
    }
  }
  if (dmj == true) {
    if (msg.author.username == "Jay"){
      msg.channel.sendMessage("No, bad Jay.");
      return;
    }
  }
  //Stores parsed message to be passed to other
  //methods
  var umsg = parseLogic.parseCheck(msg)
  //Explains all the available commands and their usage.
  if (umsg == "TAI HELP"){
    msg.channel.sendMessage("Welcome! Most commands must be prefixed with the correct symbol! The current prefix is: \""+config.info.prefix + "\" All commands are case insensitive.");
    msg.channel.sendMessage("My available commands are:");
    msg.channel.sendMessage(config.info.prefix + "knowledge - Plays the original sound bite of the original video!");
    msg.channel.sendMessage(config.info.prefix + "knawledge - Plays the beginning sound bite of the video I'm based on!");
    msg.channel.sendMessage(config.info.prefix + "fullthing - Plays the whole video I'm based on!");
    msg.channel.sendMessage(config.info.prefix + "giphy \"Search Terms Here\" - Uses the Giphy API to run a translate on the search terms provided and respond with a gif to fit it!");
    msg.channel.sendMessage(config.info.prefix + "yt \"Search Terms Here\" - Searches youtube for a video with the specfied terms. If you're in a voice channel, I'll play it for you!");
    msg.channel.sendMessage(config.info.prefix + "yskip - Skips to the next video in the queue. If no videos are in queue, leaves the channel.");
    // msg.channel.sendMessage(config.info.prefix + "drears  (Currently Broken! :c )");
    msg.channel.sendMessage("There are two commands that do not require a prefix. They are as follows: ")
    msg.channel.sendMessage("Tai Pls Go - I leave your channel! For when I'm getting annoying.");
    msg.channel.sendMessage("I will clean up any commands that are properly executed (barring a few that make sense to keep) to make sure your channel is spam free, but if you mistype it, I won't know what you mean and it'll stay there forever! (Or until you or an admin delete it)");
  } else if (umsg == "HI TAI" || umsg == "HI TAI!") {
    //replies to the message author personally
    msg.channel.sendMessage("Hello " + msg.author.username + ". Have you seen my 47 lambourghinis??");
  } else if (umsg == "TAI PLS GO"){
    //bot leaves the current voice channel
    ylog.clearq(msg);
    // gplog.clearq(msg);
    //if no voice channel, does nothing
    msg.member.voiceChannel.leave();
    //delets the command message (requires bot to be
    //admin) 2s delay
    msg.delete([2000]);
  } else if (umsg == `${config.info.prefix}DMS`) {
    dms = !dms;
  } else if (umsg == `${config.info.prefix}DMJ`) {
    dmj = !dmj;
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
    //If the prefix doesn't match, tells the author the current
    //prefix
    if (call == "Bad Prefix"){
      msg.channel.sendMessage(msg.author.username + ", you need to use the proper prefix! Currently set to " + config.info.prefix + ".");
      //else if the prefix is good
    } else {
      //Takes the returned method key, and passes it
      //with the message json object to the logic
      //function that then calls individual methods
      messageLogic.toCall(call, msg, discordjs);
    }
    //else if they're not in a channel
  } else {
    //Passes the parsed message and returns the key of
    //a method that can be called with the passed in
    //parsed message
    var toCall = messageLogic.returnMethod(umsg)
    //if a key is returned through toCall
    if (toCall != "No Command Found" && toCall != "Bad Prefix"){
      //if the command is the giphy command
      if (toCall == `${config.info.prefix}GIPHY`){
        //call the giphy command in logic
        messageLogic.toCall(toCall, msg, discordjs);
      } else if (toCall == `${config.info.prefix}YT`){
        messageLogic.toCall(toCall, msg, discordjs);
      } else {
        //let the user know they must be in a channel
        messageLogic.noGo(msg);
      }
      //if the prefix is bad
    } else if (toCall == "Bad Prefix"){
      //let the user know the current prefix
      msg.channel.sendMessage(msg.author.username + ", you need to use the proper prefix! Currently set to " + config.info.prefix + ".");
    } else {
      //otherwise don't do anything at all
      return 'nothing';
    }
  }
});

//Login info for the bot, stored in config.json
discordjs.login(config.info.authtok);
