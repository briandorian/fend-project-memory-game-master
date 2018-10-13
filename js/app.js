
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

//we retrieve an unordered list of items to afterwards create the deck
const shuffledCardTile = shuffle(cardTile);

/*html example to create every card using the already given css
<li class="card">
    <i class="fa fa-diamond"></i>
</li>
<li class="card">
    <i class="fa fa-paper-plane-o"></i>
</li>
<li class="card match">
    <i class="fa fa-anchor"></i>
</li>
*/

const cardContainer = document.querySelector('.deck');

for (const card of shuffledCardTile){
    /* we create the class container for one card*/
    let newListItem = document.createElement("li");
    newListItem.classList.add("card");
    /* we create and add the css class to the card item itself*/
    let newCard = document.createElement("i");
    newCard.classList.add("fa");
    newCard.classList.add(`${card}`);

    /*Introduce the item into the card li element*/
    newListItem.appendChild(newCard);
    /*Introduce this new whole html code under the deck class*/
    cardContainer.appendChild(newListItem);
}


/*
                NEXT
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)  DONE
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) DONE
 *  - if the list already has another card, check to see if the two cards match    DONE
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) DONE
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/* we collect all the cards shown*/
const cards = document.getElementsByClassName("card");

// Create two arrays, one to control the options and the other to be filled
// by the correct pairs.

let openedCards = new Array();
const matchedCards = new Array();


// Adding the addEventListener to all cards
for (const card of cards){
    card.addEventListener("click",cardClicked);
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
