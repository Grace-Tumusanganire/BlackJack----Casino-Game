//PREPARING ARRAYS, VARIABLES, AND ELEMENTS USED IN THE GAME 
//Arrays declaration 
let cardDeck = []; //An empty array that will store all the cards
let playerCards = []; //An empty array that will store the cards dealt to the player
let computerCards = []; //An empty array that will store the cards dealt to the computer
let cardsValue = []; // An empty array that will store temporarily the numeric values of the cards

//Declaring variables that will store the score of the players (Human player and Computer player) of the game
let sum = 0; //A variable that will temporarily store the sumed score
let playerScore = 0; //
let computerScore = 0;

//Creating and accessing HTML elements that will hold images and texts on the web page
let prevImg = document.createElement("img"); //An image element that will hold the previously dealt card image
let prevC = document.getElementById("prevCard"); //
let divImg1 = document.getElementById("pCards");
let divImg2 = document.getElementById("cCards");
let pScore = document.getElementById("scoreP");
let cScore = document.getElementById("scoreC");

let startB = document.getElementById("start") //Start button
let dealB = document.getElementById("deal"); //Deal button
let stopB = document.getElementById("stop"); //Stop button

let res = document.getElementById("gameResol"); //Game resolution, where the winner of the game is displayed
let inst = document.getElementById("instr"); //Game instructions
let pHeader = document.getElementById("player");
let cHeader = document.getElementById("computer");
let prevCHeader = document.getElementById("lastC");

//DATA PREPARATION
//Creating the cards'deck
function createDeck(deckCard) {
  let suit = ["H", "D", "S", "C"];
  let suitValue = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];
  for (let i = 0; i < suit.length; i++) {
    for (let j = 0; j < suitValue.length; j++) {
      deckCard.push(suitValue[j] + "-" + suit[i]);
    }
  }
}
createDeck(cardDeck);

//Shuffling the deck
function shufflecardDeck(cardArray) {
  for (let j = cardArray.length - 1; j > 0; j--) {
    let k = Math.floor(Math.random() * cardArray.length);
    let l = cardArray[j];
    cardArray[j] = cardArray[k];
    cardArray[k] = l;
  }
  return cardArray;
}
shufflecardDeck(cardDeck);

//SETTING AND ARRANGING THE WEB PAGE
//A function that gets the dealt card image from the cards' image folder and appends it to the image element on the web page
function appendCard(arrayCards, divImg) {
  let img1 = document.createElement("img");
  let cardRet = arrayCards[arrayCards.length - 1];
  img1.src = "./cards/" + cardRet + ".png"
  divImg.appendChild(img1);
}

//A function that displays the last card dealt
function changePrevC(arrayCards) {
  prevImg.src = "./cards/" + arrayCards[arrayCards.length - 1] + ".png";
  prevC.prepend(prevImg);
}

//CALCULATING THE SCORE OF THE PLAYERS (HUMAN AND COMPUTER PLAYERS) AND CHECKING THE WINNER OF THE GAME
//A function that gets the numeric value of the card
function getCardValue(dealtCards, cardNumValue = []) {
  for (let m = 0; m < dealtCards.length; m++) {
    cardNumValue.push(dealtCards[m].split("-", 1)); //spliting the numeric value from the suit type and pushing the value into the cardsValue array
  }
  return cardNumValue;
}
//getCardValue(playerCards, cardsValue);

//A function that turns the values extracted as a string to an integer and gives integer values to Jack(J as 10), Queen(Q as 10), King(K as 10), and Ace (A as 1)
function getCardScore(valueOfCards) {
  for (let n = 0; n < valueOfCards.length; n++) {
    if (isNaN(valueOfCards[n]) && valueOfCards[n] == "A") {
      valueOfCards.splice(n, 1, 1);
    } else if (isNaN(valueOfCards[n]) && (valueOfCards[n] == "K" || "Q" || "J")) {
      valueOfCards.splice(n, 1, 10);
    } else {
      valueOfCards[n] = parseInt(valueOfCards[n]);
    }
  }
  return valueOfCards;
}
//getCardScore(cardsValue)

//A function that calculates the actual sum of the cards'numeric values tempararily stored in the cardsValue array to get the player's score
function CalculateCardSum(cardNumValue) {
  for (let p of cardNumValue) {
    sum += p;
  }
  return sum;
}
//CalculateCardSum(cardsValue);

//A function that updated the score of the player (either human or computer) on the web page
function updateScore(theScore, nScore) {
  nScore.innerText = `Your score is :` + theScore;
}
//updateScore(playerScore, pScore)

//A function that checks the winner of the game according to each player's total score
function checkWinner(score1, score2) { //Score1 is the human player total score, score2 is the computer player total score
  if (score1 <= 21 && (score2 > 21)) {
    res.innerHTML = `Player won!`
  }
  else if (score2 <= 21 && (score2 >= score1)) {
    res.innerHTML = `computer won!`
  }
}

//START GAME
// A function that deals the first two cards upon the players click on the Start button
let start=0;
function startGame(arr1, arr2, divImg, newScore, divScore) {
  inst.style.display='none';
  prevCHeader.innerHTML = `Previously dealt card`;
  pHeader.innerHTML = `Player's cards`;
  cHeader.innerHTML = `Computer's cards`;
  start=start + 1;
  for (let i = 0; i < 2; i++) {
    let card = arr1.pop().toString();
    arr2.push(card);
    appendCard(arr2, divImg);
  }
  changePrevC(arr2);
  cardsValue.splice(0, cardsValue.length);
  getCardValue(arr2, cardsValue);
  getCardScore(cardsValue);
  sum = 0;
  CalculateCardSum(cardsValue);
  newScore = sum;
  if(start==1){
    playerScore=newScore
  }else{
    computerScore=newScore
  }
  updateScore(newScore, divScore);
  startB.disabled = true;
  if (stopB.disabled == true){
    stopB.disabled = false;
    res.innerHTML = `You can now click the deal button to increase your scores to a satisfactory level`;
  }
}
//startGame(cardDeck, playerCards, divImg1, playerScore, pScore)

//A function that deals one card per player's request/after the player clicks the deal button
function newCard(cardsInArray, newScore, divImg, divScore) {
  moreCard = cardDeck.pop().toString();
  cardsInArray.push(moreCard);
  appendCard(cardsInArray, divImg);
  changePrevC(cardsInArray);
  cardsValue.splice(0, cardsValue.length);
  getCardValue(cardsInArray, cardsValue);
  getCardScore(cardsValue);
  sum = 0;
  CalculateCardSum(cardsValue);
  newScore = sum;
  updateScore(newScore, divScore);
  if(start==1){
    playerScore=newScore
  }else{
    computerScore=newScore
  }
}
//newCard(playerCards, playerScore, divImg1, pScore);

//A function that checks a number of conditions and deals a new card
function continueGame() {
  inst.style.display='none';
  prevCHeader.innerHTML = `Previously dealt card`;
  pHeader.innerHTML = `Player's cards`;
  cHeader.innerHTML = `Computer's cards`;
  if (startB.disabled == false){
    res.innerHTML = `Please click the start button to start the game, and click the deal button to ask for another card if you are not satisfied with the score`
    stopB.disabled = true;
  }
  else if (playerScore < 21 && startB.disabled == true) {
    newCard(playerCards, playerScore, divImg1, pScore);
    if (playerScore > 21){
    dealB.disabled = true;
    stopB.disabled = true;
    res.innerHTML = `You are bust, computer won`;
  }
}
}

//A function that allows the computer to play upon the human player's click on the stop button
function nextPlayer() {
  inst.style.display='none';
  prevCHeader.innerHTML = `Previously dealt card`;
  pHeader.innerHTML = `Player's cards`;
  cHeader.innerHTML = `Computer's cards`;
  if (playerScore <= 21 && (startB.disabled == false && dealB.disabled == false)){
    res.innerHTML = `First start the game and if needed ask for more cards before stoping, or ask for a new game`
  }
  else if (playerScore <= 21 && (startB.disabled == true || dealB.disabled == true)) {
    dealB.disabled = true;
    startGame(cardDeck, computerCards, divImg2, computerScore, cScore); //Dealing the first two cards to the computer
    checkWinner(playerScore, computerScore); //Calling the checkWinner function to check for the winner given the condition in the function
    stopB.disabled = true;
    while (playerScore <= 21 && (computerScore < playerScore)){ //Dealing more cards to the computer anc checking for the winner again after dealing a card
      newCard(computerCards, computerScore, divImg2, cScore);
      checkWinner(playerScore, computerScore);
      stopB.disabled = true;
    }
  }
  else {
    dealB.disabled = true;
    stopB.disabled = true;
    res.innerHTML = `You are bust, computer won`
    stopB.disabled = true;
    checkWinner(playerScore, computerScore);
  }
}

//RESETING THE PAGE AND STARTING A NEW GAME
//A function that reset the page and starts a new game upon the human player's click on the New Game button
function newGame(){
 location.reload(true);
 cardDeck.splice(0, cardDeck.length);
 playerCards.splice(0, playerCards.length);
 computerCards.splice(0, computerCards.length);
 createDeck(cardDeck);
 shufflecardDeck(cardDeck);
 startB.disabled = false;
 dealB.disabled = false;
 stopB.disabled = false;
}