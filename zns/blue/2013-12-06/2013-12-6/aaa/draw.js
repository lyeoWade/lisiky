//版权 北京智能社©, 保留所有权利

function Rect(gd)
{
	this.gd=gd;
	
	this.left=0;
	this.top=0;
	
	this.width=100;
	this.height=100;
	
	this.rotate=0;
	
	this.borderColor='black';
	this.bgColor='black';
}

Rect.prototype.draw=function ()
{
	var gd=this.gd;
	
	gd.save();
	
	gd.translate(this.left+this.width/2, this.top+this.height/2);
	gd.rotate(d2a(this.rotate));
	
	gd.strokeStyle=this.borderColor;
	//gd.fillStyle=this.bgColor;
	
	gd.strokeRect(-this.width/2,-this.height/2,this.width,this.height);
	//gd.fillRect(-this.width/2,-this.height/2,this.width,this.height);
	
	gd.restore();
};

//图片——源图xywh
function Sprite(gd, img, sx, sy, sw, sh)
{
	var _this=this;
	
	Rect.apply(this, arguments);
	
	this.width=sw;
	this.height=sh;
	
	this.img=null;
	
	this.sx=sx;
	this.sy=sy;
	this.sw=sw;
	this.sh=sh;
	
	//加载图片
	if(typeof img=='string')
	{
		var oImg=new Image();
		
		oImg.onload=function ()
		{
			_this.img=this;
		};
		
		oImg.src=img;
	}
	else
	{
		this.img=img;
	}
}

Sprite.prototype.draw=function ()
{
	if(!this.img)return;
	
	var gd=this.gd;
	
	gd.save();
	
	gd.translate(this.left+this.width/2, this.top+this.height/2);
	gd.rotate(d2a(this.rotate));
	
	gd.drawImage(
		this.img,
		this.sx, this.sy, this.sw, this.sh,
		-this.width/2, -this.height/2, this.width, this.height
	);
	
	gd.restore();
};




function startMove(obj, json, fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;
		for(var i in json)
		{
			var cur=obj[i];
			
			var speed=(json[i]-cur)/12;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[i])
			{
				bStop=false;
			}
			
			obj[i]=cur+speed;
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			
			fnEnd && fnEnd();
		}
	}, 1000/FPS);
}





































function d2a(n)
{
	return n*Math.PI/180;
}

function a2d(n)
{
	return n*180/Math.PI;
}












