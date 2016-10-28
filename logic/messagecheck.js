//the keys to match the parsed message against
var keys = {knowledge: '$KNOWLEDGE', knawledge: '$KNAWLEDGE', hi: 'HI TAI!', full: '$FULLTHING', drears: '$DREARS', go: 'TAI PLS GO'}

var key = Object.keys(keys);

//Calls the specific method for the bot based on
//output of returnMethod
function toCall(method, msg){
  //if the key is knowledge, call knowledge
  if (method == 'knowledge'){
    knowledge(msg);
    //else if the key is knawledge call knawledge
  } else if (method == 'knawledge'){
    knawledge(msg);
    //else if the key is hi call hi
  } else if (method == 'hi'){
    hi(msg);
    //else if the key is full call full
  } else if (method == 'full'){
    full(msg);
    //else if the key is drears call drears
  } else if (method == 'drears'){
    drears(msg);
    //else if the key is go call go
  } else if (method == 'go'){
    go(msg);
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
    connection.playFile('../sounds/himg.mp3')
    //removes the called message (requires bot to be
    //admin) 2s delay
    msg.delete([2000]);
    //leaves after 5 seconds
  setTimeout(function(){
    msg.member.voiceChannel.leave();}, 5000);
  });
}

//hi tai!
//On call, the bot says hi to the user
function hi(msg){
  //replies to the message author personally
  msg.channel.sendMessage("Hello "+msg.author.username + ". Have you seen my 47 lambourghinis??");
  //removes the called message (requires bot to be
  //admin) 2s delay
  msg.delete([2000]);
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
    connection.playFile('../sounds/fullthing.mp3')
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
    connection.playFile('../sounds/garaaaage.mp3')
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
    connection.playFile('../sounds/drears.mp3')
    //deletes the command message (requires bot to
    //be admin) 2s delay
    msg.delete([2000]);
    //leaves after 3 seconds
  setTimeout(function(){
    msg.member.voiceChannel.leave();}, 3000);
  });
}

//tai pls go
//On call, bot leaves current voice channel
function go(msg){
  //bot leaves the current voice channel
  //if no voice channel, does nothing
  msg.member.voiceChannel.leave();
  //delets the command message (requires bot to be
  //admin) 2s delay
  msg.delete([2000]);
}

//On call, bot lets user know they must be in a voice
//channel to call commands
function noGo(msg){
  msg.channel.sendMessage("I can't tell you about my self-help if you don't join a voice channel, "+ msg.author.username + "!");
}

//Returns the method key in a string that matches
//the command passed in by toCall
function returnMethod(x){
  console.log(x)
  //checks in keys if a message matches a key value
  for (i in keys) {
    console.log(i)
    if (x == keys[i]){
      console.log(key[i])
      return key[i];
    }
  }
}


module.exports = {
  returnMethod: returnMethod,
  go: go,
  noGo: noGo,
  knowledge: knowledge,
  knawledge: knawledge,
  drears: drears,
  full: full,
  hi: hi,
  toCall: toCall
}