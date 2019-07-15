<?php
$id = $_GET['id'];
// //连接数据库服务器
$conn=mysql_connect("127.0.0.1","root","00000000");
if(!$conn){
	echo "连接数据库失败";
}


//选择数据库
mysql_select_db("ppweb",$conn);


//写好查询语句
$sqlstr="SELECT * FROM `web_nr` WHERE ID='".$id."'";
//发送sql查询命令
$result=mysql_query($sqlstr);
//解析结果集
$row=mysql_fetch_array($result);



echo '{
    "id":"'.$row["ID"].'",
    "username":"'.$row["username"].'",
    "web_mk":"'.$row["web_mk"].'",
    "title":"'.$row["title"].'",
    "content":"'.$row["content"].'",
    "count":"'.$row["count"].'",
    "time":"'.$row["time"].'",
    "phone":"'.$row["phone"].'",
    "photo":"'.$row["photo"].'"
}';



?>