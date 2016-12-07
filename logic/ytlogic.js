var config = require('../config.json'),
    ytdl = require('ytdl-core'),
    request = require('request');

function base(passed){
  var final;
  console.log(passed, "passed one");
  if (passed[0] == "\'"){
    return;
  } else {
    passed = passed.toLowerCase();
    final = passed.replace(/\"/g, "").split(' ').join(',');
  }
  console.log(final, "final one")
  request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${final}&key=${config.info.apiKEY}`, function(err, res, body){
    console.log(res)
    console.log("=========================")
    console.log(JSON.stringify(res));
  })
}


module.exports = {
  base: base,
}
