//版权 北京智能社©, 保留所有权利

var LimitDrag=extend(Drag, null, {
	fnMove:	function (ev)		//重载：覆盖父级的方法
	{
		var oEvent=ev||event;
		
		var l=oEvent.clientX-this.disX;
		var t=oEvent.clientY-this.disY;
		
		if(l<0)l=0;
		else if(l>document.documentElement.clientWidth-this.obj.offsetWidth)
		{
			l=document.documentElement.clientWidth-this.obj.offsetWidth;
		}
		
		this.obj.style.left=l+'px';
		this.obj.style.top=t+'px';
	}
});