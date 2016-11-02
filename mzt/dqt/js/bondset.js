$(function(){
	//初始化得到保证金比例
	initbondset($('#bondset'),1);
	initbondset($('#commission'),2);
	updateOnePaymentRatio($('#bondsetbtn'),$('#bondset'),1,'修改了保证金！');
	updateOnePaymentRatio($('#commissionbtn'),$('#commission'),2,'修改了佣金！')
	
});

function updateOnePaymentRatio(oBtn,obj,id,info){
	oBtn.on('click',function(){
		if(!Uiho.ver.numint(obj.val())){
			$('.addtip').html('比例请设置在0-99之内');
			$('.addtip').addClass('error')
			return false;
		};

		//保证金比例设置

		var datas='data={ "action": "updateOnePaymentRatio","params":{"id":'+id+',"ratio":"'+obj.val()+'"}, "source": "web", "target": "paymentRatio" }';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				console.log(str);
				operalog(info)
				responseInfo(str);
			}
		});
	})
}

function initbondset(obj,id){
	var datas='data={ "action": "getOnePaymentRatio","params":'+id+', "source": "web", "target": "paymentRatio" }';
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				var oData=$.parseJSON(str);
				if(oData.responseCode==1){
					obj.val(oData.object.ratio)
				}else{
					alert('数据获取失败');
				}
				//console.log(str);
				//operalog("修改了保证金！")
				//responseInfo(str);
			}
		});
}


