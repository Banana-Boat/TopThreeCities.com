$("Common_head").load("../html/Common_header.html");
$("header").load("../html/Common_header.html");
$("footer").load("../html/Common_footer.html");
/////////////////////////////////////////////////////////////////////////////////////////////////
//定义全局变量城市名
var cname1, cname2, cname3;
var is_liked1 = false;
var is_liked2 = false;
var is_liked3 = false;
//////////////////////////////////////////////////////////////////////////////////////////////////
//请求数据
window.onload = function(){
    $.ajax({
        url : "http://172.20.10.11:90/php/GetShareInfo.php?id=" + GetQueryString("id"),
        dataType : "json",//数据格式
        type : "get",//请求方式
        success : function(data) {   //如果请求成功，返回数据。
            $("#title").text(data.uname + "'s Top Three Cities");
            $("#cname1").text(data.cname1);
            $("#discription1").text(data.discription1);
            $("#discription1").prepend("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
            $("#likes_p1").text("赞[" + data.likes1 + "]");
            $("#cname2").text(data.cname2);
            $("#discription2").text(data.discription2);
            $("#discription2").prepend("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
            $("#likes_p2").text("赞[" + data.likes2 + "]");
            $("#cname3").text(data.cname3);
            $("#discription3").text(data.discription3);
            $("#discription3").prepend("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
            $("#likes_p3").text("赞[" + data.likes3 + "]");

            cname1 = data.cname1;
            cname2 = data.cname2;
            cname3 = data.cname3;
            Map_s(cname1, "m1", "panel1");
            Map_s(cname2, "m2", "panel2");
            Map_s(cname3, "m3", "panel3");
            Weather_s(cname1, "w1");
            Weather_s(cname2, "w2");
            Weather_s(cname3, "w3");
            distance_s(cname1, "d1", "btn1");
            distance_s(cname2, "d2", "btn2");
            distance_s(cname3, "d3", "btn3");
            like("1", is_liked1);
            like("2", is_liked2);
            like("3", is_liked3);
        }
    })
};
//////////////////////////////////////////////////////////////////////////////////////////////////
//用户定位 
var p_user;                   //存放当前用户的定位
var is_geo_success = false;   //定位成功则为True
var map = new AMap.Map('geo_map', {
    resizeEnable: true
});

AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：5s
        buttonPosition: 'RB',    //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {  //若定位成功，创建map并输出省市区
            document.getElementById('geo_img').src="../image/gps.ico";
            document.getElementById('is_getpos').innerHTML = '定位成功';
            p_user = result.position;
            is_geo_success = true;
            document.getElementById('result').innerHTML = 
                    '当前位置：<br>' + 
                    result.addressComponent.province + " " + result.addressComponent.city + " " + result.addressComponent.district;
        } else {                    //若定位不成功，输出提示
            document.getElementById('geo_img').src="../image/alert.ico";
            document.getElementById('is_getpos').innerHTML = '定位失败';
        }
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////
//设置全局变量是否显示侧边栏
var is_show = false;
//点击图表显示详细位置信息
function show_geo(){
    if(!is_show){
        document.getElementById("is_getpos").style.display = "block";
        document.getElementById("geo_map").style.display = "block";
        document.getElementById("result").style.display = "block";
        is_show = true;
    }else{
        document.getElementById("is_getpos").style.display = "none";
        document.getElementById("geo_map").style.display = "none";
        document.getElementById("result").style.display = "none";
        is_show = false;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
//地区搜索并显示定位地图
//定义搜索地图类
function Map_s(name, num, panel) {
    var map = new AMap.Map(num, {
        resizeEnable: true
    });
    AMap.service(["AMap.PlaceSearch"], function () {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
            type: "风景名胜|餐饮服务|政府机构及社会团体|科教文化服务",
            pageSize: 4, // 单页显示结果条数
            pageIndex: 1, // 页码
            citylimit: false,  //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: panel, // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(name);
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////
//显示地区实时天气
function Weather_s(cname, text_id) {
    AMap.plugin('AMap.Weather', function () {
        var weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市
        weather.getLive(cname, function (err, data) {
            if (!err) {
                document.getElementById(text_id).innerHTML =
                    "实时天气: " + data.weather + " " + data.temperature + "℃";
            }
        });
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////
//计算城市中心位置与用户当前定位的距离
function distance_s(cname, text_id, btn_id) {
    AMap.plugin('AMap.DistrictSearch', function () {
        var district_s = new AMap.DistrictSearch();
        district_s.search(cname, function (status, result) {
            if (status == 'complete') {            //城市搜索成功
                var btn = document.getElementById(btn_id);
                btn.onclick = function () {
                    if (is_geo_success == true) {      //用户自身定位成功
                        var distance = Math.trunc(AMap.GeometryUtil.distance(result.districtList[0].center, p_user) / 1000);
                        document.getElementById(text_id).innerHTML = "城市中心距离你 " + distance + "千米";
                    }   
                    else {
                        alert("请在定位成功之后再次尝试！");
                    }
                }  
            }
        });
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//点赞效果
function like(likes_id, is_liked){
    $("#likes" + likes_id).click(function(){
        if(!is_liked){
            $.ajax({
                url : "http://172.20.10.11:90/php/Like.php?id=" + GetQueryString("id") + "&likes_id=" + likes_id,
                type : "get",
                dataType : "text",
                success : function(data){
                    $("#likes_p" + likes_id).text("赞[" + data + "]");
                    is_liked = true;
                }
            })
        }
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Gittalk
var gitalk = new Gitalk({
    // gitalk的主要参数
        clientID: 'a226d7b4d1b82eadd2b4',
        clientSecret: 'a93efeeff98749b718332164ad6ff04fb9982521',
        repo: 'TopThreeCities',
        owner: 'Banana-Boat',
        admin: ['Banana-Boat'],
        id: decodeURI(window.location.pathname),
        //在生成issue的标签label的时候 id:window.location.pathname时可能会根据编码不同而导致实际id超出50个字符，就会报错404
        distractionFreeMode: false,
        perPage: 8
});
gitalk.render('gitalk-container');


//获取地址栏参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if(r!=null)return  unescape(r[2]); return null;
}
