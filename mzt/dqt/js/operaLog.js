 $(function(){
    var nowPage=1;
	var pageSize=5;

    getLogList(nowPage,pageSize);
    //选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getLogList(1,pageSize)
	});
});

function getLogList(nowPage,pageSize){
	var datas='data={"action":"getLogList","params":{"nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"web","target":"log"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var tableHtml='';
				for(var i=0; i<oData.object.length; i++){
					var datas=oData.object[i];
					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+datas.managerName+'</td><td>'+datas.intor+'</td>\
                        <td>'+Uiho.tool.DetailTimesTamp(datas.createTime)+'</td></tr>';
				}
				$('#pagination').attr('count',oData.count);
				$('#tbody').html(tableHtml);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getLogList(nowPage,pageSize);
				});
			}else{
				alert('数据获取失败');
			}
		}
	});
}