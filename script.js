const basket = document.getElementById('basket');
const ball = document.getElementById('ball');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');

let score = 0;
let basketSpeed = 10;
let ballSpeed = 5;
let gameInterval;
let ballInterval;

let basketPosition = gameContainer.offsetWidth / 2 - basket.offsetWidth / 2;

// Move basket left and right
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    basketPosition -= basketSpeed;
    if (basketPosition < 0) basketPosition = 0;
    basket.style.left = basketPosition + 'px';
  } else if (e.key === 'ArrowRight') {
    basketPosition += basketSpeed;
    if (basketPosition > gameContainer.offsetWidth - basket.offsetWidth)
      basketPosition = gameContainer.offsetWidth - basket.offsetWidth;
    basket.style.left = basketPosition + 'px';
  }
});

// Function to create a new falling ball
function createBall() {
  ball.style.top = '0px';
  ball.style.left = Math.random() * (gameContainer.offsetWidth - ball.offsetWidth) + 'px';
  gameContainer.appendChild(ball);
}

// Move the ball down
function moveBall() {
  let ballTop = ball.offsetTop;
  ballTop += ballSpeed;
  ball.style.top = ballTop + 'px';

  // Check for collision with basket
  if (
    ballTop + ball.offsetHeight >= basket.offsetTop &&
    ball.offsetLeft + ball.offsetWidth >= basket.offsetLeft &&
    ball.offsetLeft <= basket.offsetLeft + basket.offsetWidth
  ) {
    // Caught
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    // Reset ball
    ball.style.top = '0px';
    ball.style.left = Math.random() * (gameContainer.offsetWidth - ball.offsetWidth) + 'px';
  }

  // Check if ball missed
  if (ballTop > gameContainer.offsetHeight) {
    // Missed, reset ball
    ball.style.top = '0px';
    ball.style.left = Math.random() * (gameContainer.offsetWidth - ball.offsetWidth) + 'px';
  }
}

// Start the game
function startGame() {
  createBall();
  ballInterval = setInterval(moveBall, 20);
}

// Initialize game
startGame();
