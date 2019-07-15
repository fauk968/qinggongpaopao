<?php
// 开启session
session_start();

//这个获取传进来的参数
$params = $_GET['params'];


if ($_SESSION[$params] == '' || $_SESSION[$params] == null) {
    echo "";
} else {
    echo $_SESSION[$params];
}



?>