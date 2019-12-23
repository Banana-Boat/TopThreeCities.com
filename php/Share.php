<?php
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "topthreecities";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // 设置 PDO 错误模式，用于抛出异常
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("insert into shareinfo values(null,'{$_POST["uname"]}',
                '{$_POST["cname1"]}','{$_POST["discription1"]}',0,
                '{$_POST["cname2"]}','{$_POST["discription2"]}',0,
                '{$_POST["cname3"]}','{$_POST["discription3"]}',0)");

    echo "<script>alert('分享成功！');location.href='../html/Places_page.html';</script>";
}   
catch(PDOException $e){
    echo "<script>alert('分享失败！');location.href='../html/Places_share.html';</script>";
}
?>