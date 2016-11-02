$(function(){
	
	//console.log(cookieValue);
	if(window.location.href.indexOf('id')==-1){
		//alert(123)
		//普通管理员修改自己的信息
		editMyInfo(cookieValue.id);
		initInfo();
	}else{
		//超级管理员修改普通管理员信息
		var userInfo=Uiho.tool.geturldata(window.location.href);//判断每个普通管理员的id
		
		editMyInfo(userInfo.id);
		$('#realname').val(decodeURIComponent(userInfo.realname)); //解码
		$('#job').val(decodeURIComponent(userInfo.job));
		$('#mobile').val(userInfo.phone);
		$('#tel').val(userInfo.tel);
	}
	// 初始化
	function initInfo(){
		$('#realname').val(cookieValue.realname);
		$('#job').val(cookieValue.jobDesc);
		$('#mobile').val(cookieValue.phone);
		$('#tel').val(cookieValue.tel);
	};
	
	//alert(cookieValue)
	function editMyInfo(managerId){
		
		$('#editMyInfo').on('click',function(){
			var $realname=$('#realname').val();
			var $job=$('#job').val();
			var $tel=$('#tel').val();
			//不是必传参数不用验证
			$.ajax({
				url:requrl,
				type:"POST",
				data:'data={"action": "updateManagerInfo","params": {"managerId":"'+managerId+'","jobDesc": "'+$job+'","realname": "'+$realname+'","tel": "'+$tel+'"},"source": "web","target": "manager"}',
				success:function(str){
					responseInfo(str);
					cookieValue.tel=$tel;
					var newInfo=JSON.stringify(cookieValue);
					Uiho.cookies.setCookie('userinfo',newInfo,10);
				}
			});
		})

	}
});