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
let clickMultiplier = 1;
let autoClickerInterval = null;

// Load saved data from localStorage
function loadGameData() {
  score = parseInt(localStorage.getItem("score") || "0");
  let upgrades = JSON.parse(localStorage.getItem("upgrades") || "{}");
  
  // Apply Click Multiplier (default 1x, increases with purchases)
  clickMultiplier = (upgrades.clickMultiplier || 0) + 1;
  
  // Start Auto-Clicker if purchased
  startAutoClicker(upgrades.autoClicker || 0);
  
  // Start background music
  startBackgroundMusic();
  
  updateScore();
}

// Function to start Auto-Clicker
function startAutoClicker(autoClickerLevel) {
  if (autoClickerLevel > 0 && !autoClickerInterval) {
    autoClickerInterval = setInterval(() => {
      score += autoClickerLevel;
      updateScore();
    }, 1000);
  }
}

// Save the score to localStorage
function saveScore() {
  localStorage.setItem("score", score);
}

// Update score display
function updateScore() {
  document.getElementById("score").textContent = score;
  saveScore();
}

// Function to cycle images and update the score
function cycleImages() {
  score += clickMultiplier;
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("circle-image").src = images[currentIndex];
  
  updateScore();
}

// Function to play background music
function startBackgroundMusic() {
  let music = document.getElementById("bg-music");
  
  // Ensure the music plays even if the user reloads the page
  music.volume = 0.5; // Adjust volume (0 to 1)
  music.loop = true;
  music.play().catch(() => {
    console.log("User interaction needed to play audio.");
  });
}

// Load game data when the page loads
window.onload = loadGameData;
