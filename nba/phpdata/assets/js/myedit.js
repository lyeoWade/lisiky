// 修改类别~~~~~~~~~~~~~~

$(function(){
	
});

function editfn(url,type){
	var $oBtn=$('.editBtn');
	var sHtml='';
	var $oClassTitle=$oBtn.parents('table').find('thead th');

	$oBtn.each(function(index,elements){
		$oBtn.eq(index).on('click',function(){
			
			$td=$(this).parents('tr').find('td');

			for(var i=1; i<$td.length-1; i++){
				if(type==1){
					sHtml+='<div class@"form-group"><label for@"lastname'+i+'" class@"col-sm-2 control-label">'+$oClassTitle[i].innerHTML+'</label><div class@"col-sm-5"><textarea class@"form-control" rows@"3">'+$td[i].innerHTML+'</textarea></div></div>';
				}else{
					sHtml+='<div class@"form-group"><label for@"lastname'+i+'" class@"col-sm-2 control-label">'+$oClassTitle[i].innerHTML+'</label><div class@"col-sm-5"><input type@"text" class@"form-control" id@"lastname'+i+'" value@"'+$td[i].innerHTML+'" placeholder@""></div></div>';
				}
				
			}
			var newurl=url+'?content='+sHtml;
			window.location.href=newurl;
			//alert(sHtml);
		});
	});

	// 删除

	var oDelete=$(".odelete");

	oDelete.each(function(index,elements){
		oDelete.eq(index).on('click',function(){
			var oTr=$(this).parents('tr');
			oTr.remove();
		});
	});

	
}

function slh(obj,num){
	var oDesc=$(obj);
	var sHtml='';

	for(var i=0; i<oDesc.length; i++){
		sHtml=oDesc[i].innerHTML;
		oDesc.eq(i).attr('title',sHtml)
		//alert(oDesc[i].innerHTML)
		if(oDesc[i].innerHTML.length>num){
			oDesc[i].innerHTML=oDesc[i].innerHTML.substring(0,num)+'...';
		}
	}
}