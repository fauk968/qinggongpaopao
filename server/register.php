<?php


header("content-type:text/html;charset=utf-8");

//统一转换编码，防止中文乱码
//mysql_query("set,names,utf8");

//获取上传的图片，并把路径存到$imgpath中
if ((($_FILES["headimg"]["type"] == "image/gif")
|| ($_FILES["headimg"]["type"] == "image/jpeg")
|| ($_FILES["headimg"]["type"] == "image/pjpeg")
|| ($_FILES["headimg"]["type"] == "image/png"))
&& ($_FILES["headimg"]["size"] < 2000000000000))
  {
  if ($_FILES["headimg"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["headimg"]["error"] . "<br />";
    }
  else
    {
//    echo "Upload: " . $_FILES["headimg"]["name"] . "<br />";
//    echo "Type: " . $_FILES["headimg"]["type"] . "<br />";
//    echo "Size: " . ($_FILES["headimg"]["size"] / 1024) . " Kb<br />";
//    echo "Temp file: " . $_FILES["headimg"]["tmp_name"] . "<br />";


      move_uploaded_file($_FILES["headimg"]["tmp_name"],
      "upload/" . iconv("UTF-8", "gbk",$_FILES["headimg"]["name"]));
      $imgpath = "server/" . "upload/" . $_FILES["headimg"]["name"];
      echo $imgpath;
    }
  }
else
  {
  $imgpath = null;
  }


	//获取用户在注册页面输入的信息
	$picture=$imgpath;
	$username=$_POST['username'];
	$password=$_POST['password'];
	$question=$_POST['question'];
	$answer=$_POST['answer'];


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
    //查询用户是否被注册过
    //写好查询语句
    $sqlstr="SELECT * FROM `yonghu` WHERE username='".$username."'";


	//发送查询语句，并返回一个值
	$result=mysql_query($sqlstr);
	//解析结果值
	$row=mysql_fetch_array($result);
	//判断用户是否注册过，有则返回注册
	if($row['username'])
	{
		//自动跳转到reg页面
        echo"<script language='javascript'>";
        echo	"alert('该用户已存在');";
        echo	"window.location.href='../index.html#login'";
        echo"</script>";
	}
	else
	{
		//写好插入语句
		$sqlinsert="insert into yonghu(picture,username,password,question,answer) values('".$picture."','".$username."','".$password."','".$question."','".$answer."')";
		echo $sqlinsert;
		//发送给数据库
		$insert=mysql_query($sqlinsert);

		//统一转换编码，防止中文乱码
		mysql_query("set,names,utf8");
		//怎样让用户知道是否注册过
		//发送查询命令，并返回一个结果
		$result1=mysql_query($sqlstr);
		//解析结果集
		$row1=mysql_fetch_array($result1);

        //判断用户是否注册成功
        if($row1['username'])
        {
            echo "<script language='javascript'>";
            echo "alert('恭喜你注册成功，点击“确定去登陆”');";
            echo "window.location.href='../index.html#login'";
            echo "</script>";
        }
        else
        {
            echo "注册失败";
        }
	}

?>