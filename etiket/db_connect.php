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

?>