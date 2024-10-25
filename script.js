const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const fallingObject = document.getElementById('fallingObject');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

let score = 0;
let lives = 3;
let objectFallSpeed = 2; 
let isGameOver = false;

document.addEventListener('keydown', (e) => {
    if (isGameOver) return;
  
    const playerPosition = player.offsetLeft;
    if (e.key === 'ArrowLeft' && playerPosition > 0) {
      player.style.left = playerPosition - 20 + 'px';
    } else if (e.key === 'ArrowRight' && playerPosition < gameContainer.offsetWidth - player.offsetWidth) {
      player.style.left = playerPosition + 20 + 'px';
    }
  });

  function resetFallingObject() {
    fallingObject.style.top = '0px';
    fallingObject.style.left = Math.floor(Math.random() * (gameContainer.offsetWidth - fallingObject.offsetWidth)) + 'px';
  }
  
  function updateFallingObject() {
    if (isGameOver) return;
  
    const objectPosition = fallingObject.offsetTop;
    fallingObject.style.top = objectPosition + objectFallSpeed + 'px';
  
    // Check for a more precise collision with the player
    const playerLeft = player.offsetLeft;
    const playerRight = playerLeft + player.offsetWidth;
    const objectLeft = fallingObject.offsetLeft;
    const objectRight = objectLeft + fallingObject.offsetWidth;
  
    // collision condition
    if (
      objectPosition + fallingObject.offsetHeight >= player.offsetTop && // checks vertical overlap
      objectLeft >= playerLeft + 10 && // ensures object is within 10px of the player's left side
      objectRight <= playerRight - 10  // ensures object is within 10px of the player's right side
    ) {
      // Only award points if the object is well within the basket
      score++;
      scoreDisplay.innerText = `Score: ${score}`;
      objectFallSpeed += 0.1; // Increase speed as score increases
      resetFallingObject();
    }
  
    // Check if object has fallen past player without a catch
    if (objectPosition > gameContainer.offsetHeight) {
      lives--;
      livesDisplay.innerText = `Lives: ${lives}`;
      if (lives === 0) endGame();
      else resetFallingObject();
    }
  
    requestAnimationFrame(updateFallingObject);
  }
  resetFallingObject();
  updateFallingObject();
  

  
  function endGame() {
    isGameOver = true;
    const gameOverMessage = document.getElementById('gameOverMessage');
    gameOverMessage.style.display = 'block';
  }

  function restartGame() {
    score = 0;
    lives = 3;
    objectFallSpeed = 2;
    isGameOver = false;
    scoreDisplay.innerText = `Score: ${score}`;
    livesDisplay.innerText = `Lives: ${lives}`;
    const gameOverMessage = document.getElementById('gameOverMessage');
    gameOverMessage.style.display = 'none';
    resetFallingObject();
    updateFallingObject();
  }
  
  