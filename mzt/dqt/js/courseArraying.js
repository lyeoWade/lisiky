$(function(){

	var nowPage=1;
	var pageSize=2;

	getTimetableList(nowPage,pageSize)
});

function getTimetableList(nowPage,pageSize){
	var datas='data={"action":"getTimetableList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"web", "target": "timetable" }';
	console.log(datas);
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str);
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var tableHtml='';
				for(var i=0; i<oData.object.length; i++){
					var datas=oData.object[i];
					//时段
					var preiod='';
					switch(datas.periodType){
						case 1:
							preiod='上午';
						break;
						case 2:
							preiod='下午';
						break;
						case 3:
							preiod='晚上';
						break;

					}

					tableHtml+='<tr><td>1</td><td>'+datas.beginTime+'</td><td>'+datas.endTime+'</td>\
                            <td>'+preiod+'</td><td>'+datas.price+'</td>\
                            <td>'+Uiho.tool.DetailTimesTamp(datas.createTime)+'</td>\
                            <td><div class="btn-group"><a href="courseArrayingEdit.html?id='+datas.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a></div></td></tr>';
				}
				$('#pagination').attr('count',oData.count);
				$('#tbody').html(tableHtml);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getTimetableList(nowPage,pageSize);
				});
			}else{
				$('.addtip').html(oData.responseMsg);
				$('.addtip').addClass('error');
			}
		}
	});
}