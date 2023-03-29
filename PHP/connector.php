<?php
    class DatabaseConnector{
        private $conn;
        function DatabaseConnector(){
            $servername = "localhost";
            $username = "producer";
            $password = "Producer1234?";
            // Create connection
            $this->conn = new mysqli($servername, $username, $password);
            $this->conn ->query("use PRODUCTION");
            if ($this->conn->connect_error) {
              die("Connection failed: " . $this->conn->connect_error);
            }
            echo "Connected successfully";
        }
    }
?>