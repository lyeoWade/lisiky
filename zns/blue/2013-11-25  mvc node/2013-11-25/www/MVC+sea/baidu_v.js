//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	exports.createList=function (ulId, arr)
	{
		var oUl=document.getElementById(ulId);
		
		oUl.innerHTML='';
		for(var i=0;i<arr.length;i++)
		{
			var oLi=document.createElement('li');
			oLi.innerHTML=arr[i];
			
			oUl.appendChild(oLi);
		}
	};
	
	exports.createRelated=function (divId, arr)
	{
		var oDiv=document.getElementById(divId);
		
		oDiv.innerHTML='';
		
		for(var i=0;i<arr.length;i++)
		{
			var oA=document.createElement('a');
			oA.href='javascript:;';
			oA.innerHTML=arr[i];
			
			oDiv.appendChild(oA);
		}
	};
});