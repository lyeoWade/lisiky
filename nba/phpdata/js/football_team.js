LeagueList();
function LeagueList(){
		
	var oLeagueList=document.querySelectorAll('.leagueList')[0];
	var oTeamList=document.querySelectorAll('.teamList')[0];
	
	//循环球队数组
	for(var i=0; i<footballTeam.length; i++){
		oLeagueList.innerHTML+='<option value="'+footballTeam[i].league+'">'+footballTeam[i].league+'</option>';
		
	}
	oLeagueList.options[2].selected=true;
	
	//下拉框触发时改变相应的球队
	oLeagueList.onchange=function(){
		for(var i=0; i<footballTeam.length; i++){
			if(footballTeam[i].league==oLeagueList.options[oLeagueList.selectedIndex].value){
				teamList(footballTeam[i].teams);
				oLeagueList.id=oLeagueList.options[oLeagueList.selectedIndex].value;
				oTeamList.options[6].selected=true; //不要默认的是第一个,不然一开始选择的时候第一个不会触发
				
			}
		}
	}
	
	function teamList(obj){
		oTeamList.innerHTML='';
		for(var j=0; j<obj.length; j++){
			oTeamList.innerHTML+='<option value="'+obj[j]+'">'+obj[j]+'</option>';	
			
		}
	}
	
	
	oTeamList.onchange=function(){
		oTeamList.id=oTeamList.options[oTeamList.selectedIndex].value;
	}
	
	

}



$(function(){
	//发布  发送ajax
	
	$('#surebtn').on('click',function(){
		
		$.ajax({
			url:"aaa.php",
			type:"POST",
			data:"act=list",
			beforeSend: function(desc){
				alert(desc);
			},
			success: function(bdata){
					
			}
		});
		
	});
	
});






