<?php
require_once "../../vendor/autoload.php";
require_once "../../src/bootstrap.php";
require_once "../../src/library.php";
use Model\DVD;
header('Access-Control-Allow-Origin: *');
checkPostRequest();
$dvd= new DVD();
$dvd->setEntity($entityManager);
$message=$dvd->create($_POST);
if(!empty($message))
    header("HTTP/1.1 400 Bad Request");
echo $message;
?>