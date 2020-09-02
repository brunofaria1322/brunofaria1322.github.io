<?php
    $name = $_POST["name"];
    $visitor_email = $_POST["email"];
    $message = $_POST["message"];

    $subject = "New Form Submission";
        
    $to = "brunofaria1322@gmail.com";

    $headers ="From: " . $name . "<". $visitor_email .">\r\n";
    
    if(mail($to, $subject, $message, $headers)){
	    $out_message = "Your contact information is received successfully.";
	    $type = "success";
    }

    require_once "formHandler.php";

?>