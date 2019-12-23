<?php
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "topthreecities";

$id = $_GET["id"];
$likes_id = $_GET["likes_id"];
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // 设置 PDO 错误模式，用于抛出异常
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("update shareinfo set likes{$likes_id}=likes{$likes_id}+1 where id={$id}");
    $result = $conn->query("select likes{$likes_id} from shareinfo where id={$id}");
    $row = $result->fetch();

    echo $row[0];
}   
catch(PDOException $e){
    echo $e->getMessage();
}
?>