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
checkGetRequest();
$query = $entityManager->createQuery('SELECT u.id FROM Model\Product u ');
$ids = $query->getResult();
$arr= [];
foreach($ids as $id){
    $objects=[new Book(),new DVD(),new Furniture()];
    foreach($objects as $obj){
        $obj->setEntity($entityManager);
        $data=$obj->read($id['id']);
        if(!is_null($data)){
            array_push($arr, $data);
            // print_r($arr);
             break;
        }
        // break;
    }
}

header("Content-Type: JSON");
echo json_encode($arr);