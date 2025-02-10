<?php
session_start();

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $users = json_decode(file_get_contents('users.json'), true);
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (isset($users[$username])) {
        $error = 'این نام کاربری قبلاً ثبت شده است.';
    } else {
        $users[$username] = ['password' => $password];
        file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));
        $_SESSION['logged_in'] = true;
        $_SESSION['username'] = $username;
        header('Location: index.php');
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ثبت نام</title>
    <link rel="stylesheet" href="register.css">
</head>
<body>
    <div class="register-container">
        <h2>ثبت نام</h2>
        <form action="register.php" method="POST">
            <input type="text" name="username" placeholder="نام کاربری" required>
            <input type="password" name="password" placeholder="رمز عبور" required>
            <button type="submit">ثبت نام</button>
        </form>
        <p><?php echo isset($error) ? $error : ''; ?></p>
        <a href="login.php">قبلاً ثبت نام کرده‌اید؟ وارد شوید</a>
    </div>
</body>
</html>