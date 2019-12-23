<?php
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "topthreecities";

$id=$_GET["id"];
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // 设置 PDO 错误模式，用于抛出异常
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $result = $conn->query("select * from shareinfo where id={$id}");
    if($result){
        $row = $result->fetch();
        $arr = array('uname'=>$row[1], 'cname1'=>$row[2], 'discription1'=>$row[3], 'likes1'=>$row[4],
                    'cname2'=>$row[5], 'discription2'=>$row[6], 'likes2'=>$row[7],
                    'cname3'=>$row[8], 'discription3'=>$row[9], 'likes3'=>$row[10]);
    }
    echo json_encode($arr);
}
catch(PDOException $e){
    echo $e->getMessage();
}
?>