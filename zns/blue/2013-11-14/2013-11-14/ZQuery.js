//版权 北京智能社©, 保留所有权利

function ZQuery(arg)
{
	this.elements=[];	//存元素
	
	switch(typeof arg) // arg 三种类型 函数 字符串  对象
	{
		case 'function':
			addReady(arg);
			break;
		case 'string':
			this.elements=getEle(arg); // 选择器
			break;
		case 'object':
			if(arg instanceof Array) // 如果是一组对象 则直接存到elements里面
			{
				this.elements=arg;
			}
			else // 单个直接push
			{
				this.elements.push(arg);
			}
			break;
	}
}
//通过绑定给所有的事件添加方法
(function (){
	var arr="click mouseover mouseout blur focus change dblclick".split(' ');
	
	for(var i=0;i<arr.length;i++)
	{
		(function (index){
			ZQuery.prototype[arr[i]]=function (fn)
			{
				this.bind(arr[index], fn);
			};
		})(i);
	}
})();

/*
ZQuery.prototype['click']=function (fn)
{
	this.bind('click', fn);
};

ZQuery.prototype['mouseover']=function (fn)
{
	this.bind('mouseover', fn);
};
*/

ZQuery.prototype.css=function (name, value)
{
	if(arguments.length==2) 
	{
		//设置
		for(var i=0;i<this.elements.length;i++)
		{
			this.elements[i].style[name]=value;
		}
	}
	else
	{
		if(typeof name=='string')// 一个参数   获取 第一个
		{
			//获取
			return getStyle(this.elements[0], name);
		}
		else //json
		{
			//设置-批量
			for(var i=0;i<this.elements.length;i++)
			{
				for(var j in name)
				{
					this.elements[i].style[j]=name[j];
				}
			}
		}
	}
};

ZQuery.prototype.hover=function (fnOver, fnOut)
{
	this.bind('mouseover', fnOver);
	this.bind('mouseout', fnOut);
};
ZQuery.prototype.bind=function (sEv, fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i], sEv, fn);
	}
};




function $(arg)
{
	return new ZQuery(arg);
}























function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}
function addEvent(obj, sEv, fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(sEv, fn, false);
	}
	else
	{
		obj.attachEvent('on'+sEv, function (){// 套一层function 是因为 attachEvent 下面的this 在低版本下不兼容 window
			fn.call(obj);
		});
	}
}
function removeEvent(obj, sEv, fn)
{
	if(obj.removeEventListener)
	{
		obj.removeEventListener(sEv, fn, false);
	}
	else
	{
		obj.detachEvent('on'+sEv, fn);
	}
}

function addReady(fn) //比onload 快
{
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded', fn, false);
	}
	else
	{
		document.attachEvent('onreadystatechange', function (){  
			if(document.readyState=='complete')
			{
				fn && fn();
			}
		});
		
	}
}

function getByClass(oParent, str)
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
}

function _getByStr(aParent, str)
{
	var aChild=[];
	
	//迭代、遍历
	for(var i=0;i<aParent.length;i++)
	{
		switch(str.charAt(0))
		{
			case '#':
				var obj=aParent[i].getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				var arr=getByClass(aParent[i], str.substring(1));
				
				for(var j=0;j<arr.length;j++)
				{
					aChild.push(arr[j]);
				}
				break;
			default:
				//li	li.box	li[type=xxx]	li:has()	li#li1
				
				//li.box
				if(/\w+\.\w+/.test(str))
				{
					var aStr=str.split('.');
					//aStr[0]		标签
					//aStr[1]		class
					
					//第一步
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					
					for(var j=0;j<arr.length;j++)
					{
						//第二步
						if(re.test(arr[j].className))
						{
							aChild.push(arr[j]);
						}
					}
				}
				//li[type=xxx]
				else if(/\w+\[\w+=\w+\]/.test(str))
				{
					var aStr=str.split(/[\[\]]/g);
					//aStr[0]		标签
					//aStr[1]		'type=xxx'
					
					//第一步
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					var aStr2=aStr[1].split('=');
					//aStr2[0]		名字
					//aStr2[1]		值
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr2[0])==aStr2[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//li:has()
				else if(/\w+:\w+(\(.+\))?/.test(str))
				{
					var aStr=str.split(':');
					//aStr[0]		标签
					//aStr[1]		伪类
					
					//第一步
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					//第二步
					//aStr[1]	eq(0)
					switch(aStr[1].split('(')[0])
					{
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'last':
							aChild.push(arr[arr.length-1]);
							break;
						case 'eq':
							var s=aStr[1].match(/\d+/g)[0];
							var n=parseInt(s);
							
							if(!isNaN(n) && n>=0 && n<arr.length)
							{
								aChild.push(arr[n]);
							}
							break;
						case 'odd':	//单数
							for(var j=1;j<arr.length;j+=2)
							{
								aChild.push(arr[j]);
							}
							break;
						case 'contains':
							
							var s=aStr[1].split(/[\(\)]/)[1]; 
							
							for(var j=0;j<arr.length;j++)
							{
								if(arr[j].innerText.indexOf(s)!=-1)
								{
									aChild.push(arr[j]);
								}
							}
							break;
					}
				}
				//li#li1
				else if(/\w+#\w+/.test(str))
				{
					var aStr=str.split('#');
					//aStr[0]		标签
					//aStr[1]		ID
					
					//第一步
					var arr=document.getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//li
				else
				{
					var arr=aParent[i].getElementsByTagName(str);
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.push(arr[j]);
					}
				}
		}
	}
	
	return aChild;
}

function getEle(str)
{
	//1.整理
	var arr=str.replace(/^\s+|\s+$/g, '').split(/\s+/g);
	
	//2.选择
	var aParent=[document];
	var aChild=[];
	
	for(var i=0;i<arr.length;i++)
	{
		aChild=_getByStr(aParent, arr[i]);
		aParent=aChild;
	}
	
	return aChild;
}















