$(function(){
	
	var oName=$("#name");
	
	var oPass=$("#password");
	var oRepass=$("#repassword");
	var oQq=$("#qq");
	var phone=$("#phone");
	var oEmail=$("#email");
	var oCode=$("#safecode");
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
		if(oPass.val()==""){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('密码不能为空！').addClass('error');
			return;
		}else if(!/^.{6,12}$/.test(oPass.val())){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('用户名只能是6-12位任何字符！').addClass('error');
			return;
		}else{
			oPass.parent().find('span').html('填写正确！').addClass('success');
		}
		if(oRepass.val()==""){
			oRepass.parent().find('span').html('请确认密码！').addClass('error');
			return;
		}else if(oRepass.val()!=oPass.val()){
			oRepass.parent().find('span').html('两次密码不一致！').addClass('error');
			return;
		}else{
			oRepass.parent().find('span').html('两次密码一致！').addClass('success');
		}

		if(phone.val()==""){
			phone.parent().find('span').removeClass('success');
			phone.parent().find('span').html('手机号码不能为空,非常重要！').addClass('error');
			return;
		}else if(!/^1[0-9]{10}$/.test(phone.val())){
			phone.parent().find('span').removeClass('success');
			phone.parent().find('span').html('手机号码输入不正确！').addClass('error');
			return;
		}else{
			phone.parent().find('span').html('输入正确！').addClass('success');
		}


		if(oQq.val()==""){
			oQq.parent().find('span').removeClass('success');
			oQq.parent().find('span').html('QQ不能为空,非常重要！').addClass('error');
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
			oEmail.parent().find('span').html('邮箱不能为空,非常重要！').addClass('error');
			return;
		}else if(!/^([a-zA-Z0-9_])+\@([a-zA-Z0-9\-]{1,5})\.([a-zA-Z0-9]{2,4})+$/.test(oEmail.val())){
			oEmail.parent().find('span').removeClass('success');
			oEmail.parent().find('span').html('邮箱不正确！').addClass('error');
			return;
		}else{
			oEmail.parent().find('span').html('输入正确！').addClass('success');
		}
		

		if(oQq.val()==""){
			oCode.parent().find('span').removeClass('success');
			oCode.parent().find('span').html('安全码不能为空,非常重要！').addClass('error');
			return;
		}else if(!/^[0-9]{4}$/.test(oCode.val())){
			oCode.parent().find('span').removeClass('success');
			oCode.parent().find('span').html('安全码不能为空输入不正确！').addClass('error');
			return;
		}
		$.ajax({
			type:"POST",
			url:"web/Regadd.php",
			data:"act=reg&username="+oName.val()+"&password="+oPass.val()+"&phone="+phone.val()+"&repassword="+oRepass.val()+"&qq="+oQq.val()+"&code="+oCode.val()+"&email="+oEmail.val(),
			success:function(data){
				var oData=eval('('+data+')');
				if(oData.error==0){
					alert(oData.des+',请登录！');
					window.location.href='login';	
				}else if(oData.error==1){
					alert(oData.des)	
				}
			}
		});	
	});	
});



