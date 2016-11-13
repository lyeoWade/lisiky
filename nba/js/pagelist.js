
$(function(){
	var now_page=window.location.hash||'#1'; //获取hash  最开始默认第一个
	now_page=parseInt(now_page.substring(1));
	
	var url=window.location.href;
	var pageSize=20;
	getAjax(now_page,pageSize);

});


function getAjax(now_page,pageSize){
	$.ajax({
		type:"POST",
		url:"web/get_arclist.php",
		data:"act=list&PageSize="+pageSize+"&nowpage="+now_page,
		success:function(data){

			var str=$.parseJSON(data);
			$('.content-box-warps').html(' ');
			var newtype='',html='';
			for(var i=0; i<str.result.length; i++){
				
				var obj=eval('('+str.result[i]+')');
				switch(obj.newtype){
					case '1':
						newtype="篮球新闻";
					break;
					case '2':
						newtype="足球新闻";
					break;
					case '3':
						newtype="实时新闻";
					break;
					case '4':
						newtype="神棍区";
					break;
					case '5':
						newtype="推荐文章";
					break;
					case '6':
						newtype="篮球心水";
					break;
					case '7':
						newtype="足球心水";
					break;
				}
				html+='<section class="content-list"><div class="h2_box"><h2><a   title="'+obj.title+''+keys()+'" target="_blank"  href="content.html?id='+obj.id+'">'+obj.title+'</a></h2>\
				<p class="info-title">所属栏目:<a href="news.html?id='+obj.newtype+'">'+newtype+'</a><span>'+obj.datatime+'</span></p>\
				</div><div class="clearfix warp_c"><div class="descripion fl"><p class="des" title="'+obj.title+''+keys()+'">'+obj.descption+'</p></div></div>\
				<div class="clearfix list_info"><p class="fr"><a title="'+obj.title+''+keys()+'" href="content.html?id='+obj.id+'" target="_blank">阅读全文</a></p</div></section>';
				hotid=obj.typeid;
			};
			$('.content-box-warps').html(html).animate({opacity:1});

			//$('#pages').attr('count',str.count);
			//页码选择 分页
			//var allNum=$('#pages').attr('count');
			var oPage=$('#pages');

			//alert(str.Total+'-'+pageSize);
			//alert(now_page)
			pagination(str.Total,pageSize,now_page,function(now_page){
				//alert(now_page)
				getAjax(now_page,pageSize)
			});
		},
		complete:function(){
			getHotList();
		}
	});
}

function  pagefn(now_page,data){
	var oDiv=$("#pages");
	var str=$.parseJSON(data);
	console.log(str)
	var num=Math.ceil(str.Total/20);  //取页码数根据每一页分多少条
	getpage(now_page);		
	function getpage(now_page){
		//设置class 样式
		$('.page-list a').removeClass('active');
		$('.page-list a').eq(now_page-1).addClass('active');

		var n=(now_page-1)*20; // 设置初始值 变化值
		// now_page 是当前页码  1开始的  n用于循环要从0开始 所以要-1
		$('.content-box-warps').html(' '); //清空
		
		var html='';
		
		var number=20; // 每一页显示的条数
		var hotid=0;
		if((str.result.length-n)<20){ //如果总条数减去截止条数小于5 那么不足了
			//alert(number+'---'+n)
			number=str.result.length%20;
		}; //处理多余的不足5条的
		var newtype='';
		
		for(var i=n; i<n+number; i++){
			
			var obj=eval('('+str.result[i]+')');
			switch(obj.newtype){
				case '1':
					newtype="篮球新闻";
				break;
				case '2':
					newtype="足球新闻";
				break;
				case '3':
					newtype="实时新闻";
				break;
				case '4':
					newtype="神棍区";
				break;
				case '5':
					newtype="推荐文章";
				break;
				case '6':
					newtype="篮球心水";
				break;
				case '7':
					newtype="足球心水";
				break;
			}
			html+='<section class="content-list"><div class="h2_box"><h2><a   title="'+obj.title+''+keys()+'" target="_blank"  href="content.html?id='+obj.id+'">'+obj.title+'</a></h2>\
			<p class="info-title">所属栏目:<a href="news.html?id='+obj.newtype+'">'+newtype+'</a><span>'+obj.datatime+'</span></p>\
			</div><div class="clearfix warp_c"><div class="descripion fl"><p class="des" title="'+obj.title+''+keys()+'">'+obj.descption+'</p></div></div>\
			<div class="clearfix list_info"><p class="fr"><a title="'+obj.title+''+keys()+'" href="content.html?id='+obj.id+'" target="_blank">阅读全文</a></p</div></section>';
			hotid=obj.typeid;
		};
		$('.content-box-warps').html(html).animate({opacity:1});
		$('body').append('<div id="typeid">'+hotid+'</div>');
	};
	page(oDiv,now_page,num);
	
	function page(oDiv,nowNum,allNum){				
		if(nowNum>=4 && allNum>=6){
			var oA=document.createElement('a');
			oA.href="#1";
			oA.innerHTML="首页";
			oDiv.append(oA);	
		}
		if(nowNum>=2){
			var oA=document.createElement('a');
			oA.href="#"+(nowNum-1);
			oA.innerHTML="上一页";
			oDiv.append(oA);	
		}
		
		
		if(allNum<=5){
			for(var i=1; i<=allNum; i++){
				var aA=document.createElement('a');
				if(nowNum==i){
					aA.innerHTML= i ;
					aA.className="active";
				}else{
					aA.innerHTML='['+ i +']';
				}
				aA.href="#"+i;
				oDiv.append(aA);	
			}	
		}else{
			for(var i=1; i<=5; i++){
				var aA=document.createElement('a');
				
				if(nowNum==1 || nowNum==2){
					
					aA.href="#"+i;
					if(nowNum==i){
						aA.innerHTML=i;
					}
					else{
						aA.innerHTML='['+ i +']';
					}
					
				}else if((allNum - nowNum)==0 || (allNum-nowNum)==1){// 倒数第一和第二 特殊处理
					
					
					aA.href="#"+ (allNum - 5 + i);
					
					if( (allNum - nowNum) ==0 && i==5){ //倒数第一项
						
						aA.innerHTML= (allNum - 5 + i);
						
					}else if((allNum - nowNum) ==1 && i==4){ //倒数第二项
						
						aA.innerHTML= (allNum - 5 + i);;
						
					}else{
						aA.innerHTML='['+ (allNum - 5 + i) +']';
					}
					
					
					
				}else{
					
					if(i==3){
						aA.innerHTML= ( nowNum-3+i ) ;
					}else{
						aA.innerHTML='['+ ( nowNum-3+i ) +']';
					}
					
					aA.href="#"+(nowNum-3+i);
					
				}
				//alert(typeof aA)
				oDiv.append(aA);	
			}	
		}
		if((allNum-nowNum)>=1){
			var oA=document.createElement('a');
			oA.href="#"+(nowNum+1);
			oA.innerHTML="下一页";
			oDiv.append(oA);
		}
		if((allNum-nowNum)>=3){
			var oA=document.createElement('a');
			oA.href="#"+allNum;
			oA.innerHTML="尾页";
			oDiv.append(oA);
		}
		var oBtn=$("#pages a")//oDiv.getElementsByTagName('a');

		for(var i=0; i<oBtn.length; i++){
			oBtn[i].onclick=function(){
				var Num=parseInt(this.getAttribute('href').substring(1));
				oDiv.html("");
				document.documentElement.scrollTop='0';
				document.body.scrollTop='0';
				now_page=Num;
				getpage(now_page);				
				page(oDiv,Num,num);
			}
		};
	}
}

function getHotList(){
	$.ajax({
		type:"POST",
		url:"web/get_arclist.php",
		data:"act=rightsidelist", 
		success: function(data){
			var obj=$.parseJSON(data);
			var ahtml='';
			var num=10;
			if(obj.counts<num){
				num=obj.counts;
			}
			for(var i=0; i<num; i++){
				var str=eval('('+obj.result[i]+')');
				var k=str.title;
				ahtml+='<li><a class="slh" href="content.html?id='+str.id+'" title="'+k+''+keys()+'">'+k+'</a></li>';
			}
			$('.arc-list').html(ahtml);
		}	
	});	
}









function pagination(allnum,pageSize,nowPage,fn){

	nowPage=parseInt(nowPage);
	var nums=Math.ceil(allnum/pageSize);
	var oPage=document.getElementById('pages');
	oPage.innerHTML='';
	//只显示5条
	if(nowPage>=4 && nums>=6){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="1">首页</a>';
		oPage.appendChild(oLi);
	}
	if(nowPage>=2){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+(nowPage-1)+'">上一页</a>';
		oPage.appendChild(oLi);	
	}
	if(nums<=5){
		for(var i=1; i<=nums; i++){
			var oLi=document.createElement('li');
			if(nowPage==i){
				oLi.className="active";
			}
			oLi.innerHTML+='<a pagenum="'+i+'">'+i+'</a>';
			oPage.appendChild(oLi);
		}
			
	}else{
		for(var i=1; i<=5; i++){
			var oLi=document.createElement('li');
			
			if(nowPage==1 || nowPage==2){
				oLi.innerHTML='<a pagenum="'+i+'">'+i+'</a>';
				if(nowPage==i){
					oLi.className="active";
				}
				else{
					oLi.className="";
				}
			}else if((nums - nowPage)==0 || (nums-nowPage)==1){// 倒数第一和第二 特殊处理
				
				oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				if( (nums - nowPage) ==0 && i==5){ //倒数第一项
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}else if((nums - nowPage) ==1 && i==4){ //倒数第二项
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}else{
					oLi.innerHTML='<a pagenum="'+(nums-5+i)+'">'+(nums-5+i)+'</a>';
				}
			}else{
				if(i==3){
					oLi.className="active";
					oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
				}else{
					oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
				}
				oLi.innerHTML='<a pagenum="'+(nowPage-3+i)+'">'+(nowPage-3+i)+'</a>';
			}
			oPage.appendChild(oLi);	
		}	
	}
	if((nums-nowPage)>=1){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+(nowPage+1)+'">下一页</a>';
		oPage.appendChild(oLi);
	}
	if((nums-nowPage)>=3){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a pagenum="'+nums+'">尾页</a>';
		oPage.appendChild(oLi);
	}
	var aLi=oPage.children;
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			if(aLi[this.index].className=='active')return false;
			var aA=this.getElementsByTagName('a')[0];
			var oNum=aA.getAttribute('pagenum');
			//alert(oNum)
			fn&&fn(oNum);
		};
	};
};
