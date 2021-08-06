let userInput = document.getElementById("user-input");
let submitRangeButton = document.getElementById("secret-num-button");
let newGameButton = document.getElementById("new-game-button");
let gameBoard = document.getElementById("game-board");
let answerCheckForm = document.getElementById("check-answer");
let submitGuessButton = document.getElementById("submit-guess-button");
let minInput;
let maxInput;
let randomNum;
let rangeInfo = "";
let userGuess = "";
let wrongGuesses = 0;
let guessMessage;
let guessArray = [];
let guessHistory;

//Generate random number within a range
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Input validity check and generate range
function generateRange() {
  if (userGuess === randomNum) {
    submitRangeButton.addEventListener("click", generateRange);
    submitGuessButton.addEventListener("click", checkAnswer);
    document.getElementById("min-num").value = "";
    document.getElementById("max-num").value = "";
    document.getElementById("guess").value = "";
    rangeInfo.remove();
    guessMessage.remove();
    guessHistory.remove();
    gameBoard.className = "game-board-hidden";
    wrongGuesses = 0;
    guessArray = [];
    userGuess = "";
  }

  if (userInput.checkValidity()) {
    // event.preventDefault();
    minInput = parseInt(document.getElementById("min-num").value);
    maxInput = parseInt(document.getElementById("max-num").value);
    if (maxInput - minInput < 5) {
      window.alert("Please choose a range wider than 5")
    } else {
      randomNum = getRandomNum(minInput, maxInput);
      rangeInfo = document.createElement("p");
      rangeInfo.innerHTML = `You chose the range between ${minInput} and ${maxInput}`;
      document.querySelector(".range").appendChild(rangeInfo);
      console.log(randomNum)
      // submitRangeButton.removeEventListener("click", generateRange)
      gameBoard.className = "game-board-display";
    } 
    submitGuessButton.addEventListener("click", checkAnswer); //Allow user guesses
  }
}
//Start game
submitRangeButton.addEventListener("click", generateRange);

//Play game
function checkAnswer() {
  if (answerCheckForm.checkValidity()) {
    if (userGuess !== "") {
      guessMessage.remove();
      guessHistory.remove();
    }
    
    userGuess = parseInt(document.getElementById("guess").value);
    guessArray.push(userGuess);
    if (userGuess === randomNum) {
      guessMessage = document.createElement("p");
      guessMessage.innerHTML = `Bravo - You guessed correctly! The secret number is ${randomNum}.`;
      gameBoard.appendChild(guessMessage);
      if (wrongGuesses === 0) {
        guessHistory = document.createElement("p");
        guessHistory.innerHTML = `It only took you 1 guess to get here!`;
        gameBoard.appendChild(guessHistory);
      } else {
        guessHistory = document.createElement("p");
        guessHistory.innerHTML = `Your guess history -- ${guessArray.join(", ")}. <br>It took you ${wrongGuesses + 1} guesses to get here.`;
        gameBoard.appendChild(guessHistory);
      }

      submitGuessButton.removeEventListener("click", checkAnswer);
      submitRangeButton.addEventListener("click", generateRange);
    } else if (userGuess > randomNum) {
      wrongGuesses++;
      

      guessMessage = document.createElement("p");
      guessMessage.innerHTML = `Your guess is too high - take another guess!`;
      gameBoard.appendChild(guessMessage); 

      guessHistory = document.createElement("p");
      guessHistory.innerHTML = `Your guess history -- ${guessArray.join(", ")}. <br>You have ${wrongGuesses} incorrect guesses.`;
      gameBoard.appendChild(guessHistory);

  
    } else if (userGuess < randomNum) {
      wrongGuesses++;

      guessMessage = document.createElement("p");
      guessMessage.innerHTML = `Your guess is too low - take another guess!`;
      gameBoard.appendChild(guessMessage);

      guessHistory = document.createElement("p");
      guessHistory.innerHTML = `Your guess history -- ${guessArray.join(", ")}. <br>You have ${wrongGuesses} incorrect guesses.`;
      gameBoard.appendChild(guessHistory);
    }
  }
}