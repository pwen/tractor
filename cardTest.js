var assert = require('assert');
describe("card", function(){
  var card = require('./card');
  var Card = card.Card
  
  describe("on create cards", function(){
 
  
    it("should return a list of 54 cards", function(){
      var result = card.createCards();
      assert(result.length === 54, result.length + " != 54");  
      assert(result[0] instanceof Card);
    });

    
  });

  
  describe("on shuffle", function(){
  
    it("should shuffle cards", function(){
      var unshuffledCards = card.createCards();
      var shuffledCards = card.shuffleCards(unshuffledCards);
      assert(shuffledCards.length === 54, shuffledCards.length + " != 54");  
      assert.notEqual(unshuffledCards[0], shuffledCards[0]);
    });
  });

});
