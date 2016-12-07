var config = require('../config.json');
var gcheck = '';
var glog = require('./glogic.js');
var ylog = require('./ytlogic.js');

//the keys to match the parsed message against
var keys = {
  knowledge: `${config.info.prefix}KNOWLEDGE`, knawledge: `${config.info.prefix}KNAWLEDGE`, fullthing: `${config.info.prefix}FULLTHING`, drears: `${config.prefix}DREARS`,
  giphy: `${config.info.prefix}GIPHY`,
  yt: `${config.info.prefix}YT`,
  queue: `${config.info.prefix}QUEUE`,
};

var key = Object.keys(keys);

//Calls the specific method for the bot based on
//output of returnMethod
function toCall(method, msg, clie){
  //if the key is knowledge, call knowledge
  if (method == `${config.info.prefix}KNOWLEDGE`){
    knowledge(msg);
    //else if the key is knawledge call knawledge
  } else if (method == `${config.info.prefix}KNAWLEDGE`){
    knawledge(msg);
    //else if the key is hi call hi
  } else if (method == `${config.info.prefix}FULLTHING`){
    full(msg);
    //else if the key is drears call drears (currently damaged mp3
    //file)
  // } else if (method == '$DREARS'){
  //   drears(msg);
    //else if the key is go call go
  } else if (method == `${config.info.prefix}GIPHY`){
    giphy(gcheck, msg);
  } else if (method == `${config.info.prefix}YT`){
    youtube(gcheck, msg, clie);
  } else if (method == `${config.info.prefix}QUEUE`){
    ytq(msg)
  } else {
    console.log("bad msg tried ", method)
    console.log('Bad message');
  }
}

//$knowledge
//On call, the bot plays himg.mp3, deletes the
//called command message and then leaves upon
//completion
function knowledge(msg){
  //Joins the message author's voice channel
  msg.member.voiceChannel.join()
  .then(function(connection){
    //plays the specific file
    connection.playFile('./sounds/himg.mp3')
    //removes the called message (requires bot to be
    //admin) 2s delay
    msg.delete([2000]);
    //leaves after 5 seconds
  setTimeout(function(){
    msg.member.voiceChannel.leave();}, 5000);
  });
}

//$fullthing
//On call, bot players fullthing.mp3, deletes the
//called command message and then leaves upon
//completion
function full(msg){
  //join message authors voice channel
  msg.member.voiceChannel.join()
  .then(function(connection){
    //play the specific file
    connection.playFile('./sounds/fullthing.mp3')
    //delete the called command message (requires
    //bot to be admin) 2s delay
    msg.delete([2000]);
    //leaves after 200 seconds
  setTimeout(function(){
    msg.member.voiceChannel.leave();}, 200000);
  });
}

//$knawledge
//On call, bot plays garaaaage.mp3, deletes the called
//command message and then leaves upon completion
function knawledge(msg){
  //joins the message author's voice channel
  msg.member.voiceChannel.join()
  .then(function(connection){
    //plays the requested file
    connection.playFile('./sounds/garaaaage.mp3')
    //deletes the called command (requires bot to be
    //admin) 2s delay
    msg.delete([2000]);
    //leaves after 3 seconds
  setTimeout(function(){
    msg.member.voiceChannel.leave();}, 3000);
  });
}

//On call, bot plays drears.mp3, deletes the called
//command message and then leaves upon completion
function drears(msg){
  //Joins the message author's voice channel
  msg.member.voiceChannel.join()
  .then(function(connection){
    //plays the specific file
    connection.playFile('./sounds/drears.mp3')
    //deletes the command message (requires bot to
    //be admin) 2s delay
    msg.delete([2000]);
    //leaves after 3 seconds
  setTimeout(function(){
    msg.member.voiceChannel.leave();}, 3000);
  });
}

//On call, bot lets user know they must be in a voice
//channel to call commands
function noGo(msg){
  msg.channel.sendMessage("I can't tell you about my self-help if you don't join a voice channel, "+ msg.author.username + "!");
}

function giphy(passed, msg){
  Promise.resolve(glog.msgFix(passed))
  .then(function(res){
    return new Promise(function(resolve, reject){
      var asyn = glog.img(res, msg);
      resolve(asyn);
    })
  })
}

function youtube(passed, msg, clie){
  ylog.base(passed, msg, clie)
}

function ytq(msg){
  ylog.queue(msg);
}

//Returns the method key in a string that matches
//the command passed in by toCall
function returnMethod(n){
  n = n.split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
  console.log(n);
  var x = n[0];
  gcheck = n[1];
  //setup var to check prefix
  var y = x.split('')[0]
  //make all messages uniform
  x = x.toLowerCase()
  //cut them into an array and reverse them
  x = x.split('').reverse();
  //Pull off the last value, the prefix
  x.pop();
  //Unreverse the array
  x.reverse();
  //Rejoin the array into a string
  x = x.join('');
  //checks in keys if a message matches a key value
  for (var i = 0; i <= 9; i++) {
    if (x == key[i]){
      //Checks if the prefix fits that put into config.json
      if (y != config.info.prefix){
        return "Bad Prefix"
      } else {
        console.log(keys[x], 'line 144 msgcheck');
        return keys[x];
      }
    }
  } return "No Command Found";
}


module.exports = {
  returnMethod: returnMethod,
  noGo: noGo,
  toCall: toCall,
}
