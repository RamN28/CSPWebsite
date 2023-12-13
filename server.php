<?php
header('Content-Type: application/json');

$usersFile = 'user.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';

    if ($action === 'signup') {
        signup();
    } elseif ($action === 'login') {
        login();
    }
}

function signup() {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if (!$username || !$password) {
        echo json_encode(['message' => 'Bhenchod Please both username and password.']);
        return;
    }

    $users = getUsers();

    if (userExists($users, $username)) {
        echo json_encode(['message' => 'Username already exists.']);
        return;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $users[] = ['username' => $username, 'password' => $hashedPassword];

    saveUsers($users);

    echo json_encode(['message' => 'Signup successful!']);
}


function login() {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!$username || !$password) {
        echo json_encode(['message' => 'Please enter both username and password.']);
        return;
    }

    $users = getUsers();
    $user = findUser($users, $username);

    if (!$user || !password_verify($password, $user['password'])) {
        echo json_encode(['message' => 'Invalid username or password.']);
        return;
    }

    echo json_encode(['message' => 'Login successful!']);
}

function getUsers() {
    global $usersFile;
    $usersData = file_get_contents($usersFile);
    return json_decode($usersData, true) ?: [];
}

function saveUsers($users) {
    global $usersFile;
    file_put_contents($usersFile, json_encode($users));
}

function userExists($users, $username) {
    return !!findUser($users, $username);
}

function findUser($users, $username) {
    return array_reduce($users, function ($foundUser, $user) use ($username) {
        return $user['username'] === $username ? $user : $foundUser;
    }, null);
}
?>
