<?php
// 开启session
session_start();


if ($_POST['username'] == '' || $_POST['username'] == null) {
    $username=$_SESSION['username'];
} else {
    $username=$_POST['username'];
}
$question=$_POST['question'];
$answer=$_POST['answer'];


// //连接数据库服务器
$conn=mysql_connect("127.0.0.1","root","00000000");
if(!$conn){
	echo "连接数据库失败";
}


//选择数据库
mysql_select_db("ppweb",$conn);


//写好查询语句
$sqlstr="SELECT * FROM `yonghu` WHERE username='".$username."' and question='".$question."'";
//发送sql查询命令
$result=mysql_query($sqlstr);
//解析结果集
$row=mysql_fetch_array($result);

if($answer == $row['answer']) {
    echo '1';
} else {
    echo '0';
}



?>

