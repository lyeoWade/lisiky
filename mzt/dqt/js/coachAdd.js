$(function(){
	$('#coachAddBtn').on('click',function(){
		$coachusername=$('#coachusername').val();
		$phone=$('#phone').val();
		$idcard=$('#idcard').val();
		$age=$('#age').val();
		$sex=$('#sex').val();
		$idcardtype=$('#idcardtype').val();
		$driverschool=$('#driverschool').val();
		$address=$('#address').val();
		$card=$('#card').val();
		$cardholder=$('#cardholder').val();
		$bank=$('#bank').val();

		if($coachusername=='' || !Uiho.ver.chinese($coachusername)){
			$('.addtip').html('请输入正确的教练名字！');
			$('.addtip').addClass('error')
			return false;
		}
		if($phone=='' || !Uiho.ver.moblie($phone)){
			$('.addtip').html('请输入正确的手机号码！');
			$('.addtip').addClass('error')
			return false;
		}
		if($age=='' || !Uiho.ver.numint($age)){
			$('.addtip').html('请输入正确的年龄！');
			$('.addtip').addClass('error')
			return false;
		}
		if($driverschool==''){
			$('.addtip').html('请填写驾校！');
			$('.addtip').addClass('error')
			return false;
		}
		var datas='data={"action":"addOneCoach","params": { "address": "'+$address+'", "age":'+$age+', "bank": "'+$bank+'", "bankCard": "'+$card+'", "card": "'+$idcard+'", "cardholder": "'+$cardholder+'", "gender":'+$sex+', "licenseType":'+$idcardtype+', "phone": "'+$phone+'", "realname": "'+$coachusername+'", "viewDriving": "'+$driverschool+'" }, "source": "web", "target": "coach" }';
		console.log(datas);
		$.ajax({
			url:requrl,
			type:"POST",
			data:datas,
			success:function(str){
				responseInfo(str);
				operalog('新增了一个教练！');
			}
		})
	})
});