<?php
// 开启session
session_start();

header("content-type:text/html;charset=utf-8");

//统一转换编码，防止中文乱码
//mysql_query("set,names,utf8");

//获取上传的图片，并把路径存到$imgpath中
if ((($_FILES["img"]["type"] == "image/gif")
|| ($_FILES["img"]["type"] == "image/jpeg")
|| ($_FILES["img"]["type"] == "image/pjpeg")
|| ($_FILES["img"]["type"] == "image/png"))
&& ($_FILES["img"]["size"] < 2000000000000))
  {
  if ($_FILES["img"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["img"]["error"] . "<br />";
    }
  else
    {


      move_uploaded_file($_FILES["img"]["tmp_name"],
      "issueimg/" . iconv("UTF-8", "gbk",$_FILES["img"]["name"]));
      $imgpath = "server/" . "issueimg/" . $_FILES["img"]["name"];
    }
  }
else
  {
  $imgpath = null;
  }


	//获取用户在注册页面输入的信息
	$username=$_SESSION['username'];
	$title=$_POST['title'];
	$phone=$_POST['tel'];
	$photo=$imgpath;
	$classify=$_POST['classify'];
	$content=$_POST['content'];

	//获取时间和日期
	date_default_timezone_set("Asia/Shanghai");
	$date = date("Y-m-d");
	$time = date("H:i");


	//连接数据库
    $conn=mysql_connect("127.0.0.1","root","00000000");

    //统一转换编码，防止中文乱码
    mysql_query("set,names,utf8");

    if(!$conn)
    {
        echo "连接数据库失败";
    }

    //选择数据库
    mysql_select_db("ppweb",$conn);


    //写好插入语句
    $sqlinsert="insert into web_nr(photo,username,title,phone,web_mk,content,date,time)
    values('".$photo."','".$username."','".$title."','".$phone."','".$classify."','".$content."','".$date."','".$time."')";
    //发送给数据库
    $insert=mysql_query($sqlinsert);


    //判断是否发送成功
    //写好查询语句
    $sqlstr="SELECT * FROM `web_nr` WHERE content='".$content."'";
    echo $sqlstr;
    //发送查询命令，并返回一个结果
    $result1=mysql_query($sqlstr);
    //解析结果集
    $row1=mysql_fetch_array($result1);

//    判断用户是否注发布成功
    if($row1['content'])
    {
        echo "<script language='javascript'>";
        echo "window.location.href='../issuesuccess.html'";
        echo "</script>";
    }
    else
    {
        echo "发布失败";
    }

?>