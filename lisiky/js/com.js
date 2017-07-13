// 方法
function tozero(n){
	return n<10?'0'+n:n;
};



function addClass(obj,sClass){
	if(!obj.className){
		obj.className=sClass;
	}
	var oldClass=obj.className.replace(/^\s+|\s+$/g,' ').replace(/\s+/g,' ');

	var str=oldClass.split(' ');
	
	for(var i=0; i<str.length; i++){
		if(str[i]==sClass){
			return false;	
		};
	};
	obj.className+=' '+sClass;	
};


function removeClass(obj,sClass){
	
	if(!obj.className)return;
	
	var oldClass=obj.className.replace(/^\s+|\s+$/g,' ').replace(/\s+/g,' ');

	var str=oldClass.split(' ');
	
	for(var i=0; i<str.length; i++){
		if(str[i]==sClass){
			str.splice(i,1);
			obj.className=str.join(' '); // 数组转为字符串
			return;
		}
	};
};
function getPos(obj){
	var l=0,t=0;	
	while(obj)
	{
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;	
	};
	return {left:l,top:t};
};


function drag(obj2,obj,fn,multiple){
	obj.onmousedown=function(ev){
		var disx=ev.clientX-obj.offsetLeft;
		document.onmousemove=function(ev){
			var L=ev.clientX-disx;
			if(L<=0)L=0;
			if(L>=obj2.offsetWidth-obj.offsetWidth)L=obj2.offsetWidth-obj.offsetWidth*multiple; //乘以1.5 是为了不超出
			
			obj.parentNode.style.width=L+'px';
			
			var scals=-L/(obj.offsetWidth-obj2.offsetWidth);
			
			fn&&fn(scals);
		};
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;	
		}
		
		return false;
	};
}

function toZero(n){
	return n<10?n='0'+n:n;	
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function ready(fn){
	if(document.getElementsByClassName){
		document.addEventListener('DOMContentLoaded',fn,false);	
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState=='complete'){
				fn();	
			}
		});	
	}
};




//运动
function getStyle(obj,name){ return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name]}

function getCur(obj,name)
{

	
	if(name=='opacity')
	{
		var child=Math.round(parseFloat(getStyle(obj,name))*100)
	}else
	{
		var child=parseInt(getStyle(obj,name));
	}
	
	if(isNaN(child))
	{
		switch(name)
		{
			case 'top':
			return obj.offsetTop;
			case 'left':
			return obj.offsetLeft;
			case 'width':
			return obj.offsetWidth;
			case 'height':
			return obj.offsetHeight;
		}
	}
	return child;
	
}
function startMove(obj,json,options)
{
	options =options||{};
	options.time=options.time ||700;
	options.type=options.type ||'buffer';	
	var timer={
		veryslow:5000,
		slow:3000,
		normal:2000,
		fast:1000,
		veryfast:500
		}
	
	if(typeof options.time=='string')
	{
		if(timer[options.time])
		{
			options.time=timer[options.time];
		}else
		{
			options.time=1000;
		}
	}
	
	var first={}
	var count=parseInt(options.time/30);
	var dis={};
	
	for(var i in json)
	{
		first[i]=getCur(obj,i);
		dis[i]=json[i]-first[i];
	}
	
	clearInterval(obj.timer);
	var n=0;
	window.speedX=0;
	window.elaType=0;
	obj.timer=setInterval(function(){
			n++
			var wade;
			
			for(var i in json)
			{
				switch (options.type)
				{
					case  'linear':
					wade=first[i]+dis[i]*n/count;
					break;
					case 'buffer':
					var a=1-n/count;
					wade=first[i]+dis[i]*(1-a*a*a);
					break;
					case 'StoF':
					var a=n/count;
					wade=first[i]+dis[i]*(a*a*a);
					break;
					case 'TX':
					speedX+=(json[i]-elaType)/5;
					speedX*=0.7;
					elaType+=speedX;
					wade=Math.round(elaType);
					break;
				}
				
				if(i=='opacity')
				{
					obj.style.opacity=wade/100;
					obj.style.filter='alpha(opacity='+wade*100+')';
				}else
				{
					obj.style[i]=wade+'px';
				}
			}
			if(options.type=='TX')
			{
				if(Math.round(elaType)==json[i] && Math.round(speedX)==0)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
			}else
			{
				if(count==n)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
			}
		},30)
};
function roundNum(s, b){
	return parseInt( Math.random()*(b-s+1)+s);
};
//-------------------------我是分割线------------------------------




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


