<?php


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
    $sqlstr="select * from web_nr where state=0 order by id desc limit 0,10";

//    发送并解析成json格式
    $result=mysql_query($sqlstr);
    if(!$result){
        printf("Error: %s\n", mysqli_error($con));
        exit();

    }
      $jar= array();
      while($row=mysql_fetch_array($result,MYSQLI_ASSOC)){
          $count=count($row);
          for($i=0;$i<$count;$i++){
             unset($row[$i]);
          }
         array_push($jar,$row);
      }


//      输出
    echo '{
        "list":'.json_encode($jar, JSON_UNESCAPED_UNICODE).'
    }';

?>