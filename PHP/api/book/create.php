<?php
    require '../../vendor/autoload.php';
    // header('Access-Control-Allow-Origin: *');
    $log = new Monolog\Logger('name');
    $log->pushHandler(new Monolog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));
    $log->warning('Foo');
    // $connection= new DatabaseConnector();
