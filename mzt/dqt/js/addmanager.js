
$(function(){

	$('#addmanager').on('click',function(){
		var $realname=$('#realname').val();
		var $job=$('#job').val();
		var $phone=$('#mobile').val();
		var $tel=$('#phone').val();
		var $password=$('#password').val();

		if($phone=='' || !Uiho.ver.moblie($phone)){
			$('.addtip').html('请输入正确的手机号码！');
			$('.addtip').addClass('error')
			return false;
		}else if($password=='' ||  !Uiho.ver.password($password)){
			$('.addtip').html('请输入正确的密码！');
			$('.addtip').addClass('error')
			return false;
		}

		$.ajax({
			url:requrl,
			type:"POST",
			data:'data={"action": "addOneManager","params": {"jobDesc": "'+$job+'","password": "'+$password+'","phone": "'+$phone+'","realname": "'+$realname+'","tel": "'+$tel+'"},"source": "web","target": "manager"}',
			success:function(str){
				var oData=$.parseJSON(str);
				console.log(oData);
				if(oData.responseCode==1){
					$('.addtip').html(oData.responseMsg);
					$('.addtip').addClass('success');
				}else{
					$('.addtip').html('新增失败！');
					$('.addtip').addClass('error');
				}
			}
		});
	});
});








