var http = require('http');

var getBasicCredentials = function(authentication){
  if(!authentication) {return null;}

  var userpass = authentication.replace(/Basic (.*)$/, '$1');
  var decoded = new Buffer(userpass, 'base64').toString();
  var parts = decoded.split(/:/);
  var username = parts[0];
  var password = parts[1];
  return {
    username: username,
    password: password
  };
};

var validCredentials = {
  username: "mrak",
  password: "mrak"
};

var validateCredentials = function(credentials) {
  return JSON.stringify(credentials) === JSON.stringify(validCredentials);  
};

var unclaimedPlayers = ["mrak","player2","player3","player4"];

var playerFunction = function(request, response) {
  var auth = getBasicCredentials(request.headers['authorization']);

  if (!auth) {
    response.writeHead(401, "NO CREDENTIALS", {'Content-Type':'application/json'});
    response.write(JSON.stringify({
      error: "You have not provided credentials. ",
      unclaimedPlayers: unclaimedPlayers
    })); 
  }
  else if (!validateCredentials(auth)) {
    response.writeHead(401, "INVALID CREDENTIALS", {'Content-Type':'application/json'});
    response.write(JSON.stringify({
      error: "You have provided invalid credentials. ",
      unclaimedPlayers: unclaimedPlayers
    })); 
  }

  response.end();
};

http.createServer(playerFunction).listen(8088);

module.exports = {
  getBasicCredentials: getBasicCredentials,
  playerFunction: playerFunction,
  validateCredentials: validateCredentials
};
