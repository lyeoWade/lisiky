
//ajax请求地址
//var requrl="http://jiaxiao.dev.$_.com/info/InfoServlet";

//选择器

function getEle(str, aParent) {
	var arr = str.match(/\S+/g);
	var aParent = aParent || [document];
	var aChild = [];
	for (var i = 0; i < arr.length; i++) {
		aChild = _getByStr(aParent, arr[i]);
		aParent = aChild;
	};
	return aChild;
};

function getByClass(oParent, sClass) {

	if (document.addEventListener) {
		return oParent.getElementsByClassName(sClass);
	};

	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b' + sClass + '\\b');
	var result = [];

	for (var i = 0; i < aEle.length; i++) {
		if (re.test(aEle[i].className)) {
			result.push(aEle[i]);
		}
	};

	return result;
};


function _getByStr(aParent, str) {
	var aChild = []; //结果

	for (var i = 0; i < aParent.length; i++) {
		switch (str.charAt(0)) {
			case '#':
				var obj = document.getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				var arr = getByClass(aParent[i], str.substring(1));

				for (var j = 0; j < arr.length; j++) {
					aChild.push(arr[j]);
				}
				break;
			default:
				//li.box
				if (/^\w+\.\w+$/.test(str)) {
					var aStr = str.split('.');
					var arr = aParent[i].getElementsByTagName(aStr[0]);
					var re = new RegExp('\\b' + aStr[1] + '\\b');

					for (var j = 0; j < arr.length; j++) {
						if (re.test(arr[j].className)) {
							aChild.push(arr[j]);
						};
					};
				}
				//li#li1
				else if (/^\w+#\w+$/.test(str)) {
					var aStr = str.split('#');
					var arr = aParent[i].getElementsByTagName(aStr[0]);

					for (var j = 0; j < arr.length; j++) {
						if (arr[j].id == aStr[1]) {
							aChild.push(arr[j]);
						}
					}
				}
				//input[type=bbxxx]
				else if (/^\w+\[\w+=.+\]$/.test(str)) {
					var aStr = str.split(/\[|=|\]/g);
					var arr = aParent[i].getElementsByTagName(aStr[0]);
					for (var j = 0; j < arr.length; j++) {
						if (arr[j].getAttribute(aStr[1]) == aStr[2]) {
							aChild.push(arr[j]);
						}
					}
				}
				//input:first	li:eq(12)
				else if (/^\w+:[a-z]+(\(.+\))?$/.test(str)) {
					var aStr = str.split(/:|\(|\)/g);
					var arr = aParent[i].getElementsByTagName(aStr[0]);
					switch (aStr[1]) {
						case 'eq':
							var n = parseInt(aStr[2]);

							aChild.push(arr[n]);
							break;
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'odd':
							for (var j = 1; j < arr.length; j += 2) {
								aChild.push(arr[j]);
							}
							break;
					}
				}

				//li
				else {
					var arr = aParent[i].getElementsByTagName(str);

					for (var j = 0; j < arr.length; j++) {
						aChild.push(arr[j]);
					}
				}
				break;
		}
	};
	return aChild;
};

function $$(arg) {
	var elements = [],
		bSelect;
	switch (typeof arg) {
		case 'function':
			$_.tool.ready(arg);
			break;
		case 'string':
			elements = $_.browser.ie678 ? getEle(arg) : document.querySelectorAll(arg);
			break;
		case 'object':
			if (arg instanceof Array) {
				elements = arg;
			} else {
				elements.push(arg);
			};
			break;
	};
	if (elements.length == 1) {
		return elements[0];
		if (bSelect == window.frameElement) $_.tool.ask();
	};
	return elements;
};


var $_={}



//工具类
$_.tool={};

//时间戳转换
$_.tool.DetailTimesTamp=function(time){
	var d = new Date(time);    //根据时间戳生成的时间对象
	var date = (d.getFullYear()) + "-" + $_.tool.toZero(d.getMonth() + 1) + "-" +$_.tool.toZero(d.getDate()) + " " + $_.tool.toZero(d.getHours()) + ":" + $_.tool.toZero(d.getMinutes()) + ":" + $_.tool.toZero(d.getSeconds());
	return date;
};

//补0
$_.tool.toZero=function(n){
	return n<10?n='0'+n:n;
};


//获取class
$_.tool.getByClass=function(oParent, sClass) {

	if (document.addEventListener) {
		return oParent.getElementsByClassName(sClass);
	};
	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b' + sClass + '\\b');
	var result = [];

	for (var i = 0; i < aEle.length; i++) {
		if (re.test(aEle[i].className)) {
			result.push(aEle[i]);
		}
	};
	return result;
};




$_.tool.geturldata=function(url){
	var urldata=url.split('?')[1].split('&');
	var result=[];
	var c=[];
	for(var i=0; i<urldata.length; i++){
		a=urldata[i].split('=');
		c+=result.concat('"'+urldata[i]+'",')
	};
	var laststr=c.replace(/=/g,'":"');//;
	var aaa='{'+laststr.substring(0,laststr.lastIndexOf(','))+'}';
	var obj=JSON.parse(aaa);

	if(obj.id){
		obj.id=parseInt(obj.id);
	}
	return obj;
};
//随机数
$_.tool.roundNum = function(s, b) {
	return parseInt(Math.random() * (b - s + 1) + s);
};
//随机颜色
$_.tool.roundColor = function() {
	var str = parseInt(Math.random() * 16777215).toString(16);
	if (str.length < 6) {
		str = '0' + str;
	}
	return str;
}
$_.tool.roundColor2 = function() {
	return (~~(Math.random() * (1 << 24))).toString(16); // ~~  相当于 parseInt
};

//事件绑定
$_.tool.addEvent = function(obj, sEv, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(sEv, fn, false);
	} else {
		obj.attachEvent('on' + sEv, function() {

			fn.call(obj, event);
		});
	}
};

$_.tool.removeEvent = function(obj, sEv, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(sEv, fn, false);
	} else {
		obj.detachEvent('on' + sEv, fn);
	}
};

$_.tool.wheel = function(obj, fn) {
	if (window.navigator.userAgent.indexOf('Firefox') != -1) {
		obj.addEventListener('DOMMouseScroll', wheelfn, false);
	} else {
		obj.onmousewheel = wheelfn;
	};

	function wheelfn(ev) {
		var oEvent = ev || event;
		//alert(oEvent.wheelDelta)
		//alert(oEvent.wheelDelta)// 上---->正  下-----> 负
		//alert(oEvent.detail); //火狐 上------>负 下---->正
		var dir = oEvent.wheelDelta ? oEvent.wheelDelta > 0 : oEvent.detail < 0;
		//alert(dir)  //true---->上  false ------>下
		fn && fn(dir);
		ev && ev.preventDefault();
		return false;
	};

};

// 监控文本框的内容长度
$_.tool.oninput = function(obj, fn) {

	if (document.getElementsByClassName) {
		if (window.navigator.userAgent.indexOf('MSIE 9') != -1) {
			obj.onfocus = function() {
				this.timer = setInterval(function() {
					fn && fn() //document.title=obj.value.length;
				}, 40)
			};
			obj.onblur = function() {
				clearInterval(this.timer);
			}
		} else {
			obj.oninput = function() {
				fn && fn();
			};
		}
	} else {
		obj.onpropertychange = function() {
			fn && fn(); //document.title=obj.value.length;
		};
	};
}



$_.tool.getStyle = function(obj, name) {

	return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
};



// 运动
$_.tool.move = function(obj, json, options) {
	options = options || {};
	options.time = options.time || 300;
	options.type = options.type || 'ease-out';

	var start = {};
	var dis = {};

	for (var name in json) {
		//left
		if (name == 'opacity') {
			start[name] = parseFloat($_.tool.getStyle(obj, name));
		} else if (name == 'scrollTop') {
			start[name] = document.body.scrollTop || document.documentElement.scrollTop;
		} else {
			start[name] = parseInt($_.tool.getStyle(obj, name));
			if (!start[name]) {
				switch (name) {
					case 'left':
						start[name] = obj.offsetLeft;
						break;
					case 'top':
						start[name] = obj.offsetTop;
						break;
					case 'width':
						start[name] = obj.offsetWidth;
						break;
					case 'height':
						start[name] = obj.offsetHeight;
						break;
				};
			};
		}
		dis[name] = json[name] - start[name];
	}

	var n = 0;
	var count = parseInt(options.time / 30);

	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		n++;

		for (var name in json) {
			switch (options.type) {
				case 'linear':
					var cur = start[name] + n * dis[name] / count;
					break;
				case 'ease-in':
					var a = n / count;
					var cur = start[name] + (a * a * a) * dis[name];
					break;
				case 'ease-out':
					var a = 1 - n / count;
					var cur = start[name] + (1 - a * a * a) * dis[name];
					break;
			}

			if (name == 'opacity') {
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
			} else if (name == 'scrollTop') {
				document.body.scrollTop = document.documentElement.scrollTop = cur;
			} else {

				obj.style[name] = cur + 'px';
			}
		}

		if (n == count) {
			clearInterval(obj.timer);

			options.end && options.end();
		}
	}, 30);
};
//碰撞检测
$_.tool.test = function(obj1, obj2) {
	var l1 = $_.tool.getPos(obj1).left;
	var r1 = l1 + obj1.offsetWidth;
	var t1 = $_.tool.getPos(obj1).top;
	var b1 = t1 + obj1.offsetHeight;

	var l2 = $_.tool.getPos(obj2).left;
	var r2 = l2 + obj2.offsetWidth;
	var t2 = $_.tool.getPos(obj2).top;
	var b2 = t2 + obj2.offsetHeight;

	if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) return false;
	return true;
};

//找位置
$_.tool.getPos = function(obj) {
	var l = 0,
		t = 0;
	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	};
	return {
		left: l,
		top: t
	};
};
  

$_.tool.toArray = function(obj) {
	return !obj.length ? [obj] : obj;
};
//
//function toArray(obj){
//	if(!obj.length){ //如果obj的长度为0 那么返回 一个数组 否则返回 自身
//	return [obj];
//	}else
//	{
//	return 	obj
//	}
//}

//找子集
$_.tool.isChild = function(obj, parent) {
	while (obj) {
		if (obj == parent) return true;
		obj = obj.parentNode;
	}
	return false;
}

// 去空格
$_.tool.ClearSpace = function(element) {
	for (var i = 0; i < element.childNodes.length; i++) {
		var node = element.childNodes[i];
		if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
			element.removeChild(node);
		}
	}
}

$_.tool.ready = function(fn) {
	if (document.getElementsByClassName) {
		document.addEventListener('DOMContentLoaded', fn, false);
	} else {
		document.attachEvent('onreadystatechange', function() {
			if (document.readyState == 'complete') {
				fn();
			}
		});
	}
};








/* 验证  正则匹配 */
$_.ver={}
$_.ver.init=function(arr,fn){
	for(var i=0; i<arr.length; i++){
		if(arr[i].obj.value==''){
			fn&&fn(arr[i].tag+"不能为空!");
			return false;
		 }else if(!$_.ver.moblie(arr[i].obj.value)){
		 	alert('---'+arr[i].obj.value)
		 	fn&&fn("请输入正确的"+arr[i].tag+"!");
		 	return false;
		 }else if(!$_.ver.password(arr[i].obj.value)){
		 	alert(arr[i].obj.value)
		 	fn&&fn("请输入正确的"+arr[i].tag+"!");
		 	return false;
		 }else{
		 	fn&&fn();
		 };
	};
}; 
$_.ver.empty=function(arr,fn){
	for(var i=0; i<arr.length; i++){
		if(arr[i].obj.value==''){
			fn&&fn(arr[i].tag+"不能为空!");
			return false;
		 }
	};
};
//0-99
$_.ver.numint=function(num){
	return /^(\d{1,2})$/.test(num);
};
//0-1000
$_.ver.num1000=function(num){
	return /^(\d{1,3}|1000)$/.test(num);
};
$_.ver.num=function(num){
	return /^\d+$/.test(num);
}

$_.ver.allnum=function(num){
	return /^(-)?\d+$/.test(num);
}

//中文名
$_.ver.chinese=function(str){
	return /^[\u4e00-\u9fa5]+$/.test(str);
};

$_.ver.moblie=function( value ){
    return /^1\d{10}$/.test( value );
}
$_.ver.password=function( value ){
    return /^[\w]{6,12}$/.test( value );
}
$_.ver.tel=function(value){
	return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);
}
$_.ver.email=function(value){
	return /^[a-z0-9][\w\.]*@[a-z0-9\-]+(\.[a-z]{2,4}){1,2}$/i.test(value);
}






//////////// 浏览器检测相关
$_.browser = {};
$_.browser.userAgent = window.navigator.userAgent.toLowerCase();
$_.browser.ie = !!document.all;
$_.browser.ie6 = !window.XMLHttpRequest;
$_.browser.ie678 = !document.getElementsByClassName;
$_.browser.ie9 = $_.browser.userAgent.indexOf('msie 9') != -1;
$_.browser.ie6789 = $_.browser.ie678 || $_.browser.ie9;
$_.browser.ie10 = $_.browser.userAgent.indexOf('msie 10') != -1;
$_.browser.ie11 = $_.browser.userAgent.indexOf('trident') != -1 && $_.browser.userAgent.indexOf('rv:11') != -1;
$_.browser.chrome = $_.browser.userAgent.indexOf('chrome') != -1;
$_.browser.ff = $_.browser.userAgent.indexOf('firefox') != -1;



/////////// css3 相关
$_.css3 = {};
$_.css3.setStyle = function(obj, name, value) {
	var aCss3 = ['transform', 'transition', 'borderRadius', 'boxShadow', 'textShadow'];

	var Name = name.charAt(0).toUpperCase() + name.substring(1);
	if (aCss3.indexOf(name) != -1) {
		obj.style['Webkit' + Name] = value;
		obj.style['Moz' + Name] = value;
		obj.style['ms' + Name] = value;
		obj.style['O' + Name] = value;
		obj.style[name] = value;
	} else {
		obj.style[name] = value;
	};
};
// css3 运动
$_.css3.move = function(obj, json, fnEnd) {
	function fnInnerEnd() {
		if (fnEnd) fnEnd(obj);

		obj.removeEventListener('webkitTransitionEnd', fnInnerEnd, false);
		obj.removeEventListener('transitionend', fnInnerEnd, false);
	}

	for (var i in json) {
		$_.css3.setStyle(obj, i, json[i]);
	};

	obj.addEventListener('webkitTransitionEnd', fnInnerEnd, false);
	obj.addEventListener('transitionend', fnInnerEnd, false);
};



function getName(){
	var SName=decodeURIComponent($_.tool.geturldata(window.location.href).name);
	if(SName.indexOf('#')!=-1){
		return SName.substring(0,SName.indexOf('#'));
	}else{
		return SName;
	}
};

$_.cookies={};
$_.cookies.getCookie=function(cookiename){
	var result;
	var mycookie = document.cookie;
	var start2 = mycookie.indexOf(cookiename + "=");
	if (start2 > -1) {
		start = mycookie.indexOf("=", start2) + 1;
		var end = mycookie.indexOf(";", start);

		if (end == -1) {
			end = mycookie.length;
		}
		result = unescape(mycookie.substring(start, end));
	}

	return result;
}
$_.cookies.setCookie=function(name, value, Hours){
	var oDate=new Date();
	var oh=oDate.getHours()+Hours;
	oDate.setHours(oh);
	//alert(oDate)
	document.cookie=name+'='+value+';expires='+oDate;
}
$_.cookies.removeCookie=function(name){
	$_.cookies.setCookie(name, 'undefined', -10);
}


//效果
$_.effect={};

//简单的分页  
/*
	allnum--->总条数
	pageSize->每一页多少条
	nowPage-->当前第几页
	fn------->执行函数,传参nowPage
*/
$_.effect.pagination=function(allnum,pageSize,nowPage,fn){
	nowPage=parseInt(nowPage);
	var nums=Math.ceil(allnum/pageSize);
	$allnum='<div class="pull-left"><span>共 '+allnum+' 条数据</span>&nbsp;&nbsp;&nbsp;<span>共'+nums+'页</span></div><ul id="page" class="pagination pagination-sm no-margin pull-right"></ul>';
	$('#pagination').html($allnum);
	
	var oPage=document.getElementById('page');
	//只显示5条

	if(nowPage>=4 && nums>=6){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="1">首页</a>';
		oPage.appendChild(oLi);
	}
	if(nowPage>=2){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+(nowPage-1)+'">上一页</a>';
		oPage.appendChild(oLi);	
	}
	if(nums<=5){
		for(var i=1; i<=nums; i++){
			var oLi=document.createElement('li');
			if(nowPage==i){
				oLi.className="active";
			}
			oLi.innerHTML+='<a pagenum="'+i+'">'+i+'</a>';
			oPage.appendChild(oLi);
		}
			
	}else{
		for(var i=1; i<=5; i++){
			var oLi=document.createElement('li');
			
			if(nowPage==1 || nowPage==2){
				oLi.innerHTML='<a pagenum="'+i+'">'+i+'</a>';
				if(nowPage==i){
					oLi.className="active";
				}
				else{
					oLi.className="";
				}
				
			}else if((nums - nowPage)==0 || (nums-nowPage)==1){// 倒数第一和第二 特殊处理
				
				oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				if( (nums - nowPage) ==0 && i==5){ //倒数第一项
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}else if((nums - nowPage) ==1 && i==4){ //倒数第二项
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}else{
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}
			}else{
				
				if(i==3){
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
				}else{
					oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
				}
				oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
			}
			oPage.appendChild(oLi);	
		}	
	}
	if((nums-nowPage)>=1){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+(nowPage+1)+'">下一页</a>';
		oPage.appendChild(oLi);
	}
	if((nums-nowPage)>=3){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+nums+'">尾页</a>';
		oPage.appendChild(oLi);
	}
					
	 var aLi=oPage.children;

	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			if(aLi[this.index].className=='active')return false;
			var aA=this.getElementsByTagName('a')[0];
			var oNum=aA.getAttribute('pagenum');
			fn&&fn(oNum);
		};
	};
};

$_.effect.selectNum=function (fn){
	$('#selectNum').on('change',function(){
		fn&&fn($(this).val());
	})
}

