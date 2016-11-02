$(function(){

	var datas='data={"action":"getOneIssue","params":" ","source": "web","target":"issue"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str);
			var oData=$.parseJSON(str);
			$('#pushtime').val(oData.object.getTime)
			//responseInfo(str);
		}
	});
	updateOneIssue();

});

function updateOneIssue(){
	$('#pushtimebtn').on('click',function(){
		if($('#pushtime').val()==''){
			alert('请设置时间！');
			return false;
		}

		var datas='data={"action":"updateOneIssue","params":"'+$('#pushtime').val()+'","source":"web","target": "issue" }';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				//console.log(str);
				responseInfo(str);
			}
		});
	})
	
}


