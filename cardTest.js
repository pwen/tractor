var assert = require('assert');
describe("card", function(){
  var card = require('./card');
  var Card = card.Card;
  
  describe("on create", function(){
    it("should return a list of 54 cards", function(){
      var result = card.createCards();
      assert(result.length === 54, result.length + " != 54");  
      assert(result[0] instanceof Card);
    });
    it("should create's suite and value", function(){
      var allCards = card.createCards();
      assert.equal(allCards[0].suite, "Heart");
      assert.equal(allCards[0].value, "2");
      
    });
    it("should not allow value or suite change", function(){
      var testCard = new Card("Heart", "2");
      
      testCard.suite = "Spade";
      testCard.value = "5";
      
      assert.equal(testCard.suite, "Heart");
      assert.equal(testCard.value, "2");
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

  describe("compareTo", function(){
    it('should compare a King after a Queen', function(){
      var king = new Card("Heart", "K");
      var queen = new Card("Heart", "Q");

      assert(king.compareTo(queen) == 1);
      assert(queen.compareTo(king) == -1);
      assert(queen.compareTo(queen) == 0);
    });

    it('should compare a King before an Ace', function(){
      var king = new Card("Heart", "K");
      var ace = new Card("Heart", "A");

      assert(king.compareTo(ace) == -1);
      assert(ace.compareTo(king) == 1);
      assert(ace.compareTo(ace) == 0);
    });
    
    it('should compare a 3 before a 5', function(){
      var smaller = new Card("Heart", "3");
      var bigger= new Card("Heart", "5");
      assert(smaller.compareTo(bigger) == -1);
      assert(bigger.compareTo(smaller) == 1);
      assert(smaller.compareTo(smaller) == 0);
      assert(bigger.compareTo(bigger) == 0);
    });
    it('should compare a little Joker before a big Joker', function(){
      var smaller = new Card("Joker", 'little');
      var bigger = new Card("Joker", 'big');
      assert(smaller.compareTo(bigger) == -1);
      assert(bigger.compareTo(smaller) == 1);
      assert(bigger.compareTo(bigger) == 0);
    });
    it('should compare a little Joker before an Ace', function(){
      var smaller = new Card("Heart", 'A');
      var bigger = new Card("Joker", 'big');
      assert(smaller.compareTo(bigger) == -1);
      assert(bigger.compareTo(smaller) == 1);
      assert(bigger.compareTo(bigger) == 0);
    });
  });

  describe('sameSuite', function(){
    it('should return true if the suite matches', function(){
      var heart = new Card("Heart", "2");
      var heart2 = new Card("Heart", "3");
      assert(heart.sameSuite(heart2));
    });
    it("should return false if the suite doesn't match", function(){
      var heart = new Card("Heart", "2");
      var spade = new Card("Spade", "3");
      assert.equal(heart.sameSuite(spade), false);
    });
  });

});
