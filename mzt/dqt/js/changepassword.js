$(function(){

	$('#changepassword').on('click',function(){

		var $oldpassword=$('#oldpassword').val();
		var $newpassword=$('#newpassword').val();
		
		if($oldpassword=='' || $newpassword=='' || !Uiho.ver.password($newpassword) || !Uiho.ver.password($oldpassword)){
			$('.addtip').html('请输入正确的密码！');
			$('.addtip').addClass('error')
			return false;
		}

		//用户id从cookie拿
		$.ajax({
			url:requrl,
			type:"POST",
			data:'data={"action": "updateManagerPassword","params": {"managerId":"'+cookieValue.id+'","newPassword": "'+$newpassword+'","oldPassword": "'+$oldpassword+'"},"source": "web","target": "manager"}',
			success:function(str){
				responseInfo(str);
				setTimeout(function(){
					window.parent.location.href='login.html';
				},300)
			}
		});
	})
});