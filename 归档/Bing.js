/*

// 选择器
// 工具/方法
// 实例

*/
/*
url 解析
var url='www.baidu.com?id=1&data=error&tel=18723032440&name=wade&age=25';
alert(geturldata(url).name);
function geturldata(url){
	var urldata=url.split('?')[1].split('&');
	var result=[];
	var c=[];
	for(var i=0; i<urldata.length; i++){
		a=urldata[i].split('=');
		c+=result.concat('"'+urldata[i]+'",')
	};
	var laststr=c.replace(/=/g,'":"');//;
	var aaa='{'+laststr.substring(0,laststr.lastIndexOf(','))+'}';
	return JSON.parse(aaa);
}
*/

function setCookie(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);

	document.cookie = name + '=' + value + ';expires=' + oDate;
}

//'user=blue; pass=123456; sex=1'
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

setCookie('user', 'blue', 30);
setCookie('pass', '123456', 3);
setCookie('sex', '1', 30000);



//时间戳处理

function delltimes() {
	var oDate = new Date();
	oDate.setTime(time * 1000);
	return oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate() + ' ' + oDate.getHours() + ':' + oDate.getMinutes();
}

//补0
function toZero(n) {
	return n < 10 ? '0' + n : n;
}


//移动端字体设置
function remReSize() {

	var w = $(window).width();
	try {
		w = $(parent.window).width();
	} catch (ex) {};

	if (w > 640) {
		w = 640;
	};

	$('html').css('font-size', 200 / 640 * w + 'px');

	$('#js_style_for_pc').remove();

	$('body').append('<style id="js_style_for_pc">.m_header{margin-left: -' + w / 2 + 'px;}<\/style>');
};
remReSize();

$(window).resize(remReSize);

$(document).ready(function() {
	remReSize();
});

for (var i = 0; i < 3; i++) {
	setTimeout(remReSize, 100 * i);
};



//字符串长度
function substrs(str) {

	var byteLen = 0;

	for (var i = 0; i < str.length; i++) {
		if (/[\u4e00-\u9fa5]/.test(str.charAt(i))) {
			byteLen += 2;
		} else {
			byteLen++;
		}
	};
	return byteLen;
};



////////////选择器
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

function $_(arg) {
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


///////工具
$_.tool = {};

//children

$_.tool.getChild = function(obj) {

		if (obj.getElementsByClassName) {
			return obj.children;
		} else {
			var arr = [];

			for (var i = 0; i < obj.children.length; i++) {
				if (obj.children[i].nodeType != 8) {
					arr.push(obj.children[i]);
				}
				//alert(obj.children[i].nodeType);
			}
			return arr;
		}

	}
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
	// 装逼的写法
$_.tool.roundColor2 = function() {
	(~~(Math.random() * (1 << 24))).toString(16); // ~~  相当于 parseInt
};



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


// ajax jsonp
$_.tool.ajax = function(json) {
	if (json.data) {
		json.data.t = Math.random() + new Date().getTime();
		var arr = [];
		for (var i in json.data) {
			arr.push(i + '=' + encodeURIComponent(json.data[i]));
		};
		var sData = arr.join('&');
	};
	if (window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	} else {
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	};

	if (!json.type) {
		json.type = 'get';
	};

	switch (json.type.toLowerCase()) {
		case 'get':
			if (json.data) {
				json.url = json.url + '?' + sData;
			};

			oAjax.open('GET', json.url, true);
			oAjax.send();
			break;

		case 'post':
			oAjax.open('POST', json.url, true);
			oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			oAjax.send(sData || null);
			break;
	};

	oAjax.onreadystatechange = function() {
		if (oAjax.readyState == 4) {
			if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
				json.success && json.success(oAjax.responseText);
			} else {
				json.error && json.error(oAjax.status);
			};

			clearTimeout(timer);
		};
	};

	if (json.timeout) {
		var timer = setTimeout(function() {
			oAjax.onreadystatechange = null;
			json.error && json.error(0);
		}, json.timeout);
	};
};

//后端处理 获取到前台设置的回调函数$jsonp=$_GET['callback'];
// 		   拼接返回值、$jsonp.'(xxxx)';

function jsonUrl(json) {
	var arr = [];

	for (var i in json) {
		arr.push(i + '=' + json[i]);
	}
	return arr.join('&');
}

$_.tool.jsonp = function(url, date, fns) {
	var fnName = 'wade' + Math.random(); // 随机用户名

	fnName = fnName.replace('.', ''); // 小数点去掉
	date.cb = fnName; // 变成回调函数
	window[fnName] = function(json) // 
		{
			fns & fns(json);
			oHead.removeChild(oS);
		}
	var str = url + '?' + jsonUrl(date); // 拼地址
	var oS = document.createElement('script'); // 
	oS.src = str;
	var oHead = document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
};



/*
function json2url(json)  
{
	var arr=[];
	
	for(var i in json)
	{
		arr.push(i+'='+json[i]);
	}
	
	return arr.join('&');
}

function jsonp(url, data, fnSucc)
{
	var fnName='jsonp_'+Math.random();// 给script标签起一个随机的名字  没有缓存
	fnName=fnName.replace('.', ''); //上面的随机数包含了.   这里将.去掉
	
	data.cb=fnName;  //规定cb的函数名
	
	window[fnName]=function (json) 
	{
		fnSucc && fnSucc(json); //如果成功就返回一个函数  具体的dom操作
		
		oHead.removeChild(oS);  //并且用完script标签之后将其删掉
	};
	
	var str=url+'?'+json2url(data);  //拼接script的地址  url=http://suggestion.baidu.com/su?  
	
	var oS=document.createElement('script');
	
	oS.src=str;
	
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}
*/
////////
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




/* GPS 实例 */



window.onload=function(){
	// if (navigator.geolocation) {
	//     navigator.geolocation.getCurrentPosition(locationSuccess, locationError,{
	//         // 指示浏览器获取高精度的位置，默认为false
	//         enableHighAccuracy: true,
	//         // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
	//         timeout: 5000,
	//         // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
	//         maximumAge: 3000
	//     });
	// }else{
	//     alert("不好意思，你的浏览器不支持html5定位");
	// }
	
	

	// function locationSuccess(position){
	// 	var coords = position.coords;    
	// 	//	alert(coords.latitude+'-'+coords.longitude);

	// 	var locationPos=coords.latitude+','+coords.longitude;

	// 	var map = new BMap.Map("allmap");

	// 	map.centerAndZoom(new BMap.Point(coords.longitude,coords.latitude),17);  //初始化地图,设置城市和地图级别。
		
	// 	//获取当前地址 

	// 	var myGeo = new BMap.Geocoder(); 
	// 	// 根据坐标得到地址描述 
	// 	myGeo.getLocation(new BMap.Point(coords.longitude,coords.latitude), function(result){ 
	// 		if (result){ 
	// 			//alert(result.address); 

	// 			$('#selecttype').html(result.address);
	// 			$('#nowaddress').html('<i class="mui-icon mui-icon-location"></i>当前位置:'+result.address);
	// 		} 
	// 	});

	// 	var point = new BMap.Point(coords.longitude,coords.latitude);  
	// 	var markerB = new BMap.Marker(point);// 创建标注
		
	// 	map.addOverlay(markerB);             // 将标注添加到地图中

	// 	markerB.disableDragging();
	// 	function showPoint(e){
	// 		point = new BMap.Point(map.getCenter().lng,map.getCenter().lat);
	// 		map.removeOverlay(markerB);
	// 		markerB = new BMap.Marker(point);  // 创建标注
	// 		map.addOverlay(markerB);   // 将标注添加到地图中

	// 		var gc = new BMap.Geocoder(); 
	// 		gc.getLocation(point, function(rs){
	// 			try{
	// 				GetNearbysss(map.getCenter().lat,map.getCenter().lng);
	// 			}catch(e){
	// 				alert(e)
	// 			}
	// 			var addComp = rs.addressComponents;
	// 			var mapAddress = addComp.province+addComp.city + addComp.district
	// 			+ addComp.street + addComp.streetNumber;
	// 			$('#nowaddress').html('<i class="mui-icon mui-icon-location"></i>当前位置:'+mapAddress);
	// 			$('#selecttype').html(mapAddress);
	// 		});
	// 	}
	// 	map.addEventListener("moving", showPoint);


	// 	try{
	// 		GetNearbysss(coords.latitude,coords.longitude);
	// 	}catch(e){
	// 		alert(e)
	// 	}
	// };

	// function locationError(error){
	//     switch(error.code) {
	//         case error.TIMEOUT:
	//             alert("获取当前位置超时,请重试！！！");
	//             break;
	//         case error.POSITION_UNAVAILABLE:
	//             alert('不能获取您当前的位置！！！');
	//             break;
	//         case error.PERMISSION_DENIED:
	//             alert('请打开GPS以便于我们获取您当前的位置！！！');
	//             break;
	//         case error.UNKNOWN_ERROR:
	//             alert('未知的错误！！！');
	//             break;
	//     }
	// }
	
	//第二种
// 	var geolocation = new BMap.Geolocation();
// 	geolocation.getCurrentPosition(function(r){
// 		console.log(r);
// 		if(this.getStatus() == BMAP_STATUS_SUCCESS){
// 			var mk = new BMap.Marker(r.point);
// 			//map.addOverlay(mk);
// 			//map.panTo(r.point);
// 			alert('您的位置：'+r.point.lng+','+r.point.lat);

// 			var lng=r.point.lng,lat=r.point.lat;
// 			var map = new BMap.Map("allmap");

// 			map.centerAndZoom(new BMap.Point(lng,lat),17);  //初始化地图,设置城市和地图级别。
			
// 			//获取当前地址 
// 			var myGeo = new BMap.Geocoder(); 
// 			// 根据坐标得到地址描述 
// 			myGeo.getLocation(new BMap.Point(lng,lat), function(result){ 
// 				if (result){ 
// 					//alert(result.address); 
// 					$('#selecttype').html(result.address);
// 					$('#nowaddress').html('<i class="mui-icon mui-icon-location"></i>当前位置:'+result.address);
// 				} 
// 			});

// 			var point = new BMap.Point(lng,lat);  
// 			var markerB = new BMap.Marker(point);// 创建标注
			
// 			map.addOverlay(markerB);             // 将标注添加到地图中

// 			markerB.disableDragging();
// 			function showPoint(e){
// 				point = new BMap.Point(map.getCenter().lng,map.getCenter().lat);
// 				map.removeOverlay(markerB);
// 				markerB = new BMap.Marker(point);  // 创建标注
// 				map.addOverlay(markerB);   // 将标注添加到地图中

// 				var gc = new BMap.Geocoder(); 
// 				gc.getLocation(point, function(rs){
// 					try{
// 						GetNearbysss(map.getCenter().lat,map.getCenter().lng);
// 					}catch(e){
// 						alert(e)
// 					}
// 					var addComp = rs.addressComponents;
// 					var mapAddress = addComp.province+addComp.city + addComp.district
// 					+ addComp.street + addComp.streetNumber;
// 					$('#nowaddress').html('<i class="mui-icon mui-icon-location"></i>当前位置:'+mapAddress);
// 					$('#selecttype').html(mapAddress);
// 				});
// 			}
// 			map.addEventListener("moving", showPoint);


// 			try{
// 				GetNearbysss(lng,lat);
// 			}catch(e){
// 				alert(e)
// 			}
// 		}else {
// 			alert('failed'+this.getStatus());
// 		}        
// 	},{enableHighAccuracy: true})
// }





