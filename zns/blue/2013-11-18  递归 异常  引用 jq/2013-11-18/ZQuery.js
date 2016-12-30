//版权 北京智能社©, 保留所有权利

(function (window){








function ZQuery(arg)
{
	this.elements=[];	//存元素
	this.DOMString='';	//存待创建的字符串
	
	switch(typeof arg) // 判断传进来的参数是什么类型  三种类型   函数 字符串->添加、获取  对象
	{
		case 'function':
			addReady(arg);
			break;
		case 'string':
			if(arg.indexOf('<')!=-1)
			{
				//创建
				this.DOMString=arg;
			}
			else
			{
				this.elements=getEle(arg);
			}
			break;
		case 'object':
			if(arg instanceof Array)
			{
				this.elements=arg;
			}
			else
			{
				this.elements.push(arg);
			}
			break;
	}
}

var arr="click mouseover mouseout blur focus change dblclick".split(' ');

for(var i=0;i<arr.length;i++)
{
	(function (index){
		ZQuery.prototype[arr[i]]=function (fn)
		{
			this.bind(arr[index], fn);
			
			return this;
		};
	})(i);
}

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
		if(typeof name=='string')
		{
			//获取
			return getStyle(this.elements[0], name);
		}
		else
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
	
	return this;
};

ZQuery.prototype.html=function (str)
{
	if(arguments.length==0)
	{
		return this.elements[0].innerHTML;
	}
	else
	{
		this.each(function (){
			this.innerHTML=str;
		});
	}
	return this;
};

ZQuery.prototype.hover=function (fnOver, fnOut)
{
	this.mouseenter(fnOver);
	this.mouseleave(fnOut);
	
	return this;
};

ZQuery.prototype.bind=function (sEv, fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		addEvent(this.elements[i], sEv, fn);
	}
	
	return this;
};

ZQuery.prototype.mouseleave=function (fn)
{
	this.bind('mouseout', function (ev){
		var to=ev.toElement||ev.relatedTarget;
		
		if(isChild(this, to))return;
		
		fn && fn.call(this, ev);
	});
	
	return this;
};

ZQuery.prototype.mouseenter=function (fn)
{
	this.bind('mouseover', function (ev){
		
		var from=ev.fromElement||ev.relatedTarget;
		
		if(isChild(this, from))return;
		
		fn && fn.call(this, ev);
	});
	
	return this;
};

ZQuery.prototype.toggle=function ()
{
	var _this=this;
	var _args=arguments;
	//var count=0;
	
	for(var i=0;i<this.elements.length;i++)
	{
		//多了一层函数——this就会变
		(function (count){
			addEvent(_this.elements[i], 'click', function (ev){
				_args[count%_args.length].call(this, ev);
				
				count++;
			});
		})(0);
	}
	
	return this;
};

ZQuery.prototype.appendTo=function (str)
{
	if(str instanceof ZQuery)
	{
		var aParent=str.elements;
	}
	else
	{
		var aParent=getEle(str);
	}
	
	for(var i=0;i<aParent.length;i++)
	{
		appendTo(aParent[i], this.DOMString);
	}
	
	return this;
};

ZQuery.prototype.prependTo=function (str)
{
	var aParent=getEle(str);
	
	for(var i=0;i<aParent.length;i++)
	{
		prependTo(aParent[i], this.DOMString);
	}
	
	return this;
};

ZQuery.prototype.animate=function (json, time, type, fnEnd)
{
	for(var i=0;i<this.elements.length;i++)
	{
		startMove(this.elements[i], json, {
			time:	time,
			type:	type,
			end:	fnEnd
		});
	}
	
	return this;
};

ZQuery.prototype.each=function (fn)
{
	for(var i=0;i<this.elements.length;i++)
	{
		fn.call(this.elements[i], i, this.elements[i]);
	}
	
	return this;
};

ZQuery.prototype.attr=function (name, value)
{
	if(arguments.length==2)//参数为2 那就是设置
	{
		this.each(function (){
			this.setAttribute(name, value);  // setAttribute 和getAttribute 配对 两个必须配对使用  不然会出现null
		});
	}
	else
	{
		if(typeof name=='string') // 参数为1 时  直接读取 
		{
			return this.elements[0].getAttribute(name);
		}
		else
		{
			this.each(function (){  // 一组参数 json 
				for(var i in name)
				{
					this.setAttribute(i, name[i]); 
				}
			});
		}
	}
};

ZQuery.prototype.eq=function (n)
{
	return $(this.elements[n]); // $() // ZQuery对象
}; // ZQuery对象 

ZQuery.prototype.get=function (n)
{
	return this.elements[n];
};  //  原生的 对象

ZQuery.prototype.index=function ()
{
	var obj=this.elements[this.elements.length-1]; // 取最后一个
	
	//obj在同级元素中序号
	
	var aSibling=obj.parentNode.children; // 取元素得父级的子集
	
	for(var i=0;i<aSibling.length;i++)
	{
		if(aSibling[i]==obj)return i; 
	}
};

$.fn=ZQuery.fn=ZQuery.prototype;

$.fn.extend=function (json)
{
	for(var i in json)
	{
		$.fn[i]=json[i];
	}
};

// 插件机制




//暴露给外面
function $(arg)
{
	return new ZQuery(arg);
}

window.ZQuery=ZQuery;
window.$=$;

$.ajax=function (options)
{
	function data2url(json)
	{
		var arr=[];
		for(var i in json)
		{
			arr.push(i+'='+json[i]);
		}
		return arr.join('&');
	}
	
	options=options||{};
	options.type=options.type||'get';
	options.data=options.data||{};
	
	//1.创建
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHttp');
	}
	
	//2.连接
	//GET
	var sData=data2url(options.data);
	if(options.type.toLowerCase()=='get')
	{
		oAjax.open('GET', options.url+'?'+sData, true);
		
		oAjax.send();
	}
	else
	{
		//POST
		oAjax.open('POST', options.url, true);
		//添加额外的头——告诉浏览器，数据类型
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		//send(数据)
		oAjax.send(sData);
	}
	
	//4.接收
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				options.success && options.success(oAjax.responseText);
			}
			else
			{
				options.error && options.error();
			}
			options.complete && options.complete();
			
			//完成了，超时不会发生
			clearTimeout(timer);
		}
	};
	
	//超时
	if(options.timeout)
	{
		var timer=setTimeout(function (){
			options.error && options.error();
			options.complete && options.complete();
			
			oAjax.onreadystatechange=null;
		}, options.timeout);
	}
};




















function appendTo(oParent, str)
{
	var oTmp=document.createElement('div');
	
	oTmp.innerHTML=str;
	
	while(oTmp.childNodes.length)
	{
		oParent.appendChild(oTmp.childNodes[0]);
	}
}

function prependTo(oParent, str)
{
	var oTmp=document.createElement('div');
	
	oTmp.innerHTML=str;
	
	while(oTmp.childNodes.length)
	{
		if(oParent.children.length==0)
		{
			oParent.appendChild(oTmp.childNodes[0]);
		}
		else
		{
			oParent.insertBefore(oTmp.childNodes[0], oParent.children[0]);
		}
	}
}

function isChild(oParent, obj)
{
	while(obj)
	{
		if(oParent==obj)return true;
		obj=obj.parentNode;
	}
	
	return false;
}

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function startMove(obj, json, options)
{
	function getStyle(obj, name)
	{
		var value=obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
		
		if(name=='opacity')
		{
			value=Math.round(parseFloat(value)*100);
		}
		else
		{
			value=parseInt(value);
		}
		
		return value;
	}
	
	//-1.参数
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'buffer';
	
	//0.起点、距离
	var start={};
	var dis={};
	var count=parseInt(options.time/30);
	var n=0;
	
	for(var i in json)
	{
		start[i]=getStyle(obj, i);
		dis[i]=json[i]-start[i];
	}
	
	//1.关-开
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var i in json)
		{
			var cur=0;
			switch(options.type)
			{
				case 'linear':
					cur=start[i]+dis[i]*n/count;
					break;
				case 'buffer':
					var a=1-n/count;
					cur=start[i]+dis[i]*(1-a*a*a);
					break;
			}
			
			if(i=='opacity')
			{
				obj.style.filter='alpha(opacity:'+cur+')';
				obj.style.opacity=cur/100;
			}
			else
			{
				obj.style[i]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			options.end && options.end();
		}
	}, 30);
}

function addEvent(obj, sEv, fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(sEv, function (ev){
			if(false==fn.call(obj, ev))
			{
				ev.preventDefault();
				ev.cancelBubble=true;
			}
		}, false);
	}
	else
	{
		obj.attachEvent('on'+sEv, function (){
			if(false==fn.call(obj, event))
			{
				event.cancelBubble=true;
				return false;
			}
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

function addReady(fn)
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

function getEle(str)
{
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















})(window);