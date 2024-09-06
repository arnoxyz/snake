// Get HTML elements
const boardElement = document.querySelector("#game-board");
const scoreElement = document.querySelector("#score");
const highScoreElement = document.querySelector("#high-score");

// Define game variables
const GRID_SIZE = 20;
let startPosition = { x: 10, y: 10 }; //every position is an object that has the (x,y) coordinates
let snake = [startPosition]; //snake is an array with the object that saves the (x,y) position of each snake cube.
let food = { x: 15, y: 15 };
let direction = "right";
let score = 0;
let highScore = 0;

// Draw snake
function draw() {
  boardElement.innerHTML = "";
  drawFood();
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
    boardElement.appendChild(snakeElement);
  });
}

// Draw food
function drawFood() {
  //TODO: generate random positon in the grid
  let xPosition = food.x;
  let yPosition = food.y;

  //create new element
  const element = document.createElement("div");
  element.className = "food";
  const foodElement = element;
  //set position of new element
  foodElement.style.gridColumn = xPosition;
  foodElement.style.gridRow = yPosition;
  //append it to the board
  boardElement.appendChild(foodElement);
}

// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head); //add new head position at the start of the array
  snake.pop(); //delete the last body element
}

function gameControls(event) {
  switch (event.key) {
    case "w":
      direction = "up";
      break;
    case "d":
      direction = "right";
      break;
    case "s":
      direction = "down";
      break;
    case "a":
      direction = "left";
      break;
  }
}

function collisionDetection() {
  //snake head position
  console.log(snake[0].x);
  console.log(snake[0].y);

  //collision with board
  if (snake[0].x >= GRID_SIZE || snake[0].x <= 0) {
    console.log("collision!!!! x-way");
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore.toString().padStart(3, "0");
    }
    reset();
  }

  if (snake[0].y >= GRID_SIZE || snake[0].y <= 0) {
    console.log("collision!!!! y-way");
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore.toString().padStart(3, "0");
    }
    reset();
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    console.log("snake on food");
    //generate new (x,y) position for food -> random x,y position that is in the GRID_SIZE
    food.x = Math.floor(Math.random() * GRID_SIZE + 1);
    food.y = Math.floor(Math.random() * GRID_SIZE + 1);

    //add element to the snake
    snake.push({ x: 0, y: 0 });

    score += 1;
    scoreElement.textContent = score.toString().padStart(3, "0");
  }
}

// Testing drawing and moving the snake
document.addEventListener("keydown", gameControls);
drawFood();

function gameLoop() {
  const interval = setInterval(() => {
    move();
    collisionDetection();
    draw();
  }, 250);
}

function reset() {
  highScoreElement.style.display = "block";
  score = 0;
  scoreElement.textContent = score.toString().padStart(3, "0");
  snake = [startPosition]; //snake is an array with the object that saves the (x,y) position of each snake cube.
  food = { x: 15, y: 15 };
  clearInterval(interval);
}

gameLoop();
