window.onload = function(){
    $.ajax({
        url : "http://127.0.0.1:90/php/ShowUser.php",
        dataType : "json",//数据格式
        type : "get",//请求方式
        success : function(data) {   //如果请求成功，返回数据。
            for(var i = 0; i < data.length; i++){
                $(".users").find("ul").append("<li><a href='../html/Places_users.html?id=" + data[i][0] +
                                              "' class='userName'>▲ " + data[i][1] + "</a></li>");
            } 
        }
    })
}
$("Common_head").load("../html/Common_header.html");
$("header").load("../html/Common_header.html");
$("footer").load("../html/Common_footer.html");