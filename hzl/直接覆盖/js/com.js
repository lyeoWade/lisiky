function remReSize() {

	var w = document.documentElement.clientWidth;
	if (w > 640) {
		w = 640;
	};
	document.getElementsByTagName('html')[0].style.fontSize=200/640*w + 'px';
};
remReSize();

window.addEventListener('resize', remReSize, false);


function bind(obj, ev, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(ev, fn, false);
	} else {
		obj.attachEvent('on' + ev, function() {
			fn.call(obj);
		});
	}
}

function view() {
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	};
};



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

function toZero(n) {
	return n < 10 ? '0' + n : n;
}



function getPos(obj) {
	var l = 0,
		t = 0;

	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		left: l,
		top: t
	}
}