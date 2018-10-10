
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

const cardContainer = document.querySelector(".deck");
let list = document.createElement("ul");
let newListItem;
let newCard;

for (const card of shuffledCardTile) {
  /* we create the class container for one card*/
  newListItem = document.createElement("li");
  newListItem.classList.add("card");
  /* we create and add the css class to the card item itself*/
  newCard = document.createElement("i");
  newCard.classList.add("fa");
  newCard.classList.add("`${card}`");

  /*Introduce the item into the card li element*/
  newListItem.appendChild(newCard);
  list.appendChild(newListItem);
}
/*Introduce this new whole html code under the deck class*/
cardContainer.appendChild(list);
/*
                NEXT
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
