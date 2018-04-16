/*
 * Create a list that holds all of your cards
 */
//const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart i");
let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bomb", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-bomb", "fa-leaf", "fa-bicycle"];
let card = document.querySelectorAll(".card i");
let cardContainer = document.querySelectorAll(".card");
//let listOfCardClass = [];
let listOfOpenedCards = [];
//let listOfMatchedCards = [];
let numberOfMatchedCards = 0;
let moves = document.querySelector(".moves");
let score = 0;
let starsList = document.querySelector(".stars");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Make the deck ready once the DOM is loaded
 document.addEventListener("DOMContentLoaded", innit);

// Start the game
 function innit() {
   cards = shuffle(cards);

   for (let i = 0; i < cardContainer.length; i++) {
       cardContainer[i].setAttribute("class", "card");
   }
   for (let i = 0; i < card.length; i++) {
       card[i].setAttribute("class", "fa " + cards[i]);
   }
    score = 0;
    numberOfMatchedCards = 0;
    starsList.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    return moves.innerHTML = score;
   }

//when restart button is clicked the game restart
restart.addEventListener("click", innit);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//create Event listener if cards is clicked
for ( let i = 0; i < cardContainer.length ; i++){
    cardContainer[i].addEventListener('click', trigger);
}

function trigger (evt) {
  let clikedCard = evt.target; // <- the clicked card
  let clikedCardClass = evt.target.children[0].classList[1]; // <- the class of clicked card symbol
  if (clikedCard.classList.contains("show")) {
    clikedCard.removeEventListener('click', trigger); // <- remove event listener if the card is already flipped
    console.log("this card is fliped already");
  } else { // run the code
    displayCard(clikedCard);//show clicked card
    addOpenCards(clikedCard);// add clicked card to list of open cards
    moveCounter();// add one move
  }

}


// Flip and show the card
function displayCard(clikedCard) {
  clikedCard.classList.toggle("open");
  clikedCard.classList.toggle("show");
}

// Add the card to a *list* of "open" cards
function addOpenCards(clikedCard) {
  if (listOfOpenedCards.length < 1 ) {
    listOfOpenedCards.push(clikedCard);
    return listOfOpenedCards;
  } else { // check if the card match
    let firstCardSymbol = listOfOpenedCards[0].children[0].classList[1];
    let secondCardSymbol = clikedCard.children[0].classList[1];
     if (firstCardSymbol == secondCardSymbol) { //when the cards matched
       lockMatchCards(clikedCard);
    } else { //when the cards DO NOT matched
      cardsNotMatching(clikedCard)
            }
    //console.log(listOfOpenedCards[0].children[0].classList[1]);
    //console.log(clikedCard.children[0].classList[1]);
  }
}

// Lock the cards in open position MATCH
function lockMatchCards(clikedCard) {
  listOfOpenedCards[0].classList.add("match");
  clikedCard.classList.add("match");
  listOfOpenedCards[0].classList.remove("open");
  clikedCard.classList.remove("open");
  console.log("it is a matched");
  listOfOpenedCards.length = 0;
  NumberOfMatchedCards(clikedCard);
}

// Remove cards from the list and hide cards
function cardsNotMatching(clikedCard) {
  setTimeout(displayCard, 500, listOfOpenedCards[0]); // give 1 sec for player to remember
  setTimeout(displayCard, 500, clikedCard);           //the cards before they flip back to normal
  listOfOpenedCards.length = 0;
  console.log("wrong");
}

// Counting the number of moves and display the Number of stars
function moveCounter() {
if (score < 10) { // for less than 10 moves, 3 Stars
  starsList.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
} else if (score < 20) { // for less than 20 moves, 2 Stars
  starsList.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>`;
} else if (score < 30) { // for less than 30 moves, 1 Stars
  starsList.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`;
} else { // for more than 30 moves, 0 Stars
  starsList.innerHTML = `<li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`;
}
  score++
  return moves.innerHTML = score;
}

// Check for the Number of Matched Cards
function NumberOfMatchedCards(clikedCard) {
  if (numberOfMatchedCards < 7) {
    numberOfMatchedCards++;
    console.log(numberOfMatchedCards);
  } else {
    setTimeout(winning, 500);
  }
}

function winning(){
  console.log("You Win");
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another
        function that you call from this one)
 *  - add the card to a *list* of "open" cards
      (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
      (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the
      card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in
      another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality
      in another function that you call from this one)
 */
