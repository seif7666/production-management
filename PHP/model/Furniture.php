<?php 
namespace Model;

use Doctrine\ORM\Mapping as ORM;
use Exception;

#[ORM\Entity]
#[ORM\Table(name: 'FURNITURE')]
class Furniture implements IProduct{

    public static function getTableName()
    {
        return "FURNITURE";
    }
    public static function getClassName()
    {
        return "Model\Furniture";
    }


    #[ORM\Id]
    #[ORM\OneToOne(targetEntity: Product::class,  cascade: ['ALL'])]
    private Product $product;
    
    #[ORM\Column(type: 'float')]
    private float $length;
    #[ORM\Column(type: 'float')]
    private float $width;
    #[ORM\Column(type: 'float')]
    private float $height;

    private $entityManager;

    public function setEntity($entity){
        $this->entityManager= $entity;
    }

    public function getProduct():Product{
        return $this->product;
    }
    public function getLength():float{
        return $this->length;
    }
    public function setLength(float $length){
        $this->length= $length;
    }
    public function getWidth():float{
        return $this->width;
    }
    public function setWidth(float $length){
        $this->width= $length;
    }
    public function getHeight():float{
        return $this->height;
    }
    public function setHeight(float $length){
        $this->height= $length;
    }
    public function setProduct(Product $product){
        $this->product= $product;
    }

    public function create($post): string{
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
    public function checkValidity($object): string
    {
        $message=(new Product())->checkValidity($object);
        if(!empty($message))
            return $message;
        if (empty($object['length']))
            return "Expected length key";
        $this->length=floatval( $object['length']);
        if (empty($object['width']))
            return "Expected width key";
        $this->width=floatval( $object['width']);
        if (empty($object['height']))
            return "Expected height key";
        $this->height=floatval( $object['height']);
        return "";
    }
    private function checkPresenceAndUpdate($object,$name,$value):bool{
        if(empty($object[$name]))
            return false;
        $value=floatval($object[$name]);
        return true;
    }
    public function read( $id):mixed
    {
        $object=$this->entityManager->find($this->getClassName(),$id);
        if (is_null($object))
            return null;
        $arr= [];
        $arr['product']= $object->getProduct()->read($id);
        $arr['length']= $object->getLength();
        $arr['width']= $object->getWidth();
        $arr['height']= $object->getHeight();
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
