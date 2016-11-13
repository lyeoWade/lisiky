// JavaScript Document

function getPageId(){
	return parseInt(window.location.href.split('?')[1].split('=')[1]);
}
function toZero(n){
	return n<10?'0'+n:n;
}
		
			
window.onload=function(){
	
	var oTargeturl=["http://www.well188.net/aff.php?vid=45499&url=reg.php"]
	//想要使用保留字作为对象的属性名称的，只能通过在方括号中传入属性名字符串的形式访问：
	
	var oA=document.createElement('a');
	oA.style.display='block';
	oA.target="_blank";
	document.body.appendChild(oA);
	
	//var oA=document.getElementsByTagName('a')[0];
	oA.style.height=document.documentElement.clientHeight+'px';
	oA.style.width=document.documentElement.clientWidth+'px';
	oA.style.position="absolute";
	oA.style.left='0';
	oA.style.top='0';
	oA.href=oTargeturl[randoms(0,oTargeturl.length-1)];
	
	if(getCookie('ing')){
		oA.style.display='none';
	}else{
		oA.onclick=function(){
			reqdata();
			this.style.display='none';
			 setCookie('ing', '1', 1);
		};
	}
}

function reqdata(){
	$.ajax({
		url:'../web/click.php',
		type:"POST",
		data:"act=click",
		success: function(data){
			console.log(data);
		}	
	});
}



function randoms(s,b){
	return parseInt( Math.random()*(b-s+1)+s);
}

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



//上传
function uploades(obj,fn){
	var xhr=new XMLHttpRequest();
	//console.log(oFile.files[0]);
	xhr.onload=function(){
		console.log(this.responseText)
		var d = JSON.parse(this.responseText);
		// console.log(d)
		fn&&fn(d);
	}
	xhr.open('post','datapage/post_file.php',true);
	xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
	var oFormData=new FormData();
	oFormData.append('file',obj);
	xhr.send(oFormData);
}



// 分页


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
			//alert(oNum)
			fn&&fn(oNum);
		};
	};
};









