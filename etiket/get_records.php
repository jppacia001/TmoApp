<?php
// Database configuration
$host = 'localhost'; // Database host
$dbname = 'etiket'; // Adjusted to match your database name
$username = 'root'; // Database username
$password = ''; // Database password

try {
    // Create a new PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to fetch required data
    $sql = "
        SELECT 
            u.tmoid AS user_tmoid,
            u.name AS user_name,
            r.driver_name,
            r.license_no,
            r.violation_date,
            r.created_at
        FROM 
            traffic_records r
        JOIN 
            users u
        ON 
            r.user_id = u.id
    ";

    // Prepare and execute the query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch the records
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return data as JSON
    echo json_encode($records);

} catch (PDOException $e) {
    // Handle connection errors
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage(),
    ]);
}
?>
