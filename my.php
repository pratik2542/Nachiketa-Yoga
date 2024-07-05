<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // If you are using Composer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $phone = $_POST['PhoneNumber'];
    $message = $_POST['Message'];

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
        $mail->SMTPAuth = true;
        $mail->Username = 'nikhiljdas995@gmail.com'; // SMTP username
        $mail->Password = 'ifhpinvccjdptzmo'; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // TCP port to connect to

        // Recipients
        $mail->setFrom('nikhiljdas995@gmail.com', 'New Inquiry');
        $mail->addAddress('yoga.nachiketa@gmail.com', 'Inquiry from website'); // Add a recipient

        // Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'Form Submission Details';
        $mail->Body    = "Name: $name<br>Email: $email<br>Phone Number: $phone<br>Message: $message";

        // Send the email
        $mail->send();
        echo 'Message has been sent';
        header("Location: sent.html");
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
