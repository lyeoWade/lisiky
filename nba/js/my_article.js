$(function(){
	$('.deleteList').on('click',function(){
		var arcid=$(this).attr('arcid');
		var userid=getCookie('userid');
		if (confirm("此操作将扣除您本条数据所获得积分的80%,您确定要删除吗？")) {
			$.ajax({
				url:'phpdata/datapage/arclist.php',
				type:"post",
				data:"type=userDeleteArticle&userid="+userid+"&arcid="+arcid+"",
				success:function(str){
					//console.log(str);
					var sData=$.parseJSON(str);
					if(sData.code==0){
						alert(sData.msg);
						history.go(0);
					}else{
						alert(sData.msg)
					}
				}
			})
			//alert(statusid+'-'+arcid);
		};
		
	})

	$('.deleteNotUseList').on('click',function(){
		var arcid=$(this).attr('arcid');
		var userid=getCookie('userid');

		if (confirm("您确定要删除本条数据吗？")) {
			$.ajax({
				url:'phpdata/datapage/arclist.php',
				type:"post",
				data:"type=userDeleteArticle&userid="+userid+"&arcid="+arcid+"",
				success:function(str){
					//console.log(str);
					var sData=$.parseJSON(str);
					if(sData.code==0){
						alert(sData.msg);
						history.go(0);
					}else{
						alert(sData.msg)
					}
				}
			})
			//alert(statusid+'-'+arcid);
		};
		
	})
});