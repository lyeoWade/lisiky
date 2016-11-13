$(function(){
	var sLink=window.location.href;
	var searchTag=sLink.split('.')[0].lastIndexOf('/');
	var PageId=sLink.substring(searchTag).split('_')[1].split('.')[0];

	$("#comment_btn").on("click",function(){
		//
		var oC=$('.textarea').val();
		
		var userId=getCookie("userid");
		
		if(userId==''){
			//alert("您还没有登录,请登录之后再评论！");
			$('.push_tip').html("您还没有登录,请登录之后再评论！<a href='login.html'>去登录?</a>").css({'opacity':'1','display':'block','color':'red'});
			
			return false;
		}else{
			
			if(oC==''){
				$('.push_tip').html("请填写评论内容！").css({'opacity':'1','display':'block','color':'red'});
				setTimeout(out_tip,2000);
			return false;
			}
			$.ajax({
				url:"web/content.php",
				type:"POST",
				data:"act=conment&userid="+userId+"&pageid="+PageId+"&content="+oC,
				success: function(data){
					
					var json=$.parseJSON(data);
					if(json.rcode==1){
						$('.push_tip').html(json.desc).css({'opacity':'1','display':'block'});
						setTimeout(out_tip,2000);
					}else{
						$('.push_tip').html(json.desc).css({'opacity':'1','display':'block','color':'red'});
						setTimeout(out_tip,2000);
					}	
					
					getConment();
				},
				error:function(){}	
			})	
		}
	});
	
	
	
	getConment(PageId);
		
		
		// 
		
		
	});
	function out_tip(){
		$('.push_tip').animate({'opacity':0},700);
	}
	
	
	//删除自己的评论
	function deletesConments(){
		
		var aLi=$('.conment_list_box ul li');
		//显示删除
		aLi.each(function(index, element) {
			
			aLi.eq(index).mouseenter(function(){
				//alert(aLi.length)
				var oS=$(this).find('s');
				var oTagNum=$(this).attr('userid');
				if( getCookie("userid") == oTagNum ){
					oS.css('display','block')
				}
			}).mouseleave(function(){
				var oS=$(this).find('s');
				if( getCookie("userid") != '' ){
					oS.css('display','none')
				}
			});
		});
		
		
		
		
	}
	
	function getConment(PageId){
		// 获取评论;;;
		
		$.ajax({
			url:"web/content.php",
			type:"POST",
			data:"act=conmentList&pageid="+PageId,
			success: function(data){
				//console.log(data)
				//var json=$.parseJSON(data);
				var json=eval('('+data+')');
				
				//
				//console.log(json);
				var sHtml='';
				if(json.counts==0){
					$('.conment_list_box ul').html("<p style='text-align:center; line-height:60px;'>暂无评论！</p>");
				}else{
					for(var i=0; i<json.result.length; i++){
						(function(index){
							var objJson=eval('('+json.result[i]+')');
							
							sHtml+='<li userid="'+objJson.userid+'"><div class="user_icon"><img src="img/user.jpg" /></div>';
							sHtml+='<div class="conment_content"><div class="user_info">';
							sHtml+='<a href="">'+objJson.username+'</a><time>'+objJson.times+'</time><s>删除</s></div>';
							sHtml+='<div class="conment_desc">'+objJson.content.replace(/rn/g,'')+'<a href=""></a></div></div></li>';
						})(i)
						//console.log(json.result[i])
					};
					
					$('.conment_list_box ul').html(sHtml)
					
					//deletesConments();
				}
				
			},
			error:function(){}	
		})	
		
	}
	
	function getCookie(c_name){
		if (document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1){ 
				c_start=c_start + c_name.length+1 
				c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
		return ""
	}


