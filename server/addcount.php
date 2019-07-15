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
//每次点进去就有一次浏览
$count = $row['count'] + 1;

//修改数据
$sql_uq = "UPDATE web_nr SET count='".$count."' WHERE ID='".$id."'";
//发送
mysql_query($sql_uq);

?>