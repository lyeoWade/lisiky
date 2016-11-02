$(function(){

	$("#loginbtn").on('click',function(){
		var $mobile=$('#mobile').val();
		var $pass=$('#password').val();
		
		if($mobile=='' || !Uiho.ver.moblie($mobile)){
			$('#tip').html('请输入正确的手机号码！');
			$('#tip').addClass('error')
			return false;
		}else if($pass=='' ||  !Uiho.ver.password($pass)){
			$('#tip').html('请输入正确的密码！');
			$('#tip').addClass('error')
			return false;
		};
		var reqdata = '{"action":"managerLogin","params":{"password":"'+$pass+'","phone": "'+$mobile+'"},"source":"web","target":"manager"}';
		$.ajax({		
			url:requrl,
			type:"POST",
			data:'data='+reqdata+'',
			success:function(str){
				var oData=$.parseJSON(str);
				console.log(oData.object);
				if(oData.responseCode==1){
					$('#tip').html('登陆成功!跳转中...');
					$('#tip').addClass('success');

					//得到object 将所有的存到cookie里面
					var object=JSON.stringify(oData.object);
					Uiho.cookies.setCookie('userinfo',object,10);
					
					setTimeout(function(){
						window.location.href="index.html";
					},1000)
				}else{
					$('#tip').html('用户名或密码不正确或被禁用！');
					$('#tip').addClass('error')
				}
				
			}
		})
	});

});