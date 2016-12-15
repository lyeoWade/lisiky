// JavaScript Document
function extend(parent,fn,json)
{
	function Child()
	{
		parent.apply(this,arguments);
		fn && fn.apply(this, arguments);
	}
	// 继承方法
	for(var i in parent.prototype)
	{
		
		Child.prototype[i]=parent.prototype[i];
		
	}
	
	// 添加新方法
	
	for(var i in json)
	{
		Child.prototype[i]=json[i];
	}
	alert(123)
	return Child;
}