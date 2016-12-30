//版权 北京智能社©, 保留所有权利

function Drag(obj)
{
	var _this=this;
	this.obj=obj;
	
	obj.onmousedown=function (ev)
	{
		_this.fnDown(ev);
		
		return false;
	};
}

Drag.prototype.fnDown=function (ev)
{
	var _this=this;
	var oEvent=ev||event;
	
	this.disX=oEvent.clientX-this.obj.offsetLeft;
	this.disY=oEvent.clientY-this.obj.offsetTop;
	
	document.onmousemove=function (ev)
	{
		_this.fnMove(ev);
	};
	document.onmouseup=function ()
	{
		_this.fnUp();
	};
};
Drag.prototype.fnMove=function (ev)
{
	var oEvent=ev||event;
	
	this.obj.style.left=oEvent.clientX-this.disX+'px';
	this.obj.style.top=oEvent.clientY-this.disY+'px';
};
Drag.prototype.fnUp=function ()
{
	document.onmousemove=null;
	document.onmouseup=null;
};