// JavaScript Document

function getPageId(){
	return parseInt(window.location.href.split('?')[1].split('=')[1]);
}
var oTargeturl=[
];


function siderAd(){
	
}


	
// window.onload=function(){
	

// 	//想要使用保留字作为对象的属性名称的，只能通过在方括号中传入属性名字符串的形式访问：
	
// 	var oA=document.createElement('a');
// 	oA.style.display='block';
// 	oA.target="_blank";
// 	document.body.appendChild(oA);
	
// 	//var oA=document.getElementsByTagName('a')[0];
// 	oA.style.height=document.documentElement.clientHeight+'px';
// 	oA.style.width=document.documentElement.clientWidth+'px';
// 	oA.style.position="absolute";
// 	oA.style.left='0';
// 	oA.style.top='0';
// 	oA.href=oTargeturl[randoms(0,oTargeturl.length-1)];
	
// 	if(getCookie('ing')){
// 		oA.style.display='none';
// 	}else{
// 		oA.onclick=function(){
// 			reqdata();
// 			this.style.display='none';
// 			 setCookie('ing', '1', 1);
// 		};
// 	}
// }

function reqdata(){
	$.ajax({
		url:'web/click.php',
		type:"POST",
		data:"act=click",
		success: function(data){
			console.log(data);
		}	
	});
}
function geturldata(url){
	if(url.indexOf('?')!=-1){
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
};


function randoms(s,b){
	return parseInt( Math.random()*(b-s+1)+s);
}

function toZero(n){
	return n<10?'0'+n:n;
}
function getWeek(n){
	var oDay=new Date();
	var week=['日','一','二','三','四','五','六'];
	var weekNow='';
	for(var i=0; i<week.length; i++){
		weekNow=week[(oDay.getDay()+n)%7];
	};
	return weekNow;
}

 function nowDays()
{
   var oDate=new Date();
   //将日期先调到下个月，再将天数调为0 回到上个月最后一天
   oDate.setMonth(oDate.getMonth()+1,0); 
   //oDate.setDate(0);
   return oDate.getDate();
};

function getDay(n){
	var oDay=new Date();
	var year=oDay.getFullYear();
	var oM=oDay.getMonth()+1;
	var oD=oDay.getDate();
	//console.log(nowDays())
	var d=0;
	if((oD+n)>nowDays()){
		d=oD+n-nowDays();
		oM=oM+1;
	}else{
		d=oD+n;
	}
	//console.log(d)
	return year+'-'+toZero(oM)+'-'+toZero(d);
};



function setCookie(name, value, iDay)
{
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	
	document.cookie=name+'='+value+';expires='+oDate;
}

function getCookie(name)
{
	var arr=document.cookie.split('; ');
	
	var re=new RegExp('\\b'+name+'=\\w+');
	
	var res=document.cookie.match(re);
	
	if(res)
	{
		return res[0].split('=')[1];
	}
	else
	{
		return '';
	}
}
function removeCookie(name)
{
	setCookie(name, '1', -1);
}

//隔行变色

function chengeColor(obj){
	//var obj=obj;

	for(var i=0; i<obj.length; i++){
		if(i%2==0){
			obj[i].style.background="#fafafa";
		}else{
			obj[i].style.background="#fff";
		}
	}
}


/* 获取右边热门视频 */
function sidehotvideo(){
	$.ajax({
		url:'phpdata/datapage/online.php',
		type:"POST",
		data:"type=GetVideoHotList",
		success:function(str){
			var oData=eval('('+str+')');
			//console.log(oData)
			if(oData.counts>0){
				var sidehotvideo='';
				for(var i=0; i<oData.result.length; i++){
					var obj=eval('('+oData.result[i]+')');
					//console.log(obj)
					sidehotvideo+='<li><a target="_blank" href="videoDetail.html?id='+obj.id+'">'+obj.title+'</a></li>';
				}
				$('#sidehotvideo').html(sidehotvideo)
			};
		}
	});
};
function huanhang(str){
    return str.replace(/(\n)+|(\r\n)+/g, "");
}

//分页

function pagination(allnum,pageSize,nowPage,fn){
	
	nowPage=parseInt(nowPage);
	var nums=Math.ceil(allnum/pageSize);
	var oPage=document.getElementById('pages');
	oPage.innerHTML='';
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
			document.documentElement.scrollTop='0';
			document.body.scrollTop='0';
			//alert(oNum)
			fn&&fn(oNum);
		};
	};
};
