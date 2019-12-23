<?php
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "topthreecities";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);  // 设置 PDO 错误模式，用于抛出异常
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $result = $conn->query("select * from shareinfo");
    $arr = array();  //定义数组存放所有结果
    if($result){
        while($row = $result->fetch()){
            $item = array($row[0], $row[1]);
            $arr[] = $item;
        }
    }
    echo json_encode($arr);
}
catch(PDOException $e){
    echo $e->getMessage();
}
?>