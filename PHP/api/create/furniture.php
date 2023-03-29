<?php
require_once "../../vendor/autoload.php";
require_once "../../src/bootstrap.php";
require_once "../../src/library.php";
use Model\Furniture;
header('Access-Control-Allow-Origin: *');
checkPostRequest();
$furn= new Furniture();
$furn->setEntity($entityManager);
$message=$furn->create($_POST);
if(!empty($message))
    header("HTTP/1.1 400 Bad Request");
echo $message;
?>