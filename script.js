let score = 0;
let imageIndex = 1;
const maxImages = 6;

const scoreDisplay = document.getElementById('score');
const clickImage = document.getElementById('click-image');

// برای ذخیره امتیاز کاربر
function saveScore(score) {
    fetch('save_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `score=${score}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// افزایش امتیاز
function updateScore() {
    score++;
    imageIndex = (imageIndex % maxImages) + 1;
    scoreDisplay.textContent = `امتیاز: ${score}`;
    clickImage.src = `image${imageIndex}.jpg`;
    saveScore(score);
}

// جلوگیری از رفرش شدن صفحه و عوض شدن عکس
clickImage.addEventListener('click', (event) => {
    event.preventDefault();
    updateScore();
});