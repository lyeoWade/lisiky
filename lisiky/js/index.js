


// 

// $(function(){
	
// 	var up=true;
// 	$('.listing-t').on('click',function(){
// 		//$('.list-warp').toggle()
		
// 		if(!up){
// 			$('.list-warp').slideDown(function(){
// 				$('.scroll-bar span').css('display','block');
// 			});
// 			up=true;
// 		}else{
// 			$('.list-warp').slideUp(function(){
// 				$('.scroll-bar span').css('display','none');
// 			});
			
// 			up=false;
// 		}
		
// 	});	
// });

wheel(false);
function wheel(drag)
{
	var oBox=getByClass(document,'roll_parent');
	var oBarBox=getByClass(document,'scroll-bar');
	var speed=50;	
	
	for(var i=0; i<oBox.length; i++){
		(function(index){
			roll(index);
		})(i)
	};
	// bar是否可以拖动  空了做	
	if(drag===true){
		Drag();
	}
	
	function Drag(){
		oBar.style.cursor='pointer';
		oBar.onmousedown=function(ev){
			var oEvent=ev||event;
			var disx=oEvent.clientX-oBarBox.offsetLeft;
			var disy=oEvent.clientY-oBarBox.offsetTop-oBar.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;	
				var lefts=oEvent.clientX-disx;
				var tops=oEvent.clientY-disy;
				
				if(tops<0){
					tops=0;b=false;
				}else if(tops>oBarBox.offsetHeight-oBar.offsetHeight) // 如果运动了的 值大于父级-子集的差值 那么就运动完了
				{
					tops=oBarBox.offsetHeight-oBar.offsetHeight;
					b=false;
				}else{
					b=true;
				}
				oBar.style.top=tops+'px';
			}
			document.onmouseup=function(){
				document.onmousemove=null;	
				document.onmouseup=null;
			};
			
			return false;
		};
	};
	function roll(index){
		var oSc=oBox[index].getElementsByClassName('list-warp')[0];
		var oBar=oBarBox[index].children[0];
		
		oBar.style.height=parseInt((oBox[0].offsetHeight*oBarBox[0].offsetHeight)/oSc.offsetHeight)+'px';
		//alert((oSc.offsetHeight-oBox[0].offsetHeight)/40);
		
		// 初始化滚动条	
		if(oSc.offsetHeight<=oBox[index].offsetHeight){
			oBarBox[index].style.display="none";
			return false;
		};
		var b=true;
		if(window.navigator.userAgent.indexOf('Firefox')!=-1) // 判断浏览器  分别加事件
		{	
			oSc.addEventListener('DOMMouseScroll',wheelFn,false); // DOMMouseScroll
		}
		else
		{
			oSc.onmousewheel=wheelFn; 
		};
		
		function wheelFn(ev)
		{
			var oEvent=ev||event; 
			var down=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0; // 判断滚动的方向 火狐和chrome不一致
			//true 向下滚
			if(down){
				var t=oBar.offsetTop+speed;  //初始化滚动的值
				Scroll(t);
				
			}else{
				var t=oBar.offsetTop-speed;
				Scroll(t);
			};
			function Scroll(t){
				if(t<0){
					t=0;b=false;
				}else if(t> (oBarBox[index].offsetHeight-oBar.offsetHeight) ) // 如果运动了的 值大于父级-子集的差值 那么就运动完了
				{
					t=oBarBox[index].offsetHeight-oBar.offsetHeight;
					b=false;
				}else{
					b=true;
				}
				startMove(oBar,{top:t});//小条的运动
				var scale=(t/(oBarBox[index].offsetHeight-oBar.offsetHeight));	 //取百分比
				document.title=t+'-'+scale;
				startMove(oSc,{top:-(oSc.offsetHeight-oBox[index].offsetHeight+35)*scale});
				
			};
			// 阻止默认事件
			if(b){
				return false;
				oEvent&&oEvent.preventDefault();
			}else{
				return true;
				if(oEvent.preventDefault){
					oEvent.preventDefault=false;
				}
			}
			
		};
	};
};
