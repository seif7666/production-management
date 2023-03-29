<?php
// bootstrap.php
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;

// require_once  "vendor/autoload.php";

// Create a simple "default" Doctrine ORM configuration for Attributes
$config = ORMSetup::createAttributeMetadataConfiguration(
    paths: array("model"),
    isDevMode: true,
);
// or if you prefer annotation, YAML or XML
// $config = ORMSetup::createAnnotationMetadataConfiguration(
//    paths: array(__DIR__."/src"),
//    isDevMode: true,
// );
// $config = ORMSetup::createXMLMetadataConfiguration(
//    paths: array(__DIR__."/config/xml"),
//    isDevMode: true,
//);
// $config = ORMSetup::createYAMLMetadataConfiguration(
//    paths: array(__DIR__."/config/yaml"),
//    isDevMode: true,
// );

// configuring the database connection
$connection = DriverManager::getConnection([
    'dbname' => 'PRODUCTION',
    'user' => 'producer',
    'password' => 'Producer1234?',
    'host' => 'localhost',
    'driver' => 'mysqli',
], $config);

// obtaining the entity manager
$entityManager = new EntityManager($connection, $config);
// echo "HERE";
// print_r(\Doctrine\DBAL\Types\Type::getTypesMap());