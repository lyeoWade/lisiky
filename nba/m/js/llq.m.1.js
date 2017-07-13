


function Llq(){


	
}

Llq.prototype.getUrlData=function(url){
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

// $(function(){
// 	//getList()
// 	var title='',username='',newtype='',nowpage=1,PageSize=20;
// 	getList(title,username,newtype,nowpage,PageSize);

// 	$('#searchBtn').on('click',function(){
// 		title=$('#title').val();
// 		//alert(title)
// 		username=$('#uesrname').val();
// 		newtype=$('#newtype').val();
// 		getList(title,username,newtype,nowpage,PageSize);
// 	});
// });
Llq.prototype.navScroll=function(ele){
	var oNavwrap=document.querySelectorAll(ele)[0];
	var oNav=oNavwrap.children;
	var Aw=0;
	for(var i=0;i<oNav.length; i++){
		Aw+=oNav[i].offsetWidth;
	}
	oNavwrap.style.width=Aw+'px';
	//alert(oNav.length)
}



// 文章内容
Llq.prototype.articleContent=function(){
	
	var _this=this;
	var id=_this.getUrlData(window.location.href).id;
	$.ajax({
		url:"../phpdata/datapage/arclist.php",
		type:"POST",
		data:"type=GetOneArticleInfo&id="+id,
		success: function(data){

			var json=$.parseJSON(data);
			console.log(json);
			if(json.Total==0){
				$('.articletime').html('<p class="dataisno">暂无数据</p>');
			
			}else{
				
				$('.newshead h1').html(json.title);
				$('.articlecontent').html(json.article);
				$('.articletime').html(json.pushtime);
			}
		},
		error: function(){
		}	
	});
}

Llq.prototype.Banner=function(ele){
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


	var sFont=['08梦之队纪录片科比亲述夺冠之路','老妖怪！基德生涯20大震撼表演','逆天压哨血帽库里！利拉德赛季无解进攻欣赏','詹姆斯韦德经典连线史上快攻最禽兽二人组','传奇谢幕！科比60分谢幕战台前幕后大揭秘'];
	oFont.innerHTML=sFont[0];
	//初始化oUl长度

	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';

	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
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

/* 新闻消息板块 */ 
// 筛选
Llq.prototype.SelectNews=function(nowpage,PageSize){
	var _this=this;
	var oBtn=document.querySelectorAll('.dropup')[0].children;
	for(var i=0; i<oBtn.length; i++){
		(function(ind){
			oBtn[ind].onclick=function(){
				var nNewType=this.getAttribute('newtype');
				_this.GetNewsList(nNewType,nowpage,PageSize)
			};
		})(i);
	}
}
Llq.prototype.GetNewsList=function(newtype,nowpage,PageSize){
	var _this=this;
	$.ajax({
		url:"../phpdata/datapage/arclist.php",
		type:"POST",
		data:"type=list&newtype="+newtype+"&nowpage="+nowpage+"&PageSize="+PageSize,
		success: function(data){
			_this.NewsNav();
			var json=$.parseJSON(data);
			console.log(json);
			if(json.Total==0){
				$('#newsWrap').html('<p class="dataisno">暂无数据</p>');
				$('.onlinemore').css('display','none')
			}else{
				if(json.Total<=PageSize){
					$('.onlinemore').css('display','none');
				}else{
					$('.onlinemore').css('display','block')
				}
				var newtypes='',html='';
				var Liststr='';
				for(var i=0; i<json.result.length; i++){
					
					//console.log(json.result[i].length)

					var newjson=eval('('+json.result[i]+')');
					switch(newjson.newtype){
						case '1':
							newtypes="篮球新闻";
						break;
						case '2':
							newtypes="足球新闻";
						break;
						case '3':
							newtypes="实时新闻";
						break;
						case '4':
							newtypes="神棍区";
						break;
						case '5':
							newtypes="推荐文章";
						break;
						case '6':
							newtypes="篮球心水";
						break;
						case '7':
							newtypes="足球心水";
						break;
						default:
							newtypes='栏目id:'+newjson.newtype;
					}
					if(newjson.isrecommend=='')newjson.isrecommend='-';
					
					if(newjson.thumb==''){newjson.thumb='../img/logo.png" style="border:1px solid #ccc;"'}

					Liststr+='<li><a href="article.html?id='+newjson.id+'"><img src="'+newjson.thumb+'"><div class="newinfo"><h2>'+newjson.title+'</h2>\
						<p><span class="comment">20</span><span class="read">'+newjson.page_view+'</span><span><span class="column">'+newtypes+'</span></p></div></a></li>';
				}
				$('#newsWrap').html(Liststr);
			}
		},
		error: function(){
		}	
	});	
}

/* 消息列表分类菜单 */

Llq.prototype.NewsNav=function(){
	var oMoreNav=document.querySelectorAll('.moreNav')[0];

	var oDropup=document.querySelectorAll('.dropup')[0];
	bind(oMoreNav,"touchend",function(){
		oDropup.style.transition='0.5s';
		oDropup.style.bottom='0';
		oDropup.style.opacity=1;

		oMoreNav.style.transition='0.3s';
		oMoreNav.style.right='-0.6rem';
		oMoreNav.style.opacity='0';
	});
	var oInput=oDropup.getElementsByTagName('input')[0];


	if(oInput!=undefined){
		var oSubVideo=document.getElementById('subVideo');
		bind(oSubVideo,"touchend",function(){
			oDropup.style.transition='0.5s';
			oDropup.style.bottom='-0.34rem';
			oDropup.style.opacity=0;

			oMoreNav.style.transition='0.3s';
			oMoreNav.style.right='0.1rem';
			oMoreNav.style.opacity='1';
		});
	}else{
		bind(oDropup,"touchend",function(){
			oDropup.style.transition='0.5s';
			oDropup.style.bottom='-0.34rem';
			oDropup.style.opacity=0;

			oMoreNav.style.transition='0.3s';
			oMoreNav.style.right='0.1rem';
			oMoreNav.style.opacity='1';
		});
	}
	
	


}


// 视频集锦

Llq.prototype.GetVideoList=function(username,nowpage,PageSize){
	var _this=this;

	//alert("type=GetVideoList&username="+username+"&nowpage="+nowpage+"&PageSize="+PageSize)
	$.ajax({
		url:"../phpdata/datapage/online.php",
		type:"POST",
		data:"type=GetVideoList&keywords="+username+"&nowpage="+nowpage+"&PageSize="+PageSize,
		success: function(data){
			_this.NewsNav();
			var json=$.parseJSON(data);
			console.log(json);

			if(json.Total==0){
				$('#newsWrap').html('<p class="dataisno">暂无数据</p>');
				$('.onlinemore').css('display','none')
			}else{
				if(json.Total<=PageSize){
					$('.onlinemore').css('display','none');
				}else{
					$('.onlinemore').css('display','block').find('a').attr('pagenum',2);
				}
				var newtypes='',html='';
				var Liststr='';
				for(var i=0; i<json.result.length; i++){
				
					var newjson=eval('('+json.result[i]+')');

					Liststr+='<li><a href="shipindetail.html?id='+newjson.id+'"><div class="mark"></div><img src="'+newjson.thumPic+'"><p>'+newjson.title+'</p></a></li>';
				}
				$('#video-wrap').html(Liststr);
				
			}
		},
		error: function(){
		}	
	});
}
Llq.prototype.VideoDetail=function(){
	var _this=this;
	var id=_this.getUrlData(window.location.href).id;
	$.ajax({
		url:"../phpdata/datapage/online.php",
		type:"POST",
		data:"type=GetOneVideoInfo&id="+id,
		success: function(data){

			var json=$.parseJSON(data);
			console.log(json);
			if(json.Total==0){
				$('.articletime').html('<p class="dataisno">暂无数据</p>');
			
			}else{
				$('.newshead h1').html(json.title);
				$('.descriptions').html(json.descention);
				$('.articletime').html(json.updatetime);
				$('.viewnum').html(json.view);
				$('#othersource').attr('href',json.videoUrl.split('|||')[0]);

				if(json.sourceSite!='h5'){
					$('#sourceid').css('display','none');
					$('.tumb img').attr('src',json.thumPic);
				}else{
					$('.tumb').css('display','none')
					$('#sourceid').html('<source src="'+json.videoUrl.split('|||')[0]+'" type="video/mp4;">');
				}
			}
		},
		error: function(){
		}	
	});
}

function fnTab(){
	var oTab=document.getElementById("tabPic");
	var oList=document.getElementById("picList");
	var oLi=oList.children;
	var picnum=document.getElementById('picnum');
	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	oTab.style.width=iW+'px';
	oList.style.width=oLi.length*100+'%';
	picnum.innerHTML=(iNow+1)+'/'+oLi.length;
	for(var i=0; i<oLi.length; i++){
		oLi[i].style.width=100/oLi.length+'%';
		oLi[i].style.height=view().h+'px';
	}


	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	function fnStart(ev)
	{
		oList.style.transition="none";
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		//clearInterval(oTimer);
	}
	function fnMove(ev)
	{
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	function fnEnd()
	{
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>oLi.length-1)
		{
			iNow=oLi.length-1;
		}
		tab();
	}
	function tab()
	{
		iX=-iNow*iW;
		oList.style.transition="0.5s";
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}

}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

























