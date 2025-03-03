// Array of images for the game
const images = [
  "images/image1.jpg",
  "images/image2.jpg",
  "images/image3.jpg",
  "images/image4.jpg",
  "images/image5.jpg"
];

let currentIndex = 0;
let score = 0;

// Load saved data from localStorage
function loadGameData() {
  score = parseInt(localStorage.getItem('score') || "0");
  let upgrades = JSON.parse(localStorage.getItem('upgrades') || "{}");
  
  // Apply Click Multiplier (default 1x, increases with purchases)
  clickMultiplier = (upgrades.clickMultiplier || 0) + 1;
  
  // Start Auto-Clicker if purchased
  if (upgrades.autoClicker > 0) {
    setInterval(() => {
      score += upgrades.autoClicker; // Each auto-clicker adds 1 point per second
      updateScore();
    }, 1000);
  }
  
  updateScore();
}

// Save the score to localStorage
function saveScore() {
  localStorage.setItem('score', score);
}

// Update score display
function updateScore() {
  document.getElementById("score").textContent = score;
  saveScore();
}

// Function to cycle images and update the score
function cycleImages() {
  score += clickMultiplier; // Apply click multiplier
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById('circle-image').src = images[currentIndex];
  
  updateScore();
}

// Load game data when the page loads
window.onload = loadGameData;