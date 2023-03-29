<?php

use Model\Product;
    require_once "model/Product.php";
    require_once "src/bootstrap.php";
    // use Model\Product;
    // $product= new Product();
    // $product->setSKU('key');
    // $product->setName('Seif');
    // $product->setPrice(15.52);

    // $entityManager->persist($product);
    // $entityManager->flush();

    $productRepository = $entityManager->getRepository(Product::getClassName());
    $products = $productRepository->findAll();
    print_r($products);
?>