//版权 北京智能社©, 保留所有权利

function extend(Parent, fn, json)
{
	function Child()
	{
		Parent.apply(this, arguments);
		
		//子级的属性
		fn && fn.apply(this, arguments);
	}
	
	//继承父级方法
	for(var i in Parent.prototype)
	{
		Child.prototype[i]=Parent.prototype[i];
	}
	
	//子级的方法
	for(var i in json)
	{
		Child.prototype[i]=json[i];
	}
	
	return Child;
}