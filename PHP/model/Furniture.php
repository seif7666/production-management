<?php 
namespace Model;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'FURNITURE')]
class Furniture{

    public static function getTableName()
    {
        return "FURNITURE";
    }
    public static function getClassName()
    {
        return "Model\Furniture";
    }


    #[ORM\Id]
    #[ORM\OneToOne(targetEntity: Product::class)]
    private Product $product;
    
    #[ORM\Column(type: 'float')]
    private float $length;
    #[ORM\Column(type: 'float')]
    private float $width;
    #[ORM\Column(type: 'float')]
    private float $height;

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

};


?>