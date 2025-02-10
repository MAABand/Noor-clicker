<?php
session_start();

if (!isset($_SESSION['logged_in']) || $_SESSION['username'] !== 'admin') {
    header('Location: login.php');
    exit;
}

$dataFile = 'scores.json';
$scores = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

echo "<h1>جدول امتیازات کاربران</h1>";
echo "<table border='1'>
        <tr>
            <th>نام کاربری</th>
            <th>امتیاز</th>
        </tr>";

foreach ($scores as $user => $score) {
    echo "<tr><td>{$user}</td><td>{$score}</td></tr>";
}

echo "</table>";
?>