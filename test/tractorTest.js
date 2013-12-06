var assert = require('assert');
var sinon = require('sinon');

describe("tractor game", function() {
  
  beforeEach(function(){
    this.game = require('../src/tractor');
  });
  
  describe("authorization", function(){

    it("should return null with empty string", function(){
      var actual = this.game.getBasicCredentials("");
      assert.equal(actual, null);
    });

    it("should return decoded username and password with valid header string", function(){
      var actual = this.game.getBasicCredentials('Basic ' + new Buffer('username:password').toString('base64'));
      assert.equal(actual.username, 'username');
      assert.equal(actual.password, 'password');
    });
  });

  describe('validateCredentials', function(){

    it ("should return false when credentials are invalid", function(){
      var credentials = {
        username: "",
        password: ""
      };
      assert(this.game.validateCredentials(credentials) === false);
    });

    it ("should return true when credentials are valid", function(){
      var credentials = {
        username: 'mrak',
        password: 'mrak'
      };
      assert(this.game.validateCredentials(credentials));
    });
  });  
 
  describe('playerFunction', function(){

    var response = {
      write: sinon.spy(),
      writeHead: sinon.spy(),
      end: function(){}
    };

    describe('when no authorization is provided', function(){

      var request = {
        headers: {}
      };

      it("should return correct error message and a list of available players", function(){
        var expected = {
          error: "You have not provided credentials. ",
          unclaimedPlayers: ["mrak","player2","player3","player4"]
        };
        this.game.playerFunction(request, response);
        assert.equal(response.write.args[0][0], JSON.stringify(expected));
        assert.deepEqual(response.writeHead.args[0], [401, 'NO CREDENTIALS', {'Content-Type':'application/json'}]);
      });
    });

    describe('when invalid authorization is provided', function(){

      var request = {
        headers: {
          authorization: 'Basic ' + new Buffer('invalid:invalid').toString('base64') 
        }
      };

      it("should return correct error message and a list of available players", function(){
        var expected = {
          error: "You have provided invalid credentials. ",
          unclaimedPlayers: ["mrak","player2","player3","player4"]
        };
        this.game.playerFunction(request, response);
        assert.equal(response.write.args[1][0], JSON.stringify(expected));
        assert.deepEqual(response.writeHead.args[1], [401, 'INVALID CREDENTIALS', {'Content-Type':'application/json'}]);
      });
    });  

  });
});
