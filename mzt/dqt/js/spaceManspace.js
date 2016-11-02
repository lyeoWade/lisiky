$(function(){
	var pageSize=2;
	var nowPage=1;
	getSpaceList(nowPage,pageSize);
});

//获取列表 
function getSpaceList(nowPage,pageSize){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={"action":"getSiteList","params": {"nowPage": '+nowPage+',"pageSize":'+pageSize+'}, "source": "web", "target":"site" }',
		beforeSend:function(){
			$('#tbody').html('<tr><th colspan="8">加载中,请稍后...</th></tr>');
		}, 
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			var allstr='';
			if(oData.responseCode==1){
				$('#tbody').removeClass('error');
				//console.log(oData);
				for(var i=0; i<oData.object.length; i++){
					var datas=oData.object[i];
                    allstr+='<tr><td>'+(i+1)+'</td><td>'+datas.name+'</td><td>'+datas.exfA+'</td><td>'+datas.sub+'</td>\
                        <td>'+Uiho.tool.DetailTimesTamp(datas.createTime)+'</td><td><div class="btn-group">\
                        <a href="spaceManspaceEdit.html?id='+datas.id+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i></a>\
                        </div></td></tr>';
				};
				 // <a href="javascript:;" title="删除教练" class="btn btn-primary btn-sm"><i class="fa fa-times"></i></a>\
				$('#pagination').attr('count',oData.count);
				$('#tbody').html(allstr);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getSpaceList(nowPage,pageSize);
				});
			}else{
				$('#tbody').html('获取失败,请重试！').addClass('error');
			}
		},
		complete:function(str){

		}
	});
}