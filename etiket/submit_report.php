<?php
// Database connection
$servername = "localhost";
$username = "root";  // default username for XAMPP
$password = "";      // default password for XAMPP
$dbname = "etiket";   // Your existing database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON POST data
$data = json_decode(file_get_contents("php://input"));

// Extract fields from the JSON data
$location = $data->location;
$address = $data->address;
$description = $data->description;

// Prepare SQL statement
$sql = "INSERT INTO accident_reports (location, address, description)
        VALUES ('$location', '$address', '$description')";

// Execute query
if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Report submitted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

// Close connection
$conn->close();
?>
