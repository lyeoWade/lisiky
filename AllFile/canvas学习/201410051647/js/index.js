window.requestAnimFrame=function(){
	
	return window.requestAnimationFrame   ||  
	window.webkitRequestAnimationFrame    ||
	window.mozRequestAnimationFrame       ||
	window.oRequestAnimationFrame         ||
	window.msRequestAnimationFrame        ||
	function(a){
		window.setTimeout(a,1E3/60)
	}}();

/* 对于一个侦中对DOM的所有操作，只进行一次Layout和Paint。 
如果发生动画的元素被隐藏了，那么就不再去Paint。 
window.requestAnimFrame = (function(){  
        return  window.requestAnimationFrame       ||   
        window.webkitRequestAnimationFrame ||   
        window.mozRequestAnimationFrame    ||   
        window.oRequestAnimationFrame      ||   
        window.msRequestAnimationFrame     ||   
        function( callback ){  
            window.setTimeout(callback, 1000/60);  
        };  
})();  
//调用  
function animationLoop(elem){  
        requestAnimFrame(animationLoop);  
//logic  
}  

Or

window.requestAnimFrame = (function(w, r) {   
    w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r] || w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };  
    return w['r'+r];  
})(window, 'equestAnimationFrame');  

 */

document.onselectstart = function() {
  return false;
}; 
/*
使用js禁止用户选中网页上的内容，IE及Chrome下的方法一样。使用onselectstart，例如 IE: <body onselectstart="return false"> Firefox下，控制css: body { -moz-user-select: none; }
*/


var c = document.getElementById('c');
var ctx = c.getContext('2d');


c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;


var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);} // 随机数   ~~ 相当于parseInt 


ctx.lineCap = 'round'; 

/*lineCap 属性设置或返回线条末端线帽的样式。

 
值	描述
butt	默认。向线条的每个末端添加平直的边缘。
round	向线条的每个末端添加圆形线帽。
square	向线条的每个末端添加正方形线帽
*/

var orbs = [];
var orbCount = 30;
var radius;

var trailCB = document.getElementById('trail');
var trail = trailCB.checked;
var clearer = document.getElementById('clear');

function createOrb(mx,my){
   var dx = (cw/2) - mx; 
	var dy = (ch/2) - my;
	var dist = Math.sqrt(dx * dx + dy * dy); // 开方  得到半径  勾股定理
	var angle = Math.atan2(dy, dx); // tan是正切函数是直角三角形中，对边与邻边的比值   返回x轴到点(x,y)的角度，此值在-π(PI)与π(PI)之间的弧度
	
	orbs.push({
		x: mx, 
		y: my, 
		lastX: mx,
		lastY: my,
		hue: 0,
		colorAngle: 0,
		angle: angle + Math.PI/2,  
		// angle+180 度
		//size: .5+dist/250,
		size: rand(1,3)/2, 
		// 随机大小出来
		centerX: cw/2,
		centerY: ch/2,		
		radius: dist, //圆角 
		speed: (rand(5,10)/1000)*(dist/750)+.015, 
		alpha: 1 - Math.abs(dist)/cw, 
		draw: function() {			
			ctx.strokeStyle = 'hsla('+this.colorAngle+',100%,50%,1)';	
			// HSLA（e.g:“hsla(0,50%,50%,0)”）是CSS3的新增属性值，其中H代表色相（值在0~360之间），S和L分别代表饱和度和亮度（值在0%~100%之间）。
			ctx.lineWidth = this.size;	//线的宽度为上面随机出来的size、		
			ctx.beginPath();
			ctx.moveTo(this.lastX, this.lastY); 
			ctx.lineTo(this.x, this.y);
			ctx.stroke();
		},	
		update: function(){
			var mx = this.x;
			var my = this.y;	
			this.lastX = this.x;
			this.lastY = this.y;
			var x1 = cw/2;
			var y1 = ch/2;
			var x2 = mx;
			var y2 = my;		
			var rise = y1-y2;
			var run = x1-x2;
			var slope = -(rise/run);
			var radian = Math.atan(slope);
			var angleH = Math.floor(radian*(180/Math.PI));		
			if(x2 < x1 && y2 < y1){angleH += 180;}		
			if(x2 < x1 && y2 > y1){angleH += 180;}		
			if(x2 > x1 && y2 > y1){angleH += 360;}		
			if(y2 < y1 && slope =='-Infinity'){angleH = 90;}		
			if(y2 > y1 && slope =='Infinity'){angleH = 270;}		
			if(x2 < x1 && slope =='0'){angleH = 180;}
			if(isNaN(angleH)){angleH = 0;}
			
			this.colorAngle = angleH;
			this.x = this.centerX + Math.sin(this.angle*-1) * this.radius;
			this.y = this.centerY + Math.cos(this.angle*-1) * this.radius;
			this.angle += this.speed;
		}
	});
};

function orbGo(e){
	var mx = e.pageX - c.offsetLeft;
	var my = e.pageY - c.offsetTop;		
	createOrb(mx,my);
}

function turnOnMove(){
	c.addEventListener('mousemove', orbGo, false);	
}

function turnOffMove(){
	c.removeEventListener('mousemove', orbGo, false);	
}

function toggleTrails(){
	trail = trailCB.checked;
}

function clear(){
 orbs = []; 
}

c.addEventListener('mousedown', orbGo, false);
c.addEventListener('mousedown', turnOnMove, false);
c.addEventListener('mouseup', turnOffMove, false);
trailCB.addEventListener('change', toggleTrails, false);
clearer.addEventListener('click', clear, false);

var count = 100;
while(count--){
		createOrb(cw/2, ch/2+(count*2));
};

var loop = function(){
  window.requestAnimFrame(loop);
	if(trail){
		ctx.fillStyle = 'rgba(0,0,0,.1)';
		ctx.fillRect(0,0,cw,ch);
	} else {
		ctx.clearRect(0,0,cw,ch);
	}
	var i = orbs.length;
	while(i--){	
		var orb = orbs[i];	
		var updateCount = 3;
		while(updateCount--){
		orb.update();		
		orb.draw(ctx);
		};
	};
};
            
loop();
