$(function(){
	//analysisCookie();
});

//添加管理员
function addmanager(){

}

function analysisCookie(){
	//var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));

	$('.username').html(cookieValue.realname);
	switch(cookieValue.role){
		case 1:
			//alert('超级管理员');
		break;
		case 2:
			$('#addmanager').remove();
		break;
	}
	// if(cookieValue.role){

	// }else{

	// }
}















