<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit;
}

$username = $_SESSION['username'];
$is_admin = $username === 'admin';

// خواندن اطلاعات کاربران
$users_data = json_decode(file_get_contents('users.json'), true);
$score_data = json_decode(file_get_contents('scores.json'), true);

if (!$is_admin) {
    $score = isset($score_data[$username]) ? $score_data[$username] : 0;
} else {
    $score = 0; // ادمین امتیازی ندارد
}

// ذخیره امتیازات در فایل
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$is_admin) {
    $score += 1;
    $score_data[$username] = $score;
    file_put_contents('scores.json', json_encode($score_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
?>

<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>بازی نور کلیکر</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <?php if ($is_admin): ?>
            <h1>پنل مدیریت</h1>
            <table>
                <thead>
                    <tr>
                        <th>نام کاربری</th>
                        <th>امتیاز</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($score_data as $user => $user_score): ?>
                        <tr>
                            <td><?= htmlspecialchars($user) ?></td>
                            <td><?= htmlspecialchars($user_score) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <h1>به بازی نور کلیکر خوش آمدید!</h1>
            <div class="score">امتیاز شما: <span id="score"><?= $score ?></span></div>
            <div class="image-container">
                <img id="click-image" class="clickable-image" src="image1.jpg" alt="Click Me!">
            </div>
            <form method="POST" id="score-form">
                <input type="hidden" name="score" id="score-input">
            </form>
        <?php endif; ?>

        <button onclick="window.location.href='logout.php'" class="logout-btn">خروج</button>
    </div>

    <script>
        // به‌روزرسانی امتیاز بدون رفرش صفحه
        const image = document.getElementById('click-image');
        const scoreSpan = document.getElementById('score');
        const scoreForm = document.getElementById('score-form');
        let score = parseInt(scoreSpan.textContent);

        image.addEventListener('click', () => {
            score++;
            scoreSpan.textContent = score;
            document.getElementById('score-input').value = score;
            scoreForm.submit();
        });
    </script>
</body>
</html>