//版权 北京智能社©, 保留所有权利

function setCookie(name, value, iDay)
{
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	
	document.cookie=name+'='+value+';expires='+oDate;
}

function getCookie(name)
{
	var arr=document.cookie.split('; ');
	
	var re=new RegExp('\\b'+name+'=\\w+');
	
	var res=document.cookie.match(re);
	
	if(res)
	{
		return res[0].split('=')[1];
	}
	else
	{
		return '';
	}
}

function removeCookie(name)
{
	setCookie(name, '1', -1);
}