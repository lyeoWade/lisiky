function MyJs(){
	//this.HomeBgCanvas();

}

MyJs.prototype.HomeBgCanvas=function(){

	var oCanvas=$_('#canvas2'),
	width=window.innerWidth,
	height=window.innerHeight;
	oCanvas.width=width;
	oCanvas.height=height;
	var ctx=oCanvas.getContext('2d');

	ctx.fillStyle = "#ccc";
	ctx.fillRect(0, 0, 1000, 1000);

	console.log(width/100);
}


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

