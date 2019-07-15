<?php
// 开启session
session_start();


$username=$_POST['username'];
$password=$_POST['password'];


// //连接数据库服务器
$conn=mysql_connect("127.0.0.1","root","00000000");
if(!$conn){
	echo "连接数据库失败";
}


//选择数据库
mysql_select_db("ppweb",$conn);


//写好查询语句
$sqlstr="SELECT * FROM `yonghu` WHERE username='".$username."' and password='".$password."'";
//发送sql查询命令
$result=mysql_query($sqlstr);
//解析结果集
$row=mysql_fetch_array($result);


if ($row["username"] == null || $row["username"] == "") {
	echo "0";
} else {
	echo "1";

//    保存到session
    $_SESSION['username'] = $username;

    $_SESSION['picture'] = $row["picture"];

    $_SESSION['ID'] = $row["ID"];

}

?>

