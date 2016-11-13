$(function(){
	
	var oName=$("#name");
	
	var oText=$(".textarea");
	var oQq=$("#qq");
	var oEmail=$("#email");
	var oTel=$("#tel");
	$('#regsub').on("click",function(){
		
		if(oName.val()==""){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('用户名不能为空！').addClass('error');
			return;
		}else if(!/^[0-9a-zA-Z_\u4e00-\u9fa5]{2,16}$/.test(oName.val())){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('请输入2-16位汉字字母数字下划线').addClass('error');
			return;
		}else{
			oName.parent().find('span').html('填写正确！').addClass('success');
		}
		
		
		if(oQq.val()==""){
			oQq.parent().find('span').removeClass('success');
			oQq.parent().find('span').html('QQ不能为空！').addClass('error');
			return;
		}else if(!/^[1-9][0-9]{4,12}$/.test(oQq.val())){
			oQq.parent().find('span').removeClass('success');
			oQq.parent().find('span').html('QQ输入不正确！').addClass('error');
			return;
		}else{
			oQq.parent().find('span').html('输入正确！').addClass('success');
		}
		if(oEmail.val()==""){
			oEmail.parent().find('span').removeClass('success');
			oEmail.parent().find('span').html('邮箱不能为空！').addClass('error');
			return;
		}else if(!/^([a-zA-Z0-9_])+\@([a-zA-Z0-9\-]{1,5})\.([a-zA-Z0-9]{2,4})+$/.test(oEmail.val())){
			oEmail.parent().find('span').removeClass('success');
			oEmail.parent().find('span').html('邮箱不正确！').addClass('error');
			return;
		}else{
			oEmail.parent().find('span').html('输入正确！').addClass('success');
		}
		if(oText.val()==""){
			oText.parent().find('span').removeClass('success');
			oText.parent().find('span').html('内容不能为空！').addClass('error');
			return;
		}else{
			oText.parent().find('span').html('ok！').addClass('success');
		}
		$.ajax({
			type:"POST",
			url:"web/Regadd.php",
			data:"act=contact&username="+oName.val()+"&tel="+oTel.val()+"&content="+oText.val()+"&qq="+oQq.val()+"&email="+oEmail.val(),
			success:function(data){
				var datas=eval('('+data+')');
				alert(datas.des);
			}
		});	
		
	});	
});



