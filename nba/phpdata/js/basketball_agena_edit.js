$(function(){
	initialPage();

	updateOneAgean();
});


function initialPage(){
	$.ajax({
		url:'datapage/basketball_team.php',
		type:'POST',
		data:'type=GetOneAgena&id='+geturldata(window.location.href).id,
		success:function(str){
			//console.log(str);
			var sData=eval('('+str+')');

			if(sData.responseCode==0){
				console.log(sData);

				$('#leagueList').val(sData.league);
				getteam(sData.league,function(){
					$('#homeId').val(sData.homeid);
					$('#guestId').val(sData.guestid);
				});

				$('#seasons').val(sData.season);
				$('#ptime').val(sData.ptime);
				$('#l1').val(sData.l1);
				$('#b1').val(sData.b1);
				$('#lb1').val(sData.lb1);
				$('#bb1').val(sData.bb1);
				$('#isend').val(sData.isend);
				$('#isGuess').val(sData.isGuess);
				$('#guessTime').val(sData.guessTime);
				$('#summary').val(sData.summary);
				$('#isMoney').val(sData.isMoney);
				
				setTimeout(function(){
					setContent(sData.analysis);
				},500);
			}else{
				alert(sData.responseMsg);
				history.go(-1);
			}
		}
	});
}

function setContent(str,isAppendTo) {
  var arr = [];
  arr.push();
  UE.getEditor('analysis').setContent(str, isAppendTo);
  return arr;
}
function getContent() {
  var arr = [];
  arr.push(UE.getEditor('analysis').getContent());
  return arr;
}
function getteam(oKeywords,fn){
	$.ajax({
		type:"POST",
		url:"datapage/basketball_team.php",
		data:"type=getteam&keyword="+oKeywords,
		success:function(str){
			var oData=eval('('+str+')');
			if(oData.counts!=0){
				var teams='';
				for(var i=0; i<oData.result.length; i++){
					var lastpase=eval('('+oData.result[i]+')');
					teams+='<option value="'+lastpase.id+'">'+lastpase.team+':'+lastpase.id+'</option>';
				}
				$('#homeId').html(teams);
				$('#guestId').html(teams);

				fn&&fn();
			}else{
				$('#guestId').html('<option value="暂无数据！">暂无数据！</option>')
				$('#homeId').html('<option value="暂无数据！">暂无数据！</option>');
			}
			//console.log(oData)
		},
		complete:function(){

		}
	});
}
//修改

function updateOneAgean(){
	$('#surebtn').on('click',function(){
		var isGuess=$('#isGuess').val();
		var $guessTime=$('#guessTime').val();
		var gTime='';
		if($('#isGuess').val()==0){ //0 ->推荐
			gTime=$guessTime;
		}else{// 1->不推荐
			gTime='';
		}

		var datas='type=UpdateOneAgean&league='+$('#leagueList').val()+'&homeId='+$('#homeId').val()+'&guestId='+$('#guestId').val()+'&seasons='+$('#seasons').val()+'&ptime='+$('#ptime').val()+'&l1='+$('#l1').val()+'&b1='+$('#b1').val()+'&lb1='+$('#lb1').val()+'&bb1='+$('#bb1').val()+'&isend='+$('#isend').val()+'&isGuess='+isGuess+'&isMoney='+$('#isMoney').val()+'&summary='+$('#summary').val()+'&guessTime='+gTime+'&analysis='+getContent()+'&id='+geturldata(window.location.href).id;
		
		$.ajax({
			type:"POST",
			url:"datapage/basketball_team.php",
			data:datas,
			success:function(str){
				var oData=eval('('+str+')');
				if(oData.responseCode==1){
					alert(oData.responseMsg);
					history.go(-1);
				}else{
					alert(oData.responseMsg);
				}
			},
			complete:function(){

			}
		});
	})
}



