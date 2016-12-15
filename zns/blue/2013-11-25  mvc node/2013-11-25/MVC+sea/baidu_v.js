//版权 北京智能社©, 保留所有权利

//v-展现数据
function createList(arr)
{
	var oUl=document.getElementById('ul1');
	
	oUl.innerHTML='';
	for(var i=0;i<arr.length;i++)
	{
		var oLi=document.createElement('li');
		oLi.innerHTML=arr[i];
		
		oUl.appendChild(oLi);
	}
}

function createRelated(arr)
{
	var oDiv=document.getElementById('div2');
	
	oDiv.innerHTML='';
	
	for(var i=0;i<arr.length;i++)
	{
		var oA=document.createElement('a');
		oA.href='javascript:;';
		oA.innerHTML=arr[i];
		
		oDiv.appendChild(oA);
	}
}