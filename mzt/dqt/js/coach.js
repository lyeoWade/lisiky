$(function(){
	var isEnable=1,nowPage=1,pageSize=5;
	getCoachList(isEnable,nowPage,pageSize);
	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getCoachList(isEnable,nowPage,pageSize)
	});
});
function getCoachList(isEnable,nowPage,pageSize){

	var datas='data={"action":"getCoachList","params":{"isEnable":'+isEnable+',"nowPage":'+nowPage+',"pageSize":'+pageSize+'},"source":"web","target":"coach"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				var tableHtml='';
				for(var i=0; i<oData.object.length; i++){
					var sData=oData.object[i];
					//启用状态

					if(sData.isEnable==0){
						//0禁用
					}else{
						//1启动
					}

					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.phone+'</td><td>'+sData.age+'</td><td>'+Uiho.tool.DetailTimesTamp(sData.createTime)+'</td><td><button type="button" class="btn btn-success btn-xs">禁用</button></td>\
                                <td><div class="btn-group"><button data-toggle="dropdown" class="btn btn-primary dropdown-toggle btn-sm" type="button">查看教练选项 <span class="caret"></span></button>\
                                <ul role="menu" class="dropdown-menu"><li><a href="coachEdit.html?id='+sData.id+'">教练详情</a></li><li class="divider"></li>\
                                <li><a href="uploadCourse.html?id='+sData.id+'">课程列表</a></li><li><a href="cash.html?id='+sData.id+'">提现申请</a></li>\
                                <li><a href="comment.html?id='+sData.id+'">评论管理</a></li><li class="divider"></li>\
                                <li><a href="income.html?id='+sData.id+'">新增收入</a></li><li><a href="incomeDetail.html?id='+sData.id+'">收入明细</a></li>\
                                <li><a href="commissionList.html?id='+sData.id+'">佣金列表</a></li><li><a href="incomerank.html?id='+sData.id+'">收入排名</a></li>\
                                <li><a href="apporank.html?id='+sData.id+'">预约次数排名</a></li></ul></div>\
                                <a href="javascript:;" title="删除教练" class="btn btn-warning btn-sm"><i class="fa fa-times"></i>删除教练</a></td></tr>';
				}
				$('tbody').html(tableHtml);
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getCoachList(isEnable,nowPage,pageSize);
				});
			}else{

			}
		}
	})
}

