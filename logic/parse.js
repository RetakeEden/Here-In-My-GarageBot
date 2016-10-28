//Parses messages to a uniform readable state for the
//rest of the logic to perform upon
function parseCheck(msg){
  return msg.toString().toUpperCase()
}

//Gets whether a user is in a voiceChannel
function chanCheck(mem){
  if (mem != null){
    return true
  } else {
    return false
  }
}

module.exports = {
  parseCheck: parseCheck,
  chanCheck: chanCheck
}
