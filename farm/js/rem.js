
function remReSize(){
	
	var w = $(window).width();
	try{
		w = $(parent.window).width();
	}catch(ex){
	};
	
	if(w>640){w = 640;};
	
	$('html').css('font-size',200/640*w+'px');
	
	$('#js_style_for_pc').remove();
	
	$('body').append('<style id="js_style_for_pc">.m_header{margin-left: -'+w/2+'px;}<\/style>');
};
remReSize();

$(window).resize(remReSize);

$(document).ready(function() {remReSize();});

for(var i=0;i<3;i++){setTimeout(remReSize, 100*i);};


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




function substrs(str){
	
	var byteLen=0;
	
	for(var i=0;i<str.length;i++)
	{
		if(/[\u4e00-\u9fa5]/.test(str.charAt(i)))
		{
			byteLen+=2;
		}
		else
		{
			byteLen++;
		}
	};
	return byteLen;
};

function toZero(n){
	return n<10?'0'+n:n;
}




function getPos(obj){
	var l=0,t=0;

	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {
		left:l,
		top:t
	}
}


function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function setCookie(name, value, iDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	
	document.cookie=name+'='+value+';expires='+oDate;
}
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}
function removeCookie(name){
	setCookie(name, '1', -1);
}