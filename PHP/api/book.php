<?php
    // header('Access-Control-Allow-Origin: *');
    $servername = "localhost";
    $username = "producer";
    $password = "Producer1234?";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password);
    $conn ->query("use PRODUCTION");
    
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";
    print_r ($conn->query("SELECT * FROM PRODUCT"));
  
?>