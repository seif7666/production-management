<?php 
namespace Model;

use Doctrine\ORM\Mapping as ORM;
use Exception;

#[ORM\Entity]
#[ORM\Table(name: 'DVD')]
class DVD implements IProduct{


    public static function getTableName()
    {
        return "DVD";
    }
    public static function getClassName()
    {
        return "Model\DVD";
    }

    private $entityManager;

    public function setEntity($entity){
        $this->entityManager= $entity;
    }


    #[ORM\Id]
    #[ORM\OneToOne(targetEntity: Product::class)]
    private Product $product;
    
    #[ORM\Column(type: 'float')]
    private float $size;

    public function getProduct():Product{
        return $this->product;
    }
    public function getSize():float{
        return $this->size;
    }
    public function setProduct(Product $product){
        $this->product= $product;
    }
    public function setWeight(float $size){
        $this->size= $size;
    }

    public function create($post):string{
        $message= $this->checkValidity($post);
        if(!empty($message)){
            return "Wrong Format! ". $message;
        }
        $product= new Product();
        $product->setEntity($this->entityManager);
        try{
        $product->create($post);
        $this->setProduct($product);
        $this->entityManager->persist($this);
        $this->entityManager->flush();
        }catch(Exception $e){
            return "Message :\"".$e->getMessage()."\"";
        }
        return "";
    }
    public function checkValidity($object): string{
        $message=(new Product())->checkValidity($object);
        if(!empty($message))
            return $message;
        if (empty($object['size']))
            return "Expected size key";
        $this->size=floatval( $object['size']);
        return "";
    }
    public function read($id):mixed
    {
        $object=$this->entityManager->find($this->getClassName(),$id);
        if (is_null($object))
            return null;
        $arr= [];
        $arr['product']= $object->getProduct()->read($id);
        $arr['size']= $object->getSize();
        return $arr;  
    }

};


?>