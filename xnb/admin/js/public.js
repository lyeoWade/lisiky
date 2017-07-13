/*
*********
*		*
*		*
*********
*/


//判断是否登陆

if(Lisiky.cookies.getCookie('userInfo')==undefined){
	if(window!=window.top){
		window.top.location.href = "login.html";
	}else{
		window.location.href="login.html";
	}
	window.location.href="login.html";
}

//console.log(Lisiky.cookies.getCookie('userInfo'));
//获取得到登陆之后的cookie
// var cookieValue=$.parseJSON(Lisiky.cookies.getCookie('userinfo'));
// console.log(cookieValue)
//公共信息
// $(function(){
// 	$('.username').html(cookieValue.realname);
// });






//console.log(cookieValue)
//------------------------------------////////////-----------------------------------------



//上传文件//

// 选择文件
function fileSelected(obj,fn) {
  var file = obj.get(0).files[0];
  var fileSize = 0;
  if (file) {
    if (file.size > 1024 * 1024)
     {fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
  		alert("文件太大," + fileSize);
  		return false;
    }else{
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
    }
    //console.log('Name: ' + file.name);
    //console.log('Size: ' + fileSize);
    fn&&fn(file.name);
  }
};
// 文件上传
function uploadFile(f,fnsuc) {
  var fd = new FormData();
  //alert(123)
  fd.append("fileInput", f);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", fnsuc, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", "http://console.qjias.com/resx/StroageServlet");
  //xhr.open("POST", "http://jiabindao.dev.uihu.com/resx/StroageServlet");
  xhr.send(fd);
}


//前端删除上传的图片
function deletenewimage(){
	$('.newimage').on('click',function(){
		if(!$('.newimage').attr('websiteImg')){ //如果不是修改
			$(this).parents('.imgwarp').remove();
		}
	})
}

// 上传失败后执行方法
function uploadFailed(evt) {
  alert("上传失败；");
}
// 上传异常中断后执行方法
function uploadCanceled(evt) {
  alert("异常中断!");
}


//删除图片
function deleteImages(){
	$('.imgwarp a').on('click',function(){
		//alert($(this).attr('imgid'));
		var oWarp=$(this).parents('.imgwarp');
		var data='data={"action":"deleteOneImage","params":'+$(this).attr('imgid')+',"source": "web","target":"image" }';
		var r=confirm("确定删除本条数据吗?")
		if(r==true){
			$.ajax({
				url:requrl,
				type:"POST",
				data:data,
				success:function(str){
					responseInfo(str);
					oWarp.remove();
				}
			});
		}
	})
}





/*** 公共部分 ***/


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


/* 添加保证金 */


// 刷新当前页面

function reload(){
	setTimeout(function(){
		location.reload();
	},2000);
}




//响应实时数据
function ChildMsg(){
	var oparent=window.parent.document;
	//alert($("#userNum",oparent).html())
	var datas='data={"action":"countPending","source":"web","target":"count"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var obj=oData.object;
				console.log(obj);
				if(obj.applyTrial!=0 || obj.noContactUser!=0 || obj.signUpUser!=0){
					$("#ugment",oparent).addClass('active');
					$("#ugmentChild",oparent).css('display','block')
				}

				if(obj.reserveExam!=0 ){
					$("#examMsg",oparent).addClass('active');
					$("#examMsgChild",oparent).css('display','block')
				}

				if(obj.applyTrial==0)obj.applyTrial='';
				if(obj.signUpUser==0)obj.signUpUser='';
				if(obj.noContactUser==0)obj.noContactUser='';
				if(obj.untreatedCar==0)obj.untreatedCar='';
				if(obj.untreatedFeedback==0)obj.untreatedFeedback='';
				if(obj.withdrawApply==0)obj.withdrawApply='';
				if(obj.reserveExam==0)obj.reserveExam='';
				
				$("#reserveExam",oparent).html(obj.reserveExam);
				$("#ty",oparent).html(obj.applyTrial);
				$("#allu",oparent).html(obj.signUpUser);
				$("#userNum",oparent).html(obj.noContactUser);
				$("#ac",oparent).html(obj.untreatedCar);
				$("#fk",oparent).html(obj.untreatedFeedback);
				$("#txsq",oparent).html(obj.withdrawApply);
				
			}else{
				alert(oData.responseMsg);
			}
			console.log(oData);
		}
	})
};

//console.log(window.location.href)
// if(window.location.href.indexOf('#top')!=-1){
// 	window.location.href=window.location.href;
// }else{
// 	window.location.href=window.location.href+'#top';
// }

//console.log(window.location.href)