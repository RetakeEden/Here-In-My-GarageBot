var Discord = require('discord.js');
var config = require('./config.json')
var parseLogic = require('./logic/parse.js')
var messageLogic = require('./logic/messagecheck.js')

//substantiates the bot client
var discordjs = new Discord.Client();

//Connection
discordjs.on("ready", function() {
  console.log('Currently running.');
});

//called on every message
discordjs.on('message', function(msg){
  //Stores parsed message to be passed to other
  //methods
  var umsg = parseLogic.parseCheck(msg)
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
    var call = messageLogic.returnMethod(umsg)
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
    if (toCall){
      //let the user know they must be in a channel
      messageLogic.noGo(msg);
    }
  }
});


//Login info for the bot, stored in config.json
discordjs.login(config.info.email, config.info.password);
