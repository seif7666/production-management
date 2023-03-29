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
    #[ORM\OneToOne(targetEntity: Product::class)]
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

    function read(){
    }
};


?>