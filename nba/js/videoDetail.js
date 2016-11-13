$(function(){

	var $collectionVideo=$('#collectionVideo');
	var userid=getCookie('userid');
	var targetId=$('body').attr('targetId');
	if(userid){
		$.ajax({
			url:'phpdata/datapage/collection.php',
			type:"POST",
			data:'type=isCollection&userid='+userid+'&targetId='+targetId,
			success:function(str){
				console.log(str);
				var sData=eval('('+str+')');
				if(sData.respondCode==0){
					$collectionVideo.attr('isCollectionNum','1').html(sData.respondMsg)
				}else{
					$collectionVideo.html(sData.respondMsg)
				}
			}
		});
	}else{
		$collectionVideo.html('收藏视频');
	}
	
	//收藏视频
	$collectionVideo.on('click',function(){
		if(!userid){
			alert('您还没有登录,请登录后在操作;');
		}else{
			if($(this).attr('isCollectionNum')==1){ //说明收藏了
				$.ajax({
					url:'phpdata/datapage/collection.php',
					type:"POST",
					data:'type=CancelCollection&userid='+userid+'&targetId='+targetId,
					success:function(str){
						var sData=eval('('+str+')');
						if(sData.respondCode==0){
							$collectionVideo.attr('isCollectionNum','0').html(sData.respondMsg)
						}else{
							$collectionVideo.html(sData.respondMsg)
						}
					}
				});
			}else{
				$.ajax({
					url:'phpdata/datapage/collection.php',
					type:"POST",
					data:'type=collection&userid='+userid+'&targetId='+targetId+'&linkname=videoDetail',
					success:function(str){
						var sData=eval('('+str+')');
						if(sData.respondCode==0){
							$collectionVideo.attr('isCollectionNum','1').html(sData.respondMsg)
						}else{
							$collectionVideo.html(sData.respondMsg)
						}
					}
				})
			}
		}
	});



	Open();
	function Open(){
		$('.newopen').on('click',function(){
			var url=$(this).attr('targetUrl');
			 window.open(url, "newwindow", "height=500, width=1000,top=100,left=100,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		})
	}
});