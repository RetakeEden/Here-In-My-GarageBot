//Parses messages to a uniform readable state for the
//rest of the logic to perform upon
function parseCheck(msg){
  return msg.toString().toUpperCase()
}

function jsonParse(str){
  return JSON.parse(str);
}

//Gets whether a user is in a voiceChannel
function chanCheck(mem){
  if (mem != null){
    return true
  } else {
    return false
  }
}

function convertTime(duration) {
    var a = duration.match(/\d+/g);

    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
        a = [0, a[0], 0];
    }

    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
        a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
        a = [a[0], 0, 0];
    }

    duration = 0;

    if (a.length == 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
    }

    if (a.length == 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
    }

    if (a.length == 1) {
        duration = duration + parseInt(a[0]);
    }
    return duration
}


module.exports = {
  parseCheck: parseCheck,
  chanCheck: chanCheck,
  jsonParse: jsonParse,
  convertTime: convertTime
}
