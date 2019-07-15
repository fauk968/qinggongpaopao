<?php
// 开启session
session_start();

if ($_GET['username'] == '' || $_GET['username'] == null) {
    $username=$_SESSION['username'];
} else {
    $username=$_GET['username'];
}



// //连接数据库服务器
$conn=mysql_connect("127.0.0.1","root","00000000");
if(!$conn){
	echo "连接数据库失败";
}


//选择数据库
mysql_select_db("ppweb",$conn);


//写好查询语句
$sqlstr="SELECT * FROM `yonghu` WHERE username='".$username."'";
//发送sql查询命令
$result=mysql_query($sqlstr);
//解析结果集
$row=mysql_fetch_array($result);



echo '{
    "id":"'.$row["ID"].'",
    "username":"'.$row["username"].'",
    "sex":"'.$row["sex"].'",
    "age":"'.$row["age"].'",
    "idiograph":"'.$row["idiograph"].'",
    "phone":"'.$row["phone"].'",
    "email":"'.$row["email"].'",
    "picture":"'.$row["picture"].'",
    "question":"'.$row["question"].'",
    "answer":"'.$row["answer"].'"
}';



?>

