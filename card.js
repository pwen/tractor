var Card = function(suite,value){
  this.suite = suite;
  this.value = value;
}

var shuffleCards = function(unshuffledCards) {
  var shuffledCards = [];
  unshuffledCards.forEach(function(card){
    var index = Math.floor(Math.random() * (shuffledCards.length + 1));                    
    shuffledCards.splice(index, 0, card);
  });
  return shuffledCards;
};

var createCards = function(){
  var arr = [];

  ['2','3','4','5','6','7','8','9','10','J','Q','K','A'].forEach(function(value){
    ['heart','spade','club','diamond'].forEach(function(suite){
      arr.push(new Card(value, suite));
    });
  });

  arr.push(new Card( 'Joker','little'));
  arr.push(new Card( 'Joker','big'));

  return arr;
};

module.exports = {
  createCards: createCards,
  shuffleCards: shuffleCards,
  Card: Card
}
