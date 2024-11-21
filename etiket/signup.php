<?php
header('Content-Type: application/json');

// Database credentials
$servername = "localhost";
$username = "root"; // Default MySQL username
$password = ""; // Default MySQL password is empty
$dbname = "etiket";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$tmoId = $data['tmoId'];
$name = $data['name'];
$birthday = $data['birthday'];
$gender = $data['gender'];
$address = $data['address'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash password

// Insert data into database
$stmt = $conn->prepare("INSERT INTO users (tmoId, name, birthday, gender, address, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $tmoId, $name, $birthday, $gender, $address, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["message" => "User registered successfully"]);
} else {
    echo json_encode(["message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
