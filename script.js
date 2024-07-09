//fetch from html using document.querySelector
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;

//WINNING CONDITIONS IN (TIC-TAC-TOE)
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//let's create a function to intialise the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //FOR EMPTY ON UI WHEN CLICKED ON NEW GAME
  boxes.forEach((box, index) => {
    box.innerHTML = "";
    boxes[index].style.pointerEvents = "all";
    //Initialize box with CSS Properties again
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player-${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") currentPlayer = "O";
  else currentPlayer = "X";
  gameInfo.innerText = `Current Player-${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    //ALL 3 BOXES SHOULD BE NON EMPTY AND EXACTLY SAME VALUE
    if (
      (gameGrid[position[0]] !== "" &&
        gameGrid[position[1]] !== "" &&
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "O";

      //DISABLE NOW REMAINING BOXES
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //Now We Know X/O is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //After the above code We having a winner In Answer.
  if (answer !== "") {
    gameInfo.innerHTML = `Winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //We know , No Winner Found,Let's Checking Whether for a Tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box != "") fillCount++;
  });
  // BOARD IS FILLED ,GAME IS TIE
  if (fillCount === 9) {
    gameInfo.innerHTML = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    //SWAP TURN
    swapTurn();
    //Check for winning Player
    checkGameOver();
  }
}

//Add EventListner for boxes
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
