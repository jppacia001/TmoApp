<?php
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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve POST data
    $driverName = $_POST['driverName'];
    $address = $_POST['address'];
    $licenseNo = $_POST['licenseNo'];
    $licenseExpiryDate = $_POST['licenseExpiryDate']; // Format: YYYY-MM-DD
    $dateOfBirth = $_POST['dateOfBirth']; // Format: YYYY-MM-DD
    $remarks = $_POST['remarks'];
    $violationType = $_POST['violationType'];
    $violationDate = $_POST['violationDate']; // Format: YYYY-MM-DD
    $violationTime = $_POST['violationTime']; // Format: HH:MM:SS
    $violationPlace = $_POST['violationPlace'];
    $ownerOfVehicle = $_POST['ownerOfVehicle'];
    $plateNumber = $_POST['plateNumber'];
    $vehicleRegistrationNumber = $_POST['vehicleRegistrationNumber'];
    $colorOfVehicle = $_POST['colorOfVehicle'];
    $typeOfVehicle = $_POST['typeOfVehicle'];
    $codingStickerNo = $_POST['codingStickerNo'];
    $insurancePolicyNumber = $_POST['insurancePolicyNumber'];
    $toda = $_POST['toda'];
    $violationCount = $_POST['violationCount'];

    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO violations (driverName, address, licenseNo, licenseExpiryDate, dateOfBirth, remarks, violationType, violationDate, violationTime, violationPlace, ownerOfVehicle, plateNumber, vehicleRegistrationNumber, colorOfVehicle, typeOfVehicle, codingStickerNo, insurancePolicyNumber, toda, violationCount) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    // Bind parameters
    $stmt->bind_param("sssssssssssssssssss", $driverName, $address, $licenseNo, $licenseExpiryDate, $dateOfBirth, $remarks, $violationType, $violationDate, $violationTime, $violationPlace, $ownerOfVehicle, $plateNumber, $vehicleRegistrationNumber, $colorOfVehicle, $typeOfVehicle, $codingStickerNo, $insurancePolicyNumber, $toda, $violationCount);

    // Execute statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
