var ordering = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
var suites = ['Heart','Spade','Club','Diamond']

var Card = function(suite,value){
  Object.defineProperties(this, {
    suite: { value: suite },
    value: { value: value }
  });

  this.sameSuite = function(other){
    return this.suite === other.suite;
  }

  this.compareTo = function(other){
    if(this.value === other.value) return 0;

    if(this.suite === 'Joker'){
      if(other.suite !== 'Joker') return 1;
      if(this.value === 'big') return 1;
      return -1;
    }

    if(other.suite === 'Joker') return -1;

    myIndex = ordering.indexOf(this.value);
    otherIndex = ordering.indexOf(other.value);

    if (myIndex > otherIndex) return 1;
    return -1;
  }
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

  ordering.forEach(function(value){
    suites.forEach(function(suite){
      arr.push(new Card(suite, value));
    });
  });

  arr.push(new Card('Joker','little'));
  arr.push(new Card('Joker','big'));

  return arr;
};

module.exports = {
  createCards: createCards,
  shuffleCards: shuffleCards,
  Card: Card
}
