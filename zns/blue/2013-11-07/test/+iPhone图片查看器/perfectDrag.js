/*
智能社© - http://www.zhinengshe.com/

微博：@北京智能社
微信：zhi_neng_she

最具深度的前端开发培训机构 HTML+CSS/JS/HTML5
*/


function znsperfectDragSimple(vElement, fnOnDragStart, fnOnDraging, fnOnDragEnd)
{
	var oElementDrag=null;
	
	if(typeof vElement == 'string')
	{
		oElementDrag=document.getElementById(vElement);
	}
	else if(typeof vElement == 'object')
	{
		oElementDrag=vElement;
	}
	
	this.creator=znsPerfectDrag;
	
	this.creator
	(
		oElementDrag,
		function ()
		{
			return {x: oElementDrag.offsetLeft, y: oElementDrag.offsetTop};
		},
		function (x, y)
		{
			oElementDrag.style.left=x+'px';
			oElementDrag.style.top=y+'px';
			
			if(fnOnDraging)
			{
				fnOnDraging(x, y);
			}
		},
		fnOnDragStart, fnOnDragEnd
	);
	
	delete this.creator;
}

znsperfectDragSimple.prototype=znsPerfectDrag.prototype;

function znsPerfectDrag(oElementDrag, fnGetPos, fnDoMove, fnOnDragStart, fnOnDragEnd)
{
	var obj=this;
	
	this.oElement=oElementDrag;
	
	this.oElement.style.overflow='hidden';
	
	this.fnGetPos=fnGetPos;
	this.fnDoMove=fnDoMove;
	this.fnOnDragStart=fnOnDragStart;
	this.fnOnDragEnd=fnOnDragEnd;
	
	this.__oStartOffset__={x:0, y:0};
	
	this.oElement.onmousedown=function (ev)
	{
		obj.startDrag(window.event || ev);
		
		if(oElementDrag.setCapture)oElementDrag.setCapture();
		
		return false;
	};
	
	this.fnOnMouseUp=function (ev)
	{
		obj.stopDrag(window.event || ev);
		
		if(oElementDrag.releaseCapture)oElementDrag.releaseCapture();
	};
	
	this.fnOnMouseMove=function (ev)
	{
		obj.doDrag(window.event || ev);
	};
}

znsPerfectDrag.prototype.enable=function ()
{
	var obj=this;
	
	this.oElement.onmousedown=function (ev)
	{
		obj.startDrag(window.event || ev);
	};
};

znsPerfectDrag.prototype.disable=function ()
{
	this.oElement.onmousedown=null;
};

znsPerfectDrag.prototype.startDrag=function (oEvent)
{
	var oPos=this.fnGetPos();
	
	var x=oEvent.clientX;
	var y=oEvent.clientY;
	
	if(this.fnOnDragStart)
	{
		this.fnOnDragStart();
	}
	
	this.__oStartOffset__.x=x-oPos.x;
	this.__oStartOffset__.y=y-oPos.y;
	
	if(this.oElement.setCapture)
	{
		this.oElement.setCapture();
		
		this.oElement.onmouseup=this.fnOnMouseUp;
		this.oElement.onmousemove=this.fnOnMouseMove;
	}
	else
	{
		document.addEventListener("mouseup", this.fnOnMouseUp, true);
		document.addEventListener("mousemove", this.fnOnMouseMove, true);
		
		window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
	}
};

znsPerfectDrag.prototype.stopDrag=function (oEvent)
{
	if(this.oElement.releaseCapture)
	{
		this.oElement.releaseCapture();
		
		this.oElement.onmouseup=null;
		this.oElement.onmousemove=null;
	}
	else
	{
		document.removeEventListener("mouseup", this.fnOnMouseUp, true);
		document.removeEventListener("mousemove", this.fnOnMouseMove, true);
		
		window.releaseEvents(Event.MOUSE_MOVE | Event.MOUSE_UP);
	}
	
	if(this.fnOnDragEnd)
	{
		if(oEvent.clientX==this.__oStartOffset__.x && oEvent.clientY==this.__oStartOffset__.y)
		{
			this.fnOnDragEnd(false);
		}
		else
		{
			this.fnOnDragEnd(true);
		}
	}
};

znsPerfectDrag.prototype.doDrag=function (oEvent)
{
	var x=oEvent.clientX;
	var y=oEvent.clientY;
	
	this.fnDoMove(x-this.__oStartOffset__.x, y-this.__oStartOffset__.y);
};

