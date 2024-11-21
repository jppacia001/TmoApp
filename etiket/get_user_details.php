<?php
header('Content-Type: application/json');

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "etiket";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user ID from query parameter
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Validate user ID
if ($id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid user ID."]);
    exit;
}

// Fetch user details
$query = "SELECT name, email FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found."]);
    exit;
}

$user = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "user" => $user
]);

$stmt->close();
$conn->close();
?>
