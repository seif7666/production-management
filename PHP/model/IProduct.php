<?php
namespace Model;
interface IProduct{
    function create($post):string;
    function read();
    function checkValidity($object):string;
}
?>