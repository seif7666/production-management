<?php
require_once "../../vendor/autoload.php";
require_once "../../src/bootstrap.php";
require_once "../../src/library.php";
use Model\Book;
header('Access-Control-Allow-Origin: *');
checkPostRequest();
$book= new Book();
$book->setEntity($entityManager);
$message=$book->create($_POST);
if(!empty($message))
    header("HTTP/1.1 400 Bad Request");
echo $message;
?>