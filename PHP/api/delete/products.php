<?php
require_once "../../vendor/autoload.php";
require_once "../../src/bootstrap.php";
require_once "../../src/library.php";
use Model\Book;
use Model\Product;
use Model\DVD;
use Model\Furniture;
use Doctrine\ORM\Query\ResultSetMapping;


header('Access-Control-Allow-Origin: *');
checkPostRequest();
print_r($_POST["Ids"]);
if(empty($_POST['Ids'])){
    header("HTTP/1.1 400 Bad Request");
    echo "The key {Ids} was not found!";
    exit;
}
$ids=$_POST['Ids'];
foreach($ids as $id){
    $objects=[new Book(),new DVD(),new Furniture()];
    foreach($objects as $obj){
        $obj->setEntity($entityManager);
        $data=$obj->read($id);
        print_r($data);
        if(!is_null($data)){
            $obj->delete();
             break;
        }
    }
}