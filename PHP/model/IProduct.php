<?php
namespace Model;
interface IProduct{
    function create($post):string;
    function read( $id):mixed;
    function checkValidity($object):string;
}
?>