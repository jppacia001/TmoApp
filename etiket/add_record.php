<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$requiredFields = ['driver_name', 'address', 'license_no', 'violation_type', 'violation_date', 'violation_place'];

foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        echo json_encode(['success' => false, 'message' => "Field '$field' is required."]);
        exit;
    }
}

if (!preg_match('/^[A-Z]\d{2}-\d{2}-\d{6}$/', $data['license_no'])) {
    echo json_encode(['success' => false, 'message' => "Invalid license number format."]);
    exit;
}

if (!empty($data['phone_number']) && !preg_match('/^\+63\d{10}$/', $data['phone_number'])) {
    echo json_encode(['success' => false, 'message' => "Invalid phone number format."]);
    exit;
}

if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => "Invalid email format."]);
    exit;
}

$mysqli = new mysqli('localhost', 'root', '', 'etiket');

if ($mysqli->connect_error) {
    echo json_encode(['success' => false, 'message' => "Database connection failed: " . $mysqli->connect_error]);
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO traffic_records (driver_name, address, license_no, license_expiry_date, date_of_birth, remarks, violation_type, violation_date, violation_place, violation_latitude, violation_longitude, phone_number, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    'ssssssssssdds',
    $data['driver_name'],
    $data['address'],
    $data['license_no'],
    $data['license_expiry_date'],
    $data['date_of_birth'],
    $data['remarks'],
    $data['violation_type'],
    $data['violation_date'],
    $data['violation_place'],
    $data['violation_latitude'],
    $data['violation_longitude'],
    $data['phone_number'],
    $data['email']
);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => "Database error: " . $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>
