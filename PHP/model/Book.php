<?php 
namespace Model;

use Doctrine\ORM\Mapping as ORM;
use Exception;

#[ORM\Entity]
#[ORM\Table(name: 'BOOK')]
class Book implements IProduct{

    public static function getTableName()
    {
        return "BOOK";
    }
    public static function getClassName()
    {
        return "Model\Book";
    }

    #[ORM\Id]
    #[ORM\OneToOne(targetEntity: Product::class, cascade: ['ALL'])]
    private Product $product;
    
    #[ORM\Column(type: 'float')]
    private float $weight;

    private $entityManager;

    public function setEntity($entity){
        $this->entityManager= $entity;
    }

    public function getProduct():Product{
        return $this->product;
    }
    public function getWeight():float{
        return $this->weight;
    }
    public function setProduct(Product $product){
        $this->product= $product;
    }
    public function setWeight(float $weight){
        $this->weight= $weight;
    }

    function create($post):string{
        $message= $this->checkValidity($post);
        if(!empty($message)){
            echo "Wrong Format! ". $message;
            return "error";
        }
        $product= new Product();
        $product->setEntity($this->entityManager);
        try{
        $product->create($post);
        $this->setProduct($product);
        $this->entityManager->persist($this);
        $this->entityManager->flush();
        
        }catch(Exception $e){
            // $this->entityManager->flush();
            return "Message :\"".$e->getMessage()."\"";
        }
        return "";
    }
    function checkValidity($object):string{
        $message=(new Product())->checkValidity($object);
        if(!empty($message))
            return $message;
        if (empty($object['weight']))
            return "Expected weight key";
        $this->weight=floatval( $object['weight']);
        return "";
    }

    public function read( $id):mixed
    {
        // echo "ID is ".$id."\n";
        // print_r($id);
        $object=$this->entityManager->find($this->getClassName(),$id);
        if (is_null($object))
            return null;
        $arr= [];
        $arr['product']= $object->getProduct()->read($id);
        $arr['weight']= $object->getWeight();
        $this->product=$object->getProduct();
        $this->product->setEntity($this->entityManager);
        return $arr;        
    }
    function delete(){
        $entity = $this->entityManager->merge($this);  
        $this->entityManager->remove($entity); 
        $this->entityManager->flush();
        $this->getProduct()->delete();
    }
};
