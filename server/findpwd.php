<?php


header("content-type:text/html;charset=utf-8");

//统一转换编码，防止中文乱码
//mysql_query("set,names,utf8");


	//获取用户在注册页面输入的信息
	$username=$_POST['username'];
	$password=$_POST['password'];


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
    $sql_up = "UPDATE yonghu SET password='".$password."' WHERE username='".$username."'";

////    发送给数据库
    mysql_query($sql_up);





    echo "<script language='javascript'>";
    echo "window.location.href='../findpwdsuccess.html'";
    echo "</script>";


?>