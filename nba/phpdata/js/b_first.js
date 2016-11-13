$(function(){

	//获取当天球队
	var oDate=new Date();
	var times=oDate.getFullYear()+'-'+toZero(oDate.getMonth()+1)+'-'+toZero(oDate.getDate());
	//alert(times)
	$.ajax({
		url:"datapage/first.php",
		type:"POST",
		data:"type=default&times="+times,
		success:function(str){
			var oData=eval('('+str+')');
			var sHtml='';
			if(oData.respondMsg==0){
				$('#firstNamewarp').html("暂无数据")
			}else{
				for(var i=0; i<oData.result.length; i++){
					var obj=eval('('+oData.result[i]+')');
					sHtml+='<div class="first-col clearfix"><div class="time fl"><span class="league">'+obj.league+'</span>---<span class="ptime" playtime="'+obj.playtime+'">'+obj.playtime.substring(11)+'</span></div><ul class="fl firstNameUl">\
							<li><input type="text" hometeam="'+obj.hometeam+'" value="'+obj.hometeam+'(主)" class="h" disabled >\
								<input type="text" placeholder="中锋" value="'+obj.hC+'" class="hC" >\
								<input type="text" placeholder="前锋" value="'+obj.hPF+'"  class="hPF" >\
								<input type="text" placeholder="前锋" value="'+obj.hSF+'"  class="hSF" >\
								<input type="text" placeholder="后卫" value="'+obj.hSG+'"  class="hSG" >\
								<input type="text" placeholder="后卫" value="'+obj.hPG+'"  class="hPG" ></li>\
							<li><input type="text" guestteam="'+obj.guestteam+'" value="'+obj.guestteam+'(客)" class="g" disabled >\
								<input type="text" placeholder="中锋" value="'+obj.gC+'" class="gC" >\
								<input type="text" placeholder="前锋" value="'+obj.gPF+'"  class="gPF" >\
								<input type="text" placeholder="前锋" value="'+obj.gSF+'"  class="gSF" >\
								<input type="text" placeholder="后卫" value="'+obj.gSG+'"  class="gSG" >\
								<input type="text" placeholder="后卫" value="'+obj.gPG+'"  class="gPG" ></li></ul>\
							<div class="updatefirst fl"><input type="button" firstId="'+obj.id+'" class="updatefirstBtn" value="更新"></div></div>';

				}
				$('#firstNamewarp').html(sHtml)
			};
			
			//console.log(oData);
		},
		complete:function(){
			update();
		}
	});

	function update(){
		$('.updatefirstBtn').on('click',function(){
			//alert(123);

			var league=$(this).parents('.first-col').find('.time span.league').html();
			var ptime=$(this).parents('.first-col').find('.time span.ptime').attr('playtime');
			var hometeam=$(this).parents('.first-col').find('.h').attr('hometeam');
			var hC=$(this).parents('.first-col').find('.hC').val();
			var hPF=$(this).parents('.first-col').find('.hPF').val();
			var hSF=$(this).parents('.first-col').find('.hSF').val();
			var hSG=$(this).parents('.first-col').find('.hSG').val();
			var hPG=$(this).parents('.first-col').find('.hPG').val();


			var guestteam=$(this).parents('.first-col').find('.g').attr('guestteam');
			var gC=$(this).parents('.first-col').find('.gC').val();
			var gPF=$(this).parents('.first-col').find('.gPF').val();
			var gSF=$(this).parents('.first-col').find('.gSF').val();
			var gSG=$(this).parents('.first-col').find('.gSG').val();
			var gPG=$(this).parents('.first-col').find('.gPG').val();

			var id=$(this).attr('firstId');
			//alert("type=add&league="+league+"&ptime="+ptime+"&hometeam="+hometeam+"&hC="+hC+"&hPF="+hPF+"&hSF="+hSF+"&hSG="+hSG+"&hPG="+hPG+"&guestteam="+guestteam+"&gC="+gC+"&gPF="+gPF+"&gSF="+gSF+"&gSG="+gSG+"&gPG="+gPG+"")
			$.ajax({
				url:"datapage/first.php",
				type:"POST",
				data:"type=add&league="+league+"&ptime="+ptime+"&hometeam="+hometeam+"&hC="+hC+"&hPF="+hPF+"&hSF="+hSF+"&hSG="+hSG+"&hPG="+hPG+"&guestteam="+guestteam+"&gC="+gC+"&gPF="+gPF+"&gSF="+gSF+"&gSG="+gSG+"&gPG="+gPG+"&id="+id+"",
				success:function(str){
					console.log(str);
					var oData=eval('('+str+')');
					alert(oData.msg);
				}
			})
		});
	}
});