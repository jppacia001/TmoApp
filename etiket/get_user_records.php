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
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get user ID from query parameter
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

// Debugging: Log the received user_id
error_log("Received user_id: " . $user_id);

// Validate user ID
if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid user ID."]);
    exit;
}

// Fetch records grouped by violation date
$query = "
    SELECT 
        DATE(violation_date) as violation_date,
        COUNT(*) as count
    FROM traffic_records
    WHERE user_id = ?
    GROUP BY DATE(violation_date)
    ORDER BY violation_date ASC
";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$records = [];
while ($row = $result->fetch_assoc()) {
    $records[] = [
        "date" => $row['violation_date'],
        "count" => (int) $row['count']
    ];
}

// If no records, output a message
if (empty($records)) {
    echo json_encode([
        "success" => true,
        "message" => "No records found.",
        "records" => []
    ]);
} else {
    // Output the result as JSON
    echo json_encode([
        "success" => true,
        "records" => $records
    ]);
}

$stmt->close();
$conn->close();
?>
