// JavaScript Document

function addDrag(id)
{
	Drag.call(this,id)
}


//addDrag.prototype=Drag.prototype;

for(var i in Drag.prototype)
{
	addDrag.prototype[i]=Drag.prototype[i]
}

addDrag.prototype.fnMove=function(ev)
{
	
	var oEvent=ev||event;
	var l=oEvent.clientX-this.posX;
	var t=oEvent.clientY-this.posY;
	
	if(l<=0)
	{
		l=0;
	}else if(l>document.documentElement.clientWidth-this.oDiv.offsetWidth)
	{
		l=document.documentElement.clientWidth-this.oDiv.offsetWidth
	}
	
	this.oDiv.style.left=l+'px';
	this.oDiv.style.top=t+'px';
}