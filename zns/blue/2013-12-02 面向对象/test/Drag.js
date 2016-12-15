// JavaScript Document

function Drag(id)
{
	this.oDiv=document.getElementById(id);
	
	var _this=this;
	this.oDiv.onmousedown=function(ev)
	{
		_this.fnDown(ev);
	}
	
}

Drag.prototype.fnDown=function(ev)
{
	var oEvent=ev||event;
	this.posX=oEvent.clientX-this.oDiv.offsetLeft;
	this.posY=oEvent.clientY-this.oDiv.offsetTop;
	var _this=this;
	document.onmousemove=function(ev)
	{
		_this.fnMove(ev)
	}
	
	document.onmouseup=function()
	{
		_this.fnUp();
	}
	return false;
}
Drag.prototype.fnMove=function(ev)
{
	var oEvent=ev||event;
	this.oDiv.style.left=oEvent.clientX-this.posX+'px';
	this.oDiv.style.top=oEvent.clientY-this.posY+'px';
}
Drag.prototype.fnUp=function()
{
		document.onmousemove=null;
		document.onmouseup=null;
}