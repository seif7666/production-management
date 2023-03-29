<?php

namespace Model;

use Doctrine\ORM\Mapping as ORM;
use Exception;

#[ORM\Entity]
#[ORM\Table(name: 'PRODUCT')]
class Product implements IProduct{
    public static function getTableName()
    {
        return "PRODUCT";
    }
    public static function getClassName()
    {
        return "Model\Product";
    }

    #[ORM\Id]
    #[ORM\Column(type: 'string')]
    private string $id;
    #[ORM\Column(type: 'string')]
    private string $name;
    #[ORM\Column(type: 'float')]
    private float $price;


    private $entityManager;

    public function setEntity($entity){
        $this->entityManager= $entity;
    }

    public function getId(): string
    {
        return $this->id;
    }
    public function getName(): string
    {
        return $this->name;
    }
    public function getPrice(): string
    {
        return $this->price;
    }

    public function setId(string $sku)
    {
        $this->id = $sku;
    }
    public function setName(string $name)
    {
        $this->name = $name;
    }
    public function setPrice(float $price)
    {
        $this->price = $price;
    }

    function create($post):string{
        $this->setId($post["SKU"]);
        $this->setPrice($post["price"]);
        $this->setName($post["name"]);
        $product = $this->entityManager->find($this->getClassName(), $this->id);
        if(is_null($product)){
            $this->entityManager->persist($this);
            $this->entityManager->flush();
            return "";
        }
        throw new Exception("Duplicate Key!");
    }
    function checkValidity($object):string{
        $arr= ["SKU","name","price"];
        foreach($arr as $key){
            if(empty($object[$key]))
                return $key." not Found!";
        }
        return "";
    }

    public function read($id):mixed
    {
        $arr=[];
        $arr['SKU']= $this->id;
        $arr['name']= $this->name;
        $arr['price']= $this->price;
        return $arr;        
    }
}
