<?php

if (isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $subject = 'New Form Submission';
        
    $mail_to = "my@email.com";

    $headers = "From: ".$email;
    
    $txt = "Message from personal website from ".$name.".\n\n".$message;

    mail($mail_to, $subject, $txt, $headers);

    header("Location: index.html");
    echo 'Thank You!';
}

?>