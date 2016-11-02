$(function(){
	
	var Sid=Uiho.tool.geturldata(window.location.href).id;
	//获取一条课程
	getOneTimeTable(Sid);
	timeTable(Sid);

	deleteOneTimeTable(Sid);
	
	
});
function getOneTimeTable(Sid){
	//{ "action": "getOneTimetable","params": 2, source": web","target":"timetable"}
	var datas='data={"action":"getOneTimetable","params": '+Sid+', "source": "web","target":"timetable"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				$('#starttime').val(oData.object.beginTime);
				$('#endtime').val(oData.object.endTime);
				$('#period').val(oData.object.periodType);
				$('#price').val(oData.object.price);
			}else{
				alert('请求失败；');
			};
		}
	});
};


//删除排课

//{ "action": "deleteOneTimetable", "datetime": 1456214091045, "params": 2, "source": "android", "target": "timetable" }


//删除场地
function deleteOneTimeTable(Sid){
	$('#delete').on('click',function(){
		var data='data={"action":"deleteOneTimetable","params": '+Sid+', "source": "web","target":"timetable"}';
		 var r=confirm("确定删除本条数据吗?")
		if(r==true){
		    $.ajax({
				url:requrl,
				type:"POST",
				data:data,
				success:function(str){
					//console.log(str);
					operalog("删除一条排课信息！")
					var oData=$.parseJSON(str);
					if(oData.responseCode==1){
						alert(oData.responseMsg+',返回上一页;');
						history.go(-1);
					}else{
						alert(oData.responseMsg);
					};
				},
				complete:function(data){
					//alert(data)
					//operalog(intor+data)
				}
			});
		}
	});
}
