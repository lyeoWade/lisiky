$(function(){


	var filehtml='';
	var num=0;
	$('#addbanner').on('click',function(){
		num++;
		filehtml='<div class="form-group "><label for="phone" class="control-label col-lg-3 col-sm-3">封面图</label><div class="col-lg-6 col-sm-6"><input type="file" id="fileInput'+num+'" name="fileInput" class="form-control fileInput"></div></div>';
		$('#filewarp').append(filehtml);
		changes();
	});
	changes();
	
	$('#upload').on('click',function(){
		$('.fileInput').each(function(index){
			var f=$('.fileInput').get(index).files[0];
			//alert(f)
			uploadFile(f);
		});
	});

	//删除图片 


	//新增


	$('#addSpace').on('click',function(){
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
		//提交
		var datas='data={"action":"addOneSite","params":{"imageList":'+str2+',"site":{"exfA":"'+$area+'","name": "'+$spacename+'","sub": '+$subject+',"intor": "'+$spacedesc+'"}},"source":"web","target":"site"}';

		//console.log(datas);

		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				console.log(str);
				operalog("新增一个场地！")
				responseInfo(str);
			}
		});
	});
});
function changes(){
	$('.fileInput').on('change',function(){
		var obj=$(this);
		fileSelected(obj);
	})
}


