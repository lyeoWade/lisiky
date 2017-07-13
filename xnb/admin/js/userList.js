$(function(){
	var isEnable='',nowPage=1,pageSize=20,tel='',name='',roleId='';

	//获取默认的列表
	getUserList(isEnable,nowPage,pageSize,tel,name,roleId);

	//选择每页多少条

	// Uiho.effect.selectNum(function(pageSize){
	// 	getUserList(code,nowPage,pageSize,tel,name,roleId)
	// });

	//选择查询
	$('#SelectQueryBtn').on('click',function(){
		//alert(nowPage)
		isEnable=$('#isEnable').val();
		tel=$('#tel').val();
		name=$('#name').val();
		roleId=$('#roleId').val();
		//选择查询
		getUserList(isEnable,nowPage,pageSize,tel,name,roleId);
	});
	document.onkeydown=function(ev){
		isEnable=$('#isEnable').val();
		tel=$('#tel').val();
		name=$('#name').val();
		roleId=$('#roleId').val();
		var oEvent=ev||event;
	    if(oEvent.keyCode==13){
	   		getUserList(isEnable,nowPage,pageSize,tel,name,roleId);
	    };
	};
});

//获取用户列表
function getUserList(isEnable,nowPage,pageSize,tel,name,roleId){
	var datas='data={"action":"getManagerList","params":{"isEnable":"'+isEnable+'","nowPage":'+nowPage+',"pageSize":'+pageSize+',"phone":"'+tel+'","realname":"'+name+'","role":"'+roleId+'"},"source":"backstage","target":"manager"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			console.log(str);
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				var tableHtml='';
				for(var i=0; i<oData.object.length; i++){
					var sData=oData.object[i];
					var isEnableHtml='';
					if(sData.isEnable==1){
						isEnableHtml='<a href="javascript:;" class="btn btn-default btn-sm userstatus" managerId="'+sData.managerId+'" isEnable="'+sData.isEnable+'"><i class="fa-gear fa"></i>&nbsp;禁用</a>';
					}else if(sData.isEnable==0){
						isEnableHtml='<a href="javascript:;" class="btn btn-primary btn-sm userstatus" managerId="'+sData.managerId+'" isEnable="'+sData.isEnable+'"><i class="fa-gear fa"></i>&nbsp;启用</a>';
					}

					tableHtml+='<tr><td>'+(i+1)+'</td><td>'+sData.realname+'</td>\
						<td>'+sData.phone+'</td><td>'+sData.job+'</td>\
						<td><div class="btn-group">'+isEnableHtml+'</div></td>\
                        <td><div class="btn-group"><a href="userEdit.html?id='+sData.managerId+'" class="btn btn-primary btn-sm"><i class="fa-gear fa"></i>&nbsp;查看</a>\
                        <a href="javascript:;" userid="'+sData.managerId+'" class="btn btn-warning btn-sm deleteuser"><i class="fa-times fa"></i>&nbsp;删除</a></div></td></tr>';
				};
				$('tbody').html(tableHtml);
			
				$('#pagination').attr('count',oData.count);
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getUserList(isEnable,nowPage,pageSize,tel,name,roleId)
				});
				DeleteUser(function(){
					getUserList(isEnable,nowPage,pageSize,tel,name,roleId)
				});
			}else{
				$('tbody').html('<tr><td colspan="10" align="center">'+oData.responseMsg+'</td></tr>');
			}

			handleCoach(function(){
				getUserList(isEnable,nowPage,pageSize,tel,name,roleId)
			});
		},
		complete:function(){
			
		}
	})
};



function handleCoach(fn){
	$('.userstatus').on('click',function(){
		var _this=$(this);
		var status=$(this).attr('isEnable');//禁用启用状态
		var userId=$(this).attr('managerId');
		if(status==1){//1启用状态
			disableCoach(userId,_this,fn);
		}else if(status==0){
			EnableCoach(userId,_this,fn);
		}
	});
};

function disableCoach(id,_this,fn){
	var datas='data={"action":"disableManager","params":'+id+',"source":"backstage","target":"manager"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				fn&&fn();
				alert(oData.responseMsg);
			}else{
				alert(oData.responseMsg);
			}
		}
	})
}
function EnableCoach(id,_this,fn){
	var datas='data={"action":"enableManager","params":'+id+',"source":"backstage","target":"manager"}';
	$.ajax({
		url:requrl,
		type:"POST",
		data:datas,
		success:function(str){
			var oData=$.parseJSON(str);
			if(oData.responseCode==1){
				alert(oData.responseMsg);
				fn&&fn();
			}else{
				alert(oData.responseMsg);
			}
		}
	});
}//






//删除

function DeleteUser(fn){
	$('.deleteuser').on('click',function(){
		var userid=$(this).attr('userid');
		var datas='data={"action":"deleteManager","params":'+userid+',"source":"backstage","target":"manager"}';
		var r=confirm("确定删除本条数据吗?");
		if(r==true){
			$.ajax({
				url:requrl,
				type:"POST",
				data:datas,
				success:function(str){
					var oData=$.parseJSON(str);
					console.log(oData)
					if(oData.responseCode==1){
						alert(oData.responseMsg)
						fn&&fn();
					}else{
						alert(oData.responseMsg)
					}
				}
			});
		}
		
	})
}





















