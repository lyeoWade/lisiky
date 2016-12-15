

var addDrag=extend(Drag,null,{
	
	fnMove : function(ev)
	{
		var oEvent=ev||event;
		var l=oEvent.clientX-this.posX;
		var t=oEvent.clientY-this.posY;
		
		if(l<0)l=0;
		else if(l>document.documentElement.clientWidth-this.oDiv.offsetWidth)
		{
			l=document.documentElement.clientWidth-this.oDiv.offsetWidth;
		}
		
		this.oDiv.style.left=l+'px';
		this.oDiv.style.top=t+'px';
	}
	
	});