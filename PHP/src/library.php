<?php

function checkPostRequest()
{
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("HTTP/1.1 401 Unauthorized");
        echo "Expecting POST but received ".$_SERVER["REQUEST_METHOD"] ;
        exit;
    }
}
