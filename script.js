let score = 0;

// بارگذاری امتیاز از Local Storage
function loadScore() {
  const savedScore = localStorage.getItem("userScore");
  if (savedScore !== null) {
    score = parseInt(savedScore, 10);
  }
  updateScoreDisplay();
}

// ذخیره امتیاز در Local Storage
function saveScore() {
  localStorage.setItem("userScore", score);
}

// به‌روزرسانی نمایش امتیاز
function updateScoreDisplay() {
  document.getElementById("score").textContent = `امتیاز: ${score}`;
}

// مدیریت کلیک دکمه
document.getElementById("clickButton").addEventListener("click", () => {
  score++;
  updateScoreDisplay();
  saveScore();
});

// ریست امتیاز
document.getElementById("resetButton").addEventListener("click", () => {
  score = 0;
  updateScoreDisplay();
  saveScore();
});

// بارگذاری امتیاز هنگام شروع بازی
loadScore();
