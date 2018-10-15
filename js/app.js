
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
let startingTime;
let howManyStars;
var second,minute,interval;
var timer = document.querySelector(".timer");

// Function to force the startGame function to execute with each refresh of the page and access.
window.onload = startGame;

function startGame(){
  /* Init of the variables*/
  counter=0;
  counterLiteral[0].innerHTML = counter;
  openedCards = [];
  matchedCards = [];
  startingTime = Date.now();

  second=0;
  minute=0;
  startTimer();

  // Shuffle of the cards
  const shuffledCardTile = shuffle(cardTile);
  const cardContainer = document.querySelector(".deck");

  // Verify if the stars are full (3) or not
  let cardsContainerUL = document.getElementsByClassName("cards-container");

  if (cardsContainerUL.length > 0)
  {
      cardContainer.removeChild(cardsContainerUL[0]);
      document.getElementsByClassName("star1")[0].classList.remove("hide");
      document.getElementsByClassName("star2")[0].classList.remove("hide");
      document.getElementsByClassName("star3")[0].classList.remove("hide");
  }

  let list = document.createElement("ul");
  list.classList.add("cards-container");
  let newListItem;
  let newCard;

/* Function to shuffle and position the html cards deck */
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

  // We create the modal view but not show yet, until  is needed
  const modal = document.getElementById('demo-modal');
  const repeatGame = document.getElementById('play-again');

  // In case the event listener is already there (restar vs new game)
  repeatGame.removeEventListener("click",restartGame);
  repeatGame.removeEventListener("click", function(){ modal.close();});

  repeatGame.addEventListener("click",restartGame);
  repeatGame.addEventListener("click", function(){ modal.close();});

  paragraphText= "";

}

function cardClicked (){
  const elementClicked = event.target;

  handleShowingCard(elementClicked);
  elementClicked.setAttribute('style', 'pointer-events: none');

  //Introduce the card selected into the stack to be analyzed
  openedCards.push(elementClicked);


 if (openedCards.length === 2){
   //BLoquear todo el resto de cartas
   blockCards();
   updateCounter();
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

// When the matched cards array contains the same number of the total of cards... game end
  if (matchedCards.length == 16){
      showModalOfSuccess();
  }

  openedCards[0].removeEventListener("click",cardClicked);
  openedCards[1].removeEventListener("click",cardClicked);
  // Reset the array to 0, so we can keep comparing pair by pair
  openedCards=[];

  unblockCards();


}

/* Function to handle when a pair isn't a match*/
function notAMatch(notMatch){
  /* Timeout function so we can show a bit of time the card before we fold it*/
  setTimeout(function () {

    openedCards[0].className = "card";
    openedCards[1].className = "card";
    openedCards = [];
    unblockCards();

  }, 600);

}
// Function to update the counter every pair try
function updateCounter(){
  counter = counter + 1;
  counterLiteral[0].innerHTML = counter;
  ratingStars();
}

// restart game function
function restartGame(){
  let cards = document.getElementsByClassName("card");
  let restartButton = document.getElementsByClassName("fa-repeat");
  for (card of cards){
    card.classList.remove="show";
  }
  restartButton[0].removeEventListener("click",restartGame);

  startGame();
}

// Modal to be shown when the game ends
function showModalOfSuccess(){

  if (document.getElementById('paragraph-modal')){
      if (document.getElementById("paragraph-modal").innerHTML !== " " )
      {
      document.getElementById("paragraph-modal").innerHTML= "";
      }
    }

    let modal = document.getElementById('demo-modal');

    modal.showModal();
    /* Creation of the paragraph to show data*/
    let modalBody = document.getElementsByClassName("modal-body");
    let paragraph = document.createElement("p");
    paragraph.setAttribute("id", "paragraph-modal");

    let time = Date.now() - startingTime;


    paragraph.innerHTML = `You made it! It took you ${counter} moves and
    ${msToTime(time)} (H:m:s:ms) with a rating of ${howManyStars} stars!!`;

    modalBody[0].appendChild(paragraph);

    // close when clicking on backdrop
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.close('cancelled');
      }
    });
}

// function with a switch to evaluate the need of stars being shown or not
function ratingStars(){

  switch (true) {
    case (counter > 0 && counter < 15):
        howManyStars = 3;
        break;
    case (counter >= 15 && counter < 21):
        document.getElementsByClassName("star1")[0].classList.add("hide");
        howManyStars = 2;
        break;
    case (counter >= 21):
        document.getElementsByClassName("star1")[0].classList.add("hide");
        document.getElementsByClassName("star2")[0].classList.add("hide");
        howManyStars = 1;
        break;
      }
  }

// Function to convert ms to HH:mm:ss:ms
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

/* Timer section, solution found in stackoverflow*/

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000); 
  }

  function blockCards(){
    let cards = document.getElementsByClassName("card");
    for (card of cards){
      card.setAttribute('style', 'pointer-events: none');
    }
  }

    function unblockCards(){
      let cards = document.getElementsByClassName("card");
      for (card of cards){
        card.setAttribute('style', 'pointer-events: auto');
      }
    }
