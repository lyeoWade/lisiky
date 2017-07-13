


$(function(){
	
	var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));

	//console.log(cookieValue);

	if(cookieValue.role==2){
		$('#manage').remove();
		$('#addBug').remove();
		$('#addDemand').remove();
	}else{

	};

	$('#out').on('click',function(){
		//alert(cookieValue);
		if(cookieValue.role==2){
			window.location.href='managerlogin.html';
		}else{
			window.location.href='login.html';
		};
		Uiho.cookies.removeCookie('userinfo');
	})
});



