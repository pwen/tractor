var card = require('./card');
var http = require('http');

var playerFunction = function(request, response) {
  response.write("Hello World!"); 
  response.end();
};
var playerOne = http.createServer(playerFunction);
var playerTwo = http.createServer(playerFunction);
var playerThree = http.createServer(playerFunction);
var playerFour = http.createServer(playerFunction);

playerOne.listen(8080);
playerTwo.listen(8081);
playerThree.listen(8082);
playerFour.listen(8083);
