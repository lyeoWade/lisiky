/*
*********
*		*
*		*
*********
*/

//ajax请求地址
//var requrl="http://jiaxiao.dev.uiho.com/info/InfoServlet";



function sumitImageFile(base64Codes,fnsuc){
    
    var formData = new FormData();   
    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    formData.append("file",convertBase64UrlToBlob(base64Codes),"image.png");  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同  ,"image.png" is important 
    
    //console.log(convertBase64UrlToBlob(base64Codes))
    //ajax 提交form
    $.ajax({
        url : "../dqt/php/post_file.php",
        type : "post",
        data : formData,
        dataType:"text",
        processData : false,         // 告诉jQuery不要去处理发送的数据
        contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
        success:fnsuc
        
    });
}


/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){
    
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : 'image/png'});
}


var Uiho={}

/* 验证  正则匹配 */
Uiho.ver={}
Uiho.ver.init=function(arr,fn){
	for(var i=0; i<arr.length; i++){
		if(arr[i].obj.value==''){
			fn&&fn(arr[i].tag+"不能为空!");
			return false;
		 }else if(!Uiho.ver.moblie(arr[i].obj.value)){
		 	alert('---'+arr[i].obj.value)
		 	fn&&fn("请输入正确的"+arr[i].tag+"!");
		 	return false;
		 }else if(!Uiho.ver.password(arr[i].obj.value)){
		 	alert(arr[i].obj.value)
		 	fn&&fn("请输入正确的"+arr[i].tag+"!");
		 	return false;
		 }else{
		 	fn&&fn();
		 };
	};
};

Uiho.ver.empty=function(arr,fn){
	for(var i=0; i<arr.length; i++){
		if(arr[i].obj.value==''){
			fn&&fn(arr[i].tag+"不能为空!");
			return false;
		 }
	};
};
//0-99
Uiho.ver.numint=function(num){
	return /^(\d{1,2})$/.test(num);
};
//中文名
Uiho.ver.chinese=function(str){
	return /^[\u4e00-\u9fa5]+$/.test(str);
};

Uiho.ver.moblie=function( value ){
    return /^1\d{10}$/.test( value );
}
Uiho.ver.password=function( value ){
    return /^[\w]{6,20}$/.test( value );
}

Uiho.tool={};
Uiho.tool.DetailTimesTamp=function(time){
	var d = new Date(time);    //根据时间戳生成的时间对象
	var date = (d.getFullYear()) + "-" + Uiho.tool.toZero(d.getMonth() + 1) + "-" +Uiho.tool.toZero(d.getDate()) + " " + Uiho.tool.toZero(d.getHours()) + ":" + Uiho.tool.toZero(d.getMinutes()) + ":" + Uiho.tool.toZero(d.getSeconds());
	return date;
};
Uiho.tool.toZero=function(n){
	return n<10?n='0'+n:n;
};
Uiho.tool.geturldata=function(url){
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

//cookie
Uiho.cookies={};
Uiho.cookies.getCookie=function(cookiename){
	var result;
	var mycookie = document.cookie;
	var start2 = mycookie.indexOf(cookiename + "=");
	if (start2 > -1) {
		start = mycookie.indexOf("=", start2) + 1;
		var end = mycookie.indexOf(";", start);

		if (end == -1) {
			end = mycookie.length;
		}

		result = unescape(mycookie.substring(start, end));
	}

	return result;
}
Uiho.cookies.setCookie=function(cookiename, cookievalue, hours){
	var date = new Date();
	date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
	document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
}



//效果
Uiho.effect={};

//简单的分页  
/*
	allnum--->总条数
	pageSize->每一页多少条
	nowPage-->当前第几页
	fn------->执行函数,传参nowPage
*/
Uiho.effect.pagination=function(allnum,pageSize,nowPage,fn){
	nowPage=parseInt(nowPage);
	var nums=Math.ceil(allnum/pageSize);
	$allnum='<div class="pull-left"><span>共 '+allnum+' 条数据</span>&nbsp;&nbsp;&nbsp;<span>共'+nums+'页</span></div><ul id="page" class="pagination pagination-sm no-margin pull-right"></ul>';
	$('#pagination').html($allnum);
	var oPage=document.getElementById('page');

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
			fn&&fn(oNum);
		};
	};
};


Uiho.effect.selectNum=function (fn){
	$('#selectNum').on('change',function(){
		fn&&fn($(this).val());
	})
}


//获取得到登陆之后的cookie
//var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));


//------------------------------------////////////-----------------------------------------

function responseInfo(str){

	var oData=$.parseJSON(str);
	if(oData.responseCode==1){
		$('.addtip').html(oData.responseMsg);
		$('.addtip').addClass('success');
	}else{
		$('.addtip').html(oData.responseMsg);
		$('.addtip').addClass('error');
	}
}



//上传文件//

// 选择文件
function fileSelected(obj) {
  var file = obj.get(0).files[0];
  var fileSize = 0;
  if (file) {
    if (file.size > 1024 * 1024)
      fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    else
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
    //console.log('Name: ' + file.name);
    //console.log('Size: ' + fileSize);
  }
};


     
// 文件上传
function uploades(obj,fn){
	var xhr=new XMLHttpRequest();
	//console.log(oFile.files[0]);
	xhr.onload=function(){
		console.log(this.responseText)
		var d = JSON.parse(this.responseText);
		// console.log(d)
		fn&&fn(d);
	}
	xhr.open('post','../dqt/php/post_file.php',true);
	xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
	var oFormData=new FormData();
	oFormData.append('file',obj);
	xhr.send(oFormData);
}






//删除图片

function deleteImages(){
	$('.imgwarp a').on('click',function(){
		//alert($(this).attr('imgid'));
		var oWarp=$(this).parents('.imgwarp');
		//{ "action": "deleteOneImage", "datetime": 1456135418617, "params": 1, "source": "web", "target": "image" }
		var data='data={"action":"deleteOneImage","params":'+$(this).attr('imgid')+',"source": "web","target":"image" }';
		var r=confirm("确定删除本条数据吗?")
		if(r==true){
			$.ajax({
				url:requrl,
				type:"POST",
				data:data,
				success:function(str){
					//console.log(str);
					responseInfo(str);
					oWarp.remove();
				}
			});
		}
	})
}





/*** 公共部分 ***/
//排课新增和修改
/*--------------操作日志--------------*/


function operalog(intor){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={"action":"addOneLog","params":{ "intor": "'+intor+'","managerId":'+cookieValue.id+'},"source": "web","target":"log"}',
		success:function(data){
			console.log(data);
		}
	})
}


