<?php 
namespace Model;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'DVD')]
class DVD{


    public static function getTableName()
    {
        return "DVD";
    }
    public static function getClassName()
    {
        return "Model\DVD";
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

};


?>