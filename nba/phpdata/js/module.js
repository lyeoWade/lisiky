//导航

var module = {};
module.nav = {};
module.nav.data = function() {

	var oNav = document.getElementById('nav');

	oNav.innerHTML = '<ul class="nav nav-list" ><li class=""><a href="usercenters.html"><i class="icon-dashboard"></i><span class="menu-text"> 控制台 </span></a></li>\
	    <li class=""><a href="javascript:;" class="dropdown-toggle">\
			<i class="icon-book"></i><span class="menu-text">文章管理</span>\
			<b class="arrow icon-angle-down"></b></a>\
		<ul class="submenu">\
			<li class=""><a href="add_arclist.html"><i class="icon-double-angle-right"></i>发布文章</a></li>\
			<li class=""><a href="arclist.html"><i class="icon-double-angle-right"></i>文章列表</a></li>\
			<li class=""><a href="conment.html"><i class="icon-exclamation-sign"></i>评论管理</a></li></ul></li>\
	   <li class=""><a href="javascript:;" class="dropdown-toggle">\
			<i class="icon-play-circle"></i><span class="menu-text">极限直播</span>\
			<b class="arrow icon-angle-down"></b></a>\
		<ul class="submenu">\
			<li class=""><a href="backOnlineAdd.html"><i class="icon-double-angle-right"></i>新增直播</a></li>\
			<li class=""><a href="backOnlineList.html"><i class="icon-double-angle-right"></i>直播列表</a></li>\
			<li class=""><a href="videoAdd.html"><i class="icon-double-angle-right"></i>新增视频</a></li>\
			<li class=""><a href="videoList.html"><i class="icon-double-angle-right"></i>视频列表</a></li>\
		</ul>\
	   </li>\
		<li class=""><a href="javascript:;" class="dropdown-toggle">\
				<i class="icon-circle"></i><span class="menu-text">足球管理 </span>\
				<b class="arrow icon-angle-down"></b></a>\
			<ul class="submenu">\
				<li class=""><a href="football_team.html"><i class="icon-double-angle-right"></i>足球</a></li>\
				<li class=""><a href="jifen_add.html"><i class="icon-double-angle-right"></i>新增足球积分</a></li>\
				<li class=""><a href="jifen.html"><i class="icon-double-angle-right"></i>足球积分列表</a></li>\
			</ul>\
		</li>\
	    <li class="">\
		    <a href="javascript:;" class="dropdown-toggle"><i class="icon-globe"></i><span class="">篮球管理 </span> \
		    <b class="arrow icon-angle-down"></b></a>\
		    <ul class="submenu">\
			   <li><a href="basketball_team.html"><i class="icon-double-angle-right"></i>篮球</a></li>\
			   <li><a href="basketball_agena.html"><i class="icon-double-angle-right"></i>新增赛程-赛程</a></li>\
			   <li><a href="basketball_agena_list.html"><i class="icon-double-angle-right"></i>赛程列表</a></li>\
			   <li><a href="updatescore.html"><i class="icon-double-angle-right"></i>比分更新</a></li>\
			   <li><a href="Injuries_add.html"><i class="icon-double-angle-right"></i>新增伤病信息</a></li>\
			   <li><a href="B_first.html"><i class="icon-double-angle-right"></i>首发名单</a></li>\
			   <li><a href="updaterank.html"><i class="icon-double-angle-right"></i>更新榜单</a></li>\
		    </ul>\
	    </li>\
	  <li><a href="#" class="dropdown-toggle" ><i class="icon-cog"></i><span class="menu-text">功能</span> <b class="arrow icon-angle-down"></b></a>\
		<ul class="submenu">\
		   <li><a href="link.html">推广链接</a></li>\
		   <li><a href="seo.html">seo</a></li>\
		</ul></li>\
		<li class=""><a href="contact.html"><i class="icon-tablet"></i>联系我们</a></li>\
		<li class=""><a href="othersetting.html"><i class="icon-asterisk"></i>其他设置</a></li>\
	    <li class=""><a href="../index.html" target="_blank"><i class="icon-home"></i>前台首页</a></li></ul>';
}


$(function() {
	$.ajax({
		type: "POST",
		url: "datapage/usercenters.php",
		success: function(data) {
			var cbdata = eval('(' + data + ')');
			//alert(cbdata)
			if (cbdata.error == 1) {
				alert(cbdata.des);
				window.location.href = "login.html";
			} else {
				$('.light-blue').html('<a data-toggle="dropdown" href="#" class="dropdown-toggle">\
				<img class="nav-user-photo" src="assets/avatars/user.jpg" alt="" />\
				<span class="user-info"><small>欢迎光临,</small>' + cbdata.des + '</span><i class="icon-caret-down"></i></a>\
				<ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">\
				<li><a href="#"><i class="icon-cog"></i>设置</a></li>\
				<li><a href="#"><i class="icon-user"></i>个人资料</a></li>\
				<li class="divider"></li>\
				<li><a href="#" id="out"><i class="icon-off"></i>退出</a></li></ul>');
				//退出  删除session 回到前台首页
				out($('#out'));
			}
			//console.log(data);
		}
	});

	function out(obj) {
		obj.on('click', function() {
			$.ajax({
				type: "POST",
				url: "datapage/out.php",
				success: function(data) {
					var cbdata = eval('(' + data + ')');
					if (cbdata.error == 0) {
						alert(cbdata.des);
						window.location.href = "login.html";
					}
				}
			});

		});
	}
});
// 拼json
function CreateJson(str) {
	var d = str.split(',');
	var rStr = '';
	for (var i = 0; i < d.length; i++) {
		rStr += '"' + d[i].split(':', '1')[0] + '"' + ':' + '"' + d[i].split(':', '2')[1] + '",';
	}
	var s = '{' + rStr.substring(0, rStr.length - 1) + '}'
	return s;
}

function geturldata(url) {
	var urldata = url.split('?')[1].split('&');
	var result = [];
	var c = [];
	for (var i = 0; i < urldata.length; i++) {
		a = urldata[i].split('=');
		c += result.concat('"' + urldata[i] + '",')
	};
	var laststr = c.replace(/=/g, '":"'); //;
	var aaa = '{' + laststr.substring(0, laststr.lastIndexOf(',')) + '}';
	return JSON.parse(aaa);
};

function Delete(type, url, fn) {
	var oBtn = $('.handle a:contains("删除")');
	oBtn.on("click", function() {
		if (confirm("你确定要删除本条数据？")) {
			var oId = $(this).attr("tagid"); //这个id必须有 删除的type必须是deletes
			$.ajax({
				url: url,
				data: "type=" + type + "&id=" + oId,
				type: "POST",
				success: function(data) {
					console.log(data);
					var json = eval('(' + data + ')');
					if (json.code == 0) {
						alert(json.msg);
						fn && fn();
					} else {
						alert(json.msg)
					};
				},
				error: function() {

				}
			});
		};
	});
}

function toZero(n) {
	return n < 10 ? '0' + n : n;
}

function setCookie(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);

	document.cookie = name + '=' + value + ';expires=' + oDate;
}

function getCookie(name) {
	var arr = document.cookie.split('; ');

	var re = new RegExp('\\b' + name + '=\\w+');

	var res = document.cookie.match(re);

	if (res) {
		return res[0].split('=')[1];
	} else {
		return '';
	}
}

function removeCookie(name) {
	setCookie(name, '1', -1);
}