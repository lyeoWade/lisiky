//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	exports.getByClass=function (oParent, sClass)
	{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(str);
	}
	
	var aEle=oParent.getElementsByTagName('*');
	var re=new RegExp('\\b'+str+'\\b');
	var result=[];
	
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			result.push(aEle[i]);
		}
	}
	
	return result;
	};
	exports.getStyle=function (obj, name)
	{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
	};
});