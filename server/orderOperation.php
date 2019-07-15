<?php
session_start();

$id = $_GET['id'];
$state=$_GET['state'];
$start=$_GET['start'];

$order=$_SESSION['username'];


// //连接数据库服务器
$conn=mysql_connect("127.0.0.1","root","00000000");
if(!$conn){
	echo "连接数据库失败";
}


//选择数据库
mysql_select_db("ppweb",$conn);


//查询状态语句
$state_str="SELECT * FROM `web_nr` WHERE ID='".$id."'";


//发送sql查询命令
$start_result=mysql_query($state_str);

//解析结果集
$start_row=mysql_fetch_array($start_result);


if($start_row['state'] != $start){
    echo "0";
} else if ($start_row['username'] == $order) {
     //修改数据
        $sqlstr = "UPDATE web_nr SET `state`='".$state."'  WHERE ID='".$id."'";
        //发送sql修改命令
        $result=mysql_query($sqlstr);



        //再次发送sql查询命令
        $state_result=mysql_query($state_str);

        //解析结果集
        $row=mysql_fetch_array($state_result);


        if($row['state'] == $state){
            echo 1;
        } else {
            echo 0;
        }
}





?>