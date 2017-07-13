


function Wananm(){

	this.Sider();
	
}

Wananm.prototype.getUrlData=function(url){
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

Wananm.prototype.Banner=function(ele,sFont){
	var oBanner=document.querySelectorAll(ele)[0];
	var oUl=oBanner.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	var oDot=oBanner.getElementsByTagName('ol')[0];
	var oFont=oBanner.getElementsByTagName('p')[0];

	//创建dot
	for(var i=0; i<aLi.length; i++){
		var oOlli=document.createElement('li');
		oDot.appendChild(oOlli);
	}

	var oDotLi=oDot.children;

	oDotLi[0].className='active';
	console.log(sFont)

	//var sFont=['08梦之队纪录片科比亲述夺冠之路','老妖怪！基德生涯20大震撼表演','逆天压哨血帽库里！利拉德赛季无解进攻欣赏','詹姆斯韦德经典连线史上快攻最禽兽二人组','传奇谢幕！科比60分谢幕战台前幕后大揭秘'];
	oFont.innerHTML=sFont[0];
	//初始化oUl长度
	//alert(aLi[0].offsetWidth);
	

	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;

	oUl.style.width=iW.length+'px';
	for(var i=0; i<aLi.length; i++){
		aLi[i].style.width=iW+'px';
	}
	auto();
	bind(oBanner,"touchstart",fnStart);
	bind(oBanner,"touchmove",fnMove);
	bind(oBanner,"touchend",fnEnd);

	function auto()
	{
		oTimer=setInterval(function(){
			iNow++;	
			iNow=iNow%aLi.length;
			tab();
		},5000);
	}

	function fnStart(ev)
	{
		oUl.style.transition="none";
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		clearInterval(oTimer);
	}
	function fnMove(ev)
	{
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oUl.style.WebkitTransform=oUl.style.transform="translateX("+iX+"px)";

	}
	function fnEnd()
	{
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>aLi.length-1)
		{
			iNow=aLi.length-1;
		}
		tab();
	}


	function tab()
	{
		iX=-iNow*iW;
		oUl.style.transition="0.5s";
		oUl.style.WebkitTransform=oUl.style.transform="translateX("+iX+"px)";

		for(var i=0; i<oDotLi.length; i++){
			oDotLi[i].className='';
		}
		oDotLi[iNow].className='active';

		oFont.innerHTML=sFont[iNow];
	}

}


Wananm.prototype.GetBannerM=function(){
	var _this=this;
	$.ajax({
		url:"../admin/pushArc.php",
		type:"POST",
		data:"type=getbanner",
		beforeSend: function(data){
				//loading();
		},
		success:function(data){
			var d=eval('('+data+')');
			var oUlHtml='',
				sFont=[];
			for(var i=0; i<d.result.length; i++){
				var resultobj=eval('('+d.result[i]+')');
				oUlHtml+='<li><a target="_blank" href="content.html?id='+resultobj.id+'" target="_blank"><img src="../'+resultobj.banner+'" alt="'+resultobj.title+'"></a></li>';
				sFont.push(resultobj.title);
			}
			$('.bannerimg').html(oUlHtml).animate({'opacity':1});
			_this.Banner('#banner',sFont);
		}
	})

}

Wananm.prototype.Sider=function(){
	var oSider=document.getElementsByClassName('sider')[0];
	var menuIcon=document.getElementsByClassName('menuIcon')[0];
	var oMark=oSider.getElementsByClassName('sider-mark')[0];
	oSider.style.height=view().h+'px';
	
	bind(oMark,"touchend",function(){
		oSider.style.transition='0.6s';
		oSider.style.left="-500px";
	});
	bind(menuIcon,"touchend",function(){
		oSider.style.transition='1s';
		oSider.style.left=0;
	});
}

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

























