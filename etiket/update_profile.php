<?php
header('Content-Type: application/json');

// Database configuration
$servername = "localhost"; // Update with your database server
$username = "root";        // Update with your database username
$password = "";            // Update with your database password
$dbname = "etiket";        // Update with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents("php://input"));

// Extract data
$id = $data->id;
$oldPassword = $data->oldPassword;
$newPassword = $data->newPassword;
$confirmPassword = $data->confirmPassword;
$name = $data->name;
$email = $data->email;

// Validate input
if (empty($id) || empty($oldPassword) || empty($newPassword) || empty($confirmPassword) || empty($name) || empty($email)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

if ($newPassword !== $confirmPassword) {
    echo json_encode(["success" => false, "message" => "New passwords do not match."]);
    exit;
}

// Check current password
$query = "SELECT password FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found."]);
    exit;
}

$row = $result->fetch_assoc();
$hashedOldPassword = $row['password'];

if (!password_verify($oldPassword, $hashedOldPassword)) {
    echo json_encode(["success" => false, "message" => "Old password is incorrect."]);
    exit;
}

// Hash new password
$hashedNewPassword = password_hash($newPassword, PASSWORD_BCRYPT);

// Update user details
$query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("sssi", $name, $email, $hashedNewPassword, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Profile update failed."]);
}

$stmt->close();
$conn->close();
?>
