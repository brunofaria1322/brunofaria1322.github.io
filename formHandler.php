<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $subject = "New Form Submission";
    $formcontent="From: $name \n Message: $message";
        
    $to = "brunofaria1322@gmail.com";

    $mailheader = "From: $email \r\n";
    
    mail($to, $subject, $formcontent, $mailheader)  or die("Error!");
    echo "Thank You!";

?>