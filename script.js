let score = 0;

// بارگذاری امتیاز از Local Storage
function loadScore() {
    const savedScore = localStorage.getItem("userScore");
    if (savedScore !== null) {
        score = parseInt(savedScore, 10);
    }
    document.getElementById("score").textContent = `Score: ${score}`;
}

// ذخیره امتیاز در Local Storage
function saveScore() {
    localStorage.setItem("userScore", score);
}

// افزایش امتیاز نمونه
function increaseScore() {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    saveScore();
}

loadScore();
