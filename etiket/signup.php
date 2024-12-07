<?php
header('Content-Type: application/json');

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "etiket";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (
    empty($data['name']) || empty($data['birthday']) ||
    empty($data['gender']) || empty($data['address']) || empty($data['email']) || empty($data['password'])
) {
    echo json_encode(["message" => "All fields are required"]);
    exit;
}

// Sanitize input data
$name = $conn->real_escape_string($data['name']);
$birthday = $conn->real_escape_string($data['birthday']); // Expected format: YYYY-MM-DD
$gender = $conn->real_escape_string($data['gender']);
$address = $conn->real_escape_string($data['address']);
$email = $conn->real_escape_string($data['email']);
$password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash password

// Check if email already exists
$emailCheckQuery = $conn->prepare("SELECT id FROM users WHERE email = ?");
$emailCheckQuery->bind_param("s", $email);
$emailCheckQuery->execute();
$emailCheckQuery->store_result();

if ($emailCheckQuery->num_rows > 0) {
    echo json_encode(["message" => "Email already exists"]);
    $emailCheckQuery->close();
    $conn->close();
    exit;
}

$emailCheckQuery->close();

// Generate TMO OFFICER ID NUMBER
$year = date('y'); // Last two digits of the year
$month = date('m'); // Current month

// Find the last TMO ID for this year and month
$idQuery = $conn->prepare("SELECT tmoId FROM users WHERE tmoId LIKE CONCAT(?, '-', ?, '%') ORDER BY tmoId DESC LIMIT 1");
$idQuery->bind_param("ss", $year, $month);
$idQuery->execute();
$idQuery->bind_result($lastId);
$idQuery->fetch();
$idQuery->close();

if ($lastId) {
    // Extract the numeric part and increment it
    $lastNumber = (int)substr($lastId, 6);
    $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT); // Zero-padded to 4 digits
} else {
    // Start from 0001 if no records exist
    $newNumber = '0001';
}

$tmoId = $year . '-' . $month . $newNumber;

// Insert data into the database
$stmt = $conn->prepare("INSERT INTO users (tmoId, name, birthday, gender, address, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $tmoId, $name, $birthday, $gender, $address, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["message" => "User registered successfully", "tmoId" => $tmoId]);
} else {
    echo json_encode(["message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
