<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "etiket";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Prepare and execute the SQL query
$sql = "SELECT id, name, email, password FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // No user found with that email
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    $stmt->close();
    $conn->close();
    exit();
}

$row = $result->fetch_assoc();

// Verify the password
if (password_verify($password, $row['password'])) {
    // Login successful
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "user" => [
            "id" => $row['id'],
            "name" => $row['name'],
            "email" => $row['email']
        ]
    ]);
} else {
    // Password incorrect
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
}

$stmt->close();
$conn->close();
?>
