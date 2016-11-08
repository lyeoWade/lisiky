
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

