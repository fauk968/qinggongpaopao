<?php
// 开启session
session_start();

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
      "upimg/" . iconv("UTF-8", "gbk",$_FILES["headimg"]["name"]));
      $imgpath = "server/" . "upimg/" . $_FILES["headimg"]["name"];
    }
  }
else
  {
  $imgpath = null;
  }

//  如果图片为空，则值为上一个图片
  if($imgpath == '' || $imgpath == null) {
    $imgpath = $_SESSION['picture'];
  }


	//获取用户在注册页面输入的信息
	$picture=$imgpath;
	$id=$_SESSION['ID'];
	$username=$_SESSION['username'];
	$new_username=$_POST['username'];
	$sex=$_POST['sex'];
	$age=$_POST['age'];
	$idiograph=$_POST['idiograph'];
	$phone=$_POST['phone'];
	$email=$_POST['email'];


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


//    写好修改语句
    $sql_up = "UPDATE yonghu SET username='".$new_username."', sex='".$sex."', age='".$age."', idiograph='".$idiograph."', phone='".$phone."', email='".$email."', picture='".$imgpath."' WHERE ID='".$id."'";
//    这里是改订单里的名字
    $sql_un1 = "UPDATE web_nr SET username='".$new_username."' where username='".$username."'";
    $sql_un2 = "UPDATE web_nr SET orderuser='".$new_username."' where `orderuser`='".$username."'";

////    发送给数据库
    mysql_query($sql_up);
    mysql_query($sql_un1);
    mysql_query($sql_un2);




//    将新头像丢到session
    $_SESSION['picture']=$imgpath;
    $_SESSION['username']=$new_username;


    echo "<script language='javascript'>";
    echo "window.location.href='../revampsuccess.html'";
    echo "</script>";


?>