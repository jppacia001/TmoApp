<?php
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

// SQL query to select required fields
$sql = "SELECT driverName AS name, violationType AS violation, violationDate AS date, violationPlace AS location FROM violations";
$result = $conn->query($sql);

$records = array();

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
} else {
    echo "0 results";
}

// Close connection
$conn->close();

// Set content type to JSON
header('Content-Type: application/json');

// Output JSON
echo json_encode($records);
?>
