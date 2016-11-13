
$(function(){
	//获取我的资料
	var $userid=getCookie('userid');
	$.ajax({
		type:"POST",
		url:'phpdata/datapage/user.php',
		data:'type=getUserInfo&userid='+$userid,
		success:function(str){
			console.log(str);
			var sData=eval('('+str+')');
			if(sData.respondCode==0){
				$('#titles').val(sData.username);
				$('#tel').val(sData.phone);
				$('#qq').val(sData.QQ);
				$('#email').val(sData.email);
				$('#yoursId').val('http://www.ilovenba.cn/index.html?gid='+sData.id)
			}else{

			}
		}
	})
});
