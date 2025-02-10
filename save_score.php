<?php
session_start();

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode(['status' => 'error', 'message' => 'دسترسی غیرمجاز']);
    exit;
}

$username = $_SESSION['username'];
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;

if ($score < 0) {
    echo json_encode(['status' => 'error', 'message' => 'امتیاز نامعتبر']);
    exit;
}

$dataFile = 'scores.json';

// خواندن داده‌های قبلی
if (file_exists($dataFile)) {
    $scores = json_decode(file_get_contents($dataFile), true);
    if (!is_array($scores)) {
        $scores = [];
    }
} else {
    $scores = [];
}

// ذخیره یا به‌روزرسانی امتیاز کاربر
$scores[$username] = $score;

file_put_contents($dataFile, json_encode($scores, JSON_PRETTY_PRINT));

echo json_encode(['status' => 'success', 'message' => 'امتیاز ذخیره شد']);
?>