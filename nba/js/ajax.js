



function ajax(url,fns,fnfaild)
{
	
	if(window.XMLHttpRequest){
		
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	
	oAjax.open('GET',url,true);
	
	oAjax.send();
	
	oAjax.onreadystatechange=function()
	{
		
		if(oAjax.readyState==4){
			
			if(oAjax.status==200){
				
				fns(oAjax.responseText);
				
			}else{
				if(fnfaild){
					fnfaild()	
				}	
			}
			
		}
		
	};
	
	
};






