// Get HTML elements
const board = document.querySelector("#game-board");

// Define game variables
const gridSize = 20;
let startPosition = {x:10, y:10} //every position is an object that has the (x,y) coordinates
let snake = [startPosition, {x:startPosition.x+1, y:startPosition.y}]; //snake is an array with the object that saves the (x,y) position of each snake cube. 

// Draw snake
function draw() {
  board.innerHTML = '';
  drawSnake();
}

// Draw snake (creates new snake element and draws each body part of the snake at the position x,y position)
function drawSnake() {
  snake.forEach((snakeBodyPart) => {
    //create new element
    const element = document.createElement("div");
    element.className = "snake";
    const snakeElement = element;
    //set position of new element
    snakeElement.style.gridColumn = snakeBodyPart.x;
    snakeElement.style.gridRow = snakeBodyPart.y;
    //append it to the board
    board.appendChild(snakeElement);
  });
}


// Testing draw function
 draw();