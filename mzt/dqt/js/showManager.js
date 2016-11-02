
$(function(){
	var pageSize=1;
	var nowPage=1;
	getManagerList(nowPage,pageSize);

	//选择每页多少条
	Uiho.effect.selectNum(function(pageSize){
		getManagerList(1,pageSize)
	});
	//searchs();
});

//根据状态选择

function searchs(){
	$('#searchs').on('click',function(){
		var oVal=$('#isAble').val();
		alert(oV)
	})
}

//获取列表 
function getManagerList(nowPage,pageSize){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={"action": "getManagerList","params": {"nowPage": '+nowPage+',"pageSize":'+pageSize+'}, "source": "web", "target": "manager" }',
		beforeSend:function(){
			$('#tbody').html('<tr><th colspan="8">加载中,请稍后...</th></tr>');
		}, 
		success:function(str){
			var oData=$.parseJSON(str);
			//console.log(oData);
			var allstr='';
			if(oData.responseCode==1){
				$('#tbody').removeClass('error');
				var cookieValue=$.parseJSON(Uiho.cookies.getCookie('userinfo'));

				for(var i=0; i<oData.object.length; i++){

					console.log();
					var userStatusHtml='',
						handel='';
					if(cookieValue.role==2){
						userStatusHtml='';
						handel='';
						$('#userstatuss').remove();
						$('#handle').remove()
					}else{
						//isEnable --> 1启用 ， 0禁用
						if(oData.object[i].isEnable==1){
							userStatusHtml='<td><input type="button" userId="'+oData.object[i].id+'"  isEnable="'+oData.object[i].isEnable+'" class="btn btn-success userstatus" value="禁用"></td>';
						}else{
							userStatusHtml='<td><input type="button" userId="'+oData.object[i].id+'"  isEnable="'+oData.object[i].isEnable+'" class="btn btn-default userstatus" value="启用"></td>';
						};
						handel='<td><div class="btn-group"><a href="showManagerEdit.html?id='+oData.object[i].id+'&realname='+oData.object[i].realname+'&job='+oData.object[i].jobDesc+'&phone='+oData.object[i].phone+'&tel='+oData.object[i].tel+'" class="btn btn-primary btn-sm"><i class="fa fa-search-minus"></i>查看详情</a></div></td>';
					};
					//dom
					allstr+='<tr><td>'+oData.object[i].jobDesc+'</td><td>'+oData.object[i].realname+'</td>\
                        <td>'+oData.object[i].phone+'</td><td>'+oData.object[i].tel+'</td>\
                        <td>'+Uiho.tool.DetailTimesTamp(oData.object[i].createTime)+'</td>\
                        <td>'+Uiho.tool.DetailTimesTamp(oData.object[i].updateTime)+'</td>\
                        '+userStatusHtml+''+handel+'</tr>';
				};
				$('#pagination').attr('count',oData.count);
				$('#tbody').html(allstr);


				
				//页码选择 分页
				var allNum=$('#pagination').attr('count');
				Uiho.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
					getManagerList(nowPage,pageSize);
				});

			}else{
				$('#tbody').html('获取失败,请重试！').addClass('error');
			}
		},
		complete:function(str){
			ChangeStatus();
		}
	});
}
// 启用禁用管理员操作
function ChangeStatus(){
	$('.userstatus').on('click',function(){
		var _this=$(this);
		var status=$(this).attr('isEnable');//禁用启用状态
		var userId=$(this).attr('userId');//userid="5" 用户id
		if(status==1){
			Disable(userId,_this);
		}else if(status==0){
			Enable(userId,_this)
		}
	});
};
//禁用
function Disable(userId,_this){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={ "action":"disableOneManager","params":'+userId+',"source":"web","target":"manager"}',
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				alert(oData.responseMsg);
				_this.removeClass('btn-success');
				_this.addClass('btn-default');
				_this.attr('isenable','0');
			}else{
				alert('操作失败！');
			}
		},
		complete:function(){}
	});
}
//启用
function Enable(userId,_this){
	$.ajax({
		url:requrl,
		type:"POST",
		data:'data={ "action":"enableOneManager","params":'+userId+',"source":"web","target":"manager"}',
		success:function(str){
			var oData=$.parseJSON(str);
			console.log(oData);
			if(oData.responseCode==1){
				alert(oData.responseMsg);
				_this.removeClass('btn-default');
				_this.addClass('btn-success');
				_this.attr('isenable','1');
			}else{
				alert('操作失败！');
			}
		},
		complete:function(){}
	});
}


//Enable 启用






