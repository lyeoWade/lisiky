//版权 北京智能社©, 保留所有权利

exports.url2json=function (str)
{
	if(!str)return {};
	
	var arr=str.split('&');
	var result={};
	
	for(var i=0;i<arr.length;i++)
	{
		var arr2=arr[i].split('=');
		//arr3[0]	->	'user'	名字
		//arr3[1]	->	'blue'	值
		
		result[arr2[0]]=arr2[1];
	}
	
	return result;
};