<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="css/reg.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<title>欢迎登录-NBA,足球赛事新闻，赛程，NBA竞彩推荐，足球竞猜推荐</title>
<meta name="keywords" content="极限数据网,NBA数据,足球数据,西甲,中超,意甲,德甲,詹姆斯,科比,韦德,比赛前瞻，实时伤病信息，科比，詹姆斯" />
<meta name="description" content="极限数据网，分享NBA各方面数据，足球数据，NBA实时伤病信息，CBA实时伤病，英超实时伤病。竞彩指南中心,NBA伤病指南,极数据给你最精准的数据分析" />
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">
</head>

<body>
<?php include "userhead.php";?>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>

<div class="reg-box">
	<div class="reg-warp">
    	<div class="reg-tit">
        	<h2>请登录</h2>
        </div>
        <div class="reg-par">
        	<ul>
            	<li>
                	<input type="text" value="" class="com_style inputC" placeholder="用户名" id="user_login" /><span>2-16位字母数字下划线</span>
                </li>
                <li>
                	<input type="password" value=""  class="com_style inputC" placeholder="您的密码" id="user_password" /><span>输入您的密码。</span>
                </li>
                <li class=""><input type="button" value="登录"  id="user_btn" />&nbsp;&nbsp;<a href="register.html"/>去注册</a>
                    <i id="addtip"></i>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>


<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
	<?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script>
/* 登录 */
$(function(){
    
    var oName=$("#user_login");
    
    var oPass=$("#user_password");
    var oBtn=$("#user_btn");    
    
    oBtn.on("click",function(){
        if(oName.val()=='' || oPass.val()==''){
            $('#addtip').html("请填写完整!");
            return false;
        };
        $.ajax({
            type:"POST",
            url:"web/Regadd.php",
            data:"act=login&login_name="+oName.val()+"&login_pass="+oPass.val(),
            success: function(data){
                console.log(data)
                var oData=eval('('+data+')');
                if(oData.error==1){
                    $('#addtip').html(oData.des);
                }else{
                    //alert(oData.des);
                    $('#addtip').html(oData.des);
                    setCookie('userid',oData.id,0);
                    setCookie('username',oData.name,0);
                    setTimeout(function(){
                        history.go(-1);//window.location.href="house";
                    },800);
                };
            }   
        }); 
    });
});
</script>
</body>
</html>
