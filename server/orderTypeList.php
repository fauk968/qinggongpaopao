
<?php
session_start();

//通过点击翻页，获取当前的页码数
if ($_GET['page']==null||$_GET['page']=='')
{
	$page = 1;	
}
else 
{
	$page = $_GET['page'];	
}

$type=$_GET['type'];
$username=$_SESSION['username'];

//连接数据库服务器
$con = mysql_connect("127.0.0.1","root","00000000");
//设置数据的编码格式
mysql_query("set names 'utf8'");
//选择数据库
mysql_select_db("ppweb",$con);
//写好查询语句
$sqlstr="SELECT * FROM `web_nr`";
//发送查询语句
$result=mysql_query($sqlstr);
//获取表中数据的总行数
$totalrows=mysql_num_rows($result);
//计算出表中的页数
$totalpage=ceil($totalrows/10);

//限制翻页超过最后一页
if ($page>$totalpage)
{
	$page=$totalpage;
}
//限制翻页超过第一页
if ($page<1)
{
	$page=1;
}

//计算出每一页的数据起始位置
$start = ($page-1)*10;

//写好分页的查询语句
$sqlstr_page="SELECT * FROM `web_nr` WHERE ".$type."='".$username."' order BY ID desc LIMIT ".$start.", 10";
//echo $sqlstr_page;
//发送分页查询语句


$result_page=mysql_query($sqlstr_page);
if(!$result_page){
    printf("Error: %s\n", mysqli_error($con));
    exit();

}
  $jar= array();
  while($row_page=mysql_fetch_array($result_page,MYSQLI_ASSOC)){
      $count=count($row_page);
      for($i=0;$i<$count;$i++){
         unset($row_page[$i]);
      }
     array_push($jar,$row_page);
  }






echo '{
    "total": "'.count($jar).'",
    "username": "'.$username.'",
    "list": '.json_encode($jar, JSON_UNESCAPED_UNICODE).'
}'

?>
