$(function(){

	var Sid=Uiho.tool.geturldata(window.location.href).id;
	var data='data={"action":"getOneSite","params": '+Sid+',"source":"web","target":"site"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:data,
		success:function(str){
			//console.log(str);
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				console.log(oData.object.imageList)
				$('#spacename').val(oData.object.name);
				$('#area').val(oData.object.exfA);
				$('#subject').val(oData.object.sub);
				$('#spacedesc').val(oData.object.intor);
				//缩略图显示
				var thumbsHtml='';
				for(var i=0; i<oData.object.imageList.length; i++){
					thumbsHtml+='<div class="imgwarp"><img src="'+oData.object.imageList[i].imgUrl+'"><a href="javascript:;" imgid="'+oData.object.imageList[i].id+'">删除</a></div>';
				}
				$('#thumbs').html(thumbsHtml)
			}else{
				alert('请求失败,返回上一页;');
				history.go(-1);
			}
		},
		complete:function(){ 
			deleteImages();
		}
	});
	deletes(Sid);
	$('#saves').on('click',function(){
		var $area=$('#area').val();
		var $spacename=$('#spacename').val();
		var $subject=$('#subject').val();
		var $spacedesc=$('#spacedesc').val();
		if($area=='' || $spacename==''){
			$('.addtip').html('区域和场地请填写完整！');
			$('.addtip').addClass('error')
			return false;
		}
		// 获取图片地址 [{imgUrl:xxx},{},{}]
		//alert($('#thumbs img').length);
		var imgArr=[];
		var a='';
		if($('#thumbs img').length!=0){
			for(var i=0; i<$('#thumbs img').length; i++){
				a='{"imgUrl":"'+$('#thumbs img').eq(i).attr('src')+'"}';
				imgArr.push(a);
			}
		};
		var c='['+imgArr+',]';

		var str2=c.replace(c.substring(c.lastIndexOf(',')),']');
		var data='data={"action":"updateOneSite","params":{"imageList":'+str2+',"site":{"id":'+Sid+',"exfA":"'+$area+'","name":"'+$spacename+'","sub":'+$subject+',"intor": "'+$spacedesc+'"}},"source":"web","target":"site"}';

		console.log(data);
		$.ajax({
			url:requrl,
			type:"POST",
			data:data,
			success:function(str){
				//console.log(str);
				operalog("修改了一个场地！");
				responseInfo(str);
			}
		});
	});
});

//删除场地
function deletes(id){
	$('#deletes').on('click',function(){
		var data='data={"action":"deleteOneSite","params":'+id+',"source":"web","target": "site" }';
		 var r=confirm("确定删除本条数据吗?")
		if(r==true){
		    $.ajax({
				url:requrl,
				type:"POST",
				data:data,
				success:function(str){
					console.log(str);
					var oData=$.parseJSON(str);
					if(oData.responseCode==1){
						operalog("删除一个场地！");
						alert(oData.responseMsg+',返回上一页;');
						history.go(-1);
					}else{
						alert(oData.responseMsg);
					}
				}
			});
		}
	});
}

