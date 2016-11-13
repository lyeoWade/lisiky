LeagueList();
function LeagueList(){
		
	var oLeagueList=document.querySelectorAll('.leagueList')[0];
	var oTeamList=document.querySelectorAll('.teamList')[0];
	
	//循环球队数组
	for(var i=0; i<basketballTeam.length; i++){
		oLeagueList.innerHTML+='<option value="'+basketballTeam[i].league+'">'+basketballTeam[i].league+'</option>';
		
	}
	oLeagueList.options[2].selected=true;
	
	//下拉框触发时改变相应的球队
	oLeagueList.onchange=function(){
		for(var i=0; i<basketballTeam.length; i++){
			if(basketballTeam[i].league==oLeagueList.options[oLeagueList.selectedIndex].value){
				teamList(basketballTeam[i].teams);
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




//新增球队数据
$(function(){


	//发布球队
	$('#surebtn').on('click',function(){

		// if($('.leagueList').attr('id')==undefined){
		// 	alert("请选择联赛！");
		// 	return false;
		// }
		// if($('.teamList').attr('id')==undefined){
		// 	alert("请选择球队！");
		// 	return false;
		// }

		$.ajax({
			url:"datapage/basketball_team.php",
			type:"POST",
			data:"type=basketball&method="+$('#method').val()+"&league="+$('.leagueList').val()+"&team="+$('.teamList').val()+"&logo="+$('#logo').val()+"&homelink="+$('#homelink').val()+"&season="+$('.seasons').val()+"&sivision="+$('.sivision').val()+"&coach="+$('#coach').val()+"&win="+$('#win').val()+"&lose="+$('#lose').val()+"",
			beforeSend: function(desc){
				//alert(desc);
			},
			success: function(bdata){
				var datas=eval('('+bdata+')');	
				if(datas.code==0){
					alert(datas.msg);
					getList(); //获取球队列表
				}else{
					alert(datas.msg)
				}
			},
			complete:function(){
				$('#method').val('')
			}
		});

	});
	
	//默认
	getList();//获取球队列表
	
	/*
	$('#leagueList').on('change',function(){
		alert($('#seasonList').val())	
	});*/
	
});

//select * from student where sex='男' and age=20;

//getList();

//获取列表
function getList(){
		//alert($('#seasonList').val())
		$.ajax({
		url:"datapage/basketball_team.php",
		type:"POST",
		data:"type=list&seasonList="+$('#seasonList').val()+"&leagueList="+$('#leagueList').val()+"",
		success: function(data){
			
			//var json=$.parseJSON(data);
			var json=eval('('+data+')');
			//console.log(data)
			var Liststr='';
			for(var i=0; i<json.result.length; i++){
				//alert(json.result[i])
				var newjson=eval('('+json.result[i]+')');
				if(newjson.sivision==''){
					newjson.sivision='-';
				}
				Liststr+='<li><div class="w5 pull-left">'+newjson.id+'</div>';
                Liststr+='<div class="w15 atc_title pull-left"><a href="../content.html?page='+newjson.id+'" target="_blank">'+newjson.league+'</a></div>';
                Liststr+='<div class="w15 pull-left">'+newjson.team+'</div>';
                Liststr+='<div class="w5 pull-left"><a href="'+newjson.logo+'">LOGO</a></div>';
				Liststr+='<div class="w10 pull-left"><a href="'+newjson.homelink+'" target="_blank" >前往主页</a></div>';
				Liststr+='<div class="w10 pull-left">'+newjson.season+'</div>';
				Liststr+='<div class="w5 pull-left">'+newjson.sivision+'</div>';
                Liststr+='<div class="w10 pull-left" typeid="">'+newjson.coach+'</div>';
				Liststr+='<div class="w5 pull-left red">'+newjson.win+'</div>';
				Liststr+='<div class="w5 pull-left green">'+newjson.lose+'</div>';
                Liststr+='<div class="handle pull-left w15"><a href="javascript:;" tagid="'+newjson.id+'">删除</a><a href="javascript:;" editid="'+newjson.id+'" data-updata="league:'+newjson.league+',team:'+newjson.team+',logo:'+newjson.logo+',homelink:'+newjson.homelink.replace(':','$')+',season:'+newjson.season+',coach:'+newjson.coach+',win:'+newjson.win+',lose:'+newjson.lose+',sivision:'+newjson.sivision+'">修改</a></div></li>';	
			};
			
			
			$('.list_box').html(Liststr);
			
			Delete("deletesTeam","datapage/basketball_team.php",function(){
				getList();//获取球队列表
			})//删除

			updata(); //修改
		},
		error: function(){
			
		}	
	});	
};

//修改

function updata(){
	var oBtn=$('.handle a:contains("修改")');
	
    oBtn.on("click",function(){
    	var str=$(this).attr('data-updata');
		var d=$.parseJSON(CreateJson(str));//字符串
		//{"league":"NBA","team":"勇士","logo":"phpdata/images/logo/9.png","homelink":"http","season":"2015-2016","coach":"史蒂夫-科尔","win":"39","lose":"4","sivision":"-"}
		console.log(CreateJson(str))
		$('.leagueList').val(d.league);//联赛
		$('#homelink').val(d.homelink.replace('$',':'));//球队链接
		$('.seasons').val(d.season);
		$('.sivision').val(d.sivision);
		$('#coach').val(d.coach);
		$('#logo').val(d.logo);//logo
		$('#win').val(d.win);//胜场
		$('#lose').val(d.lose);//败场

		var oEditId=$(this).attr('editid');

		
		$('.teamList').html('<option value="'+d.team+'">'+d.team+'</option>');//球队
		$('#method').val(oEditId);
		//alert(oEditId)
	});
   
}



/*
<img src="phpdata/images/tumblr_mr1ojlwZ7L1qfzzdqo3_500.jpg" alt="封面图片就是首页的banner图片">
	未做 
		选择联赛查询
		选择赛季查询
*/
