
/* We create an array containing all the available cards twice so we can later
fill the grid with the cards two times */
const cardTile = ['fa-diamond','fa-diamond','fa-paper-plane-o',
'fa-paper-plane-o','fa-anchor','fa-anchor','fa-bolt','fa-bolt',
'fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle',
'fa-bomb','fa-bomb'];

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

let counter;
let openedCards = new Array() ;
let matchedCards = new Array();
let counterLiteral = document.getElementsByClassName("moves");


window.onload = startGame;

function startGame(){
  /* Init of the variables*/
  counter=0;
  counterLiteral[0].innerHTML = counter;
  openedCards = [];
  matchedCards = [];

  // Shuffle of the cards
  const shuffledCardTile = shuffle(cardTile);
  const cardContainer = document.querySelector(".deck");

  // delete the ul part to create it again.
  let cardsContainerUL = document.getElementsByClassName("cards-container");
  if (cardsContainerUL.length > 0)
  {
      cardContainer.removeChild(cardsContainerUL[0]);
  }

  let list = document.createElement("ul");
  list.classList.add("cards-container");
  let newListItem;
  let newCard;

  for (const card of shuffledCardTile) {
    /* we create the class container for one card*/
    newListItem = document.createElement("li");
  //  newListItem.classList.add("card");
    newListItem.classList.add("card");
    /* we create and add the css class to the card item itself*/
    newCard = document.createElement("i");
    newCard.classList.add("fa");
    newCard.classList.add(`${card}`);

    /*Introduce the item into the card li element*/
    newListItem.appendChild(newCard);
    list.appendChild(newListItem);
  }
  /*Introduce this new whole html code under the deck class*/
  cardContainer.appendChild(list);

  const restart = document.getElementsByClassName("fa-repeat");
  restart[0].addEventListener("click",restartGame);

  /* we collect all the cards shown*/
  const cards = document.getElementsByClassName("card");

  // Create two arrays, one to control the options and the other to be filled
  // by the correct pairs.


  // Adding the addEventListener to all cards
  for (const card of cards){
      card.addEventListener("click",cardClicked);
  }



}

function cardClicked (){
  const elementClicked = event.target;

  handleShowingCard(elementClicked);

  //Introduce the card selected into the stack to be analyzed
  openedCards.push(elementClicked);

 if (openedCards.length === 2){
    // When we have 2 cards we can compare it's childrens where the class is different.
    if (openedCards[0].childNodes[0].className == openedCards[1].childNodes[0].className){
          // matching pair
          itsAMatch(elementClicked);
          updateCounter();

      }else{
        // non-matching pairs
          notAMatch(elementClicked);
      }
  }
}

/* Function to determine if a cards needs to be shown as new or pair*/
function handleShowingCard(elementClicked){

     elementClicked.classList.toggle("open");
     elementClicked.classList.toggle("show");
     elementClicked.classList.toggle("disabled");
}

/*Function to handle the matching pairs*/

function itsAMatch(match){

  openedCards[0].className = "card match";
  openedCards[1].className = "card match";
  //Fill the matched cards array to determine when the game will end
  matchedCards.push(openedCards[0]);
  matchedCards.push(openedCards[1]);

  openedCards[0].removeEventListener("click",cardClicked);
  openedCards[1].removeEventListener("click",cardClicked);
  // Reset the array to 0, so we can keep comparing pair by pair
  openedCards=[];

}

/* Function to handle when a pair isn't a match*/
function notAMatch(notMatch){
  /* Timeout function so we can show a bit of time the card before we fold it*/
  setTimeout(function () {

    openedCards[0].className = "card";
    openedCards[1].className = "card";
    openedCards = [];
  }, 500);

}

function updateCounter(){
  counter = counter + 1;
  counterLiteral[0].innerHTML = counter;
}

function restartGame(){
  let cards = document.getElementsByClassName("card");
  let restartButton = document.getElementsByClassName("fa-repeat");
  for (card of cards){
    card.classList.remove="show";
  }
  restartButton[0].removeEventListener("click",restartGame);

  startGame();
}
