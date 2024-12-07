<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the Composer autoloader if using Composer
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();                                            // Set mailer to use SMTP
    $mail->Host       = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
    $mail->SMTPAuth   = true;                                     // Enable SMTP authentication
    $mail->Username   = 'jppacia001@gmail.com';                   // SMTP username
    $mail->Password   = 'sincedecember012016';                    // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;           // Enable TLS encryption
    $mail->Port       = 587;                                      // TCP port to connect to

    //Recipients
    $mail->setFrom('jppacia001@gmail', 'TMO');           // Set the sender's email
    $mail->addAddress('driver-email@example.com', 'Driver Name');  // Add a recipient

    // Content
    $mail->isHTML(true);                                          // Set email format to HTML
    $mail->Subject = 'Ticket Issued';
    $mail->Body    = 'Hello Driver,<br><br>You have been issued a ticket. Please check your violation details.';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
