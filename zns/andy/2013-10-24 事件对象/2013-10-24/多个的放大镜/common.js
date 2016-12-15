function findArr(arr, n)
{
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==n)
		{
			return true;
		}
	}
	
	return false;
}

function getByClass(oParent, sClass)
{
	//1.所有的都选出来
	var aEle=oParent.getElementsByTagName('*');
	
	//2.一个个筛选
	var arr=[];
	for(var i=0;i<aEle.length;i++)
	{
		var aTmp=aEle[i].className.split(' ');
		
		if(findArr(aTmp, sClass))	//有class——这个元素要
		{
			arr.push(aEle[i]);
		}
		
		/*if(aEle[i].className==sClass)
		{
			//return aEle[i];
			arr.push(aEle[i]);
		}*/
	}
	
	return arr;
}