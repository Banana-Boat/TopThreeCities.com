# TopThreeCities.com 项目说明：
此项目是一个能够分享自己最喜欢三个城市的博客分享网站。主要的风格是简单轻型易用。以下是网站的页面功能以及特点介绍：\
1.网站每张页面的页眉、页脚、导航栏内容都基本相同，故采用的是母版页的思想，把公共内容做成模板，然后使用jquery的load函数在每个页面动态生成。  
2.主页内容比较简单，主要是用到一个bilibili的iframe框架，可以直接播放视频。页面上的链接将用户引导到用户浏览页面。  
3.用户浏览页面通过请求接口返回所有用户的列表，每个用户生成对应的链接，url的末尾附上用户id的字符串变量。  
4.点击链接，跳转到用户展示页面，该页面也是采用母版页的思想，取出url中的id，请求接口返回相应id号的json数据，解析之后将用户的分享信息展现在页面中。用户展示页面是整个网站的主体部分，主要的功能是依据高德地图提供的api实现的。每个城市的内容包括城市名、市区地图、周边景点美食地标链接、实时天气、与当前位置的距离信息以及点赞数（点赞功能也还是通过后端实现）。当前定位窗始终停靠悬浮在右上角，只有当定位成功时才能显示距离信息。页面的末尾嵌入gittalk评论api，游客可以直接浏览评论信息，登录github帐号之后用户可以进行评论。  
5.分享页面游客用户无需登录，直接选择城市，填写相关信息即可进行分享，将表单数据发送给后台之后弹窗提示即完成录入。  
6.另外，网页布局利用了css媒体查询对整个网站做了响应式布局，使得网站能够在不同屏幕尺寸的设备中较好显示。
