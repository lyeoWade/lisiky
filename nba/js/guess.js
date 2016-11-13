


$(function(){
	//basketballData();
	var uid=getCookie('userid');
	updata();

	initPageGuess(uid)
});

function basketballData(){

	//请求篮球竞猜数据
	$.ajax({
		url:"web/guess.php",
		type:"POST",
		data:"type=basketball",
		success:function(cbdata){
			console.log(cbdata)
			var sdate=eval('('+cbdata+')');
			//console.log(sdate)
			if(sdate.counts>0){
				console.log(sdate.result);
				var warpHtml='';
				for(var i=0; i<sdate.result.length; i++){
					var baskList=eval('('+sdate.result[i]+')');
						warpHtml+='<li class=""><div class="line-title">';
                        warpHtml+='<ol class="line-guess-title"><li class="w10">'+baskList.league+'</li><li class="w15 blue">'+baskList.ptime+'</li><li class="w10 wsn">半场</li><li class="w22">半场竞猜</li><li class="w5"></li><li class="w5"></li><li class="w10">全场</li><li class="w22">全场竞猜</li></ol></div>';
                        warpHtml+='<div class="guset_title clearfix">';
                        warpHtml+='<div class="w15 fl"><i class="red">(主)</i>&nbsp;'+baskList.hometeam+'</div>';
                        warpHtml+='<div class="fl w5 tc">-</div>';
                        warpHtml+='<div class="fl w5 tc">-</div>';
                        warpHtml+='<div class="fl w10 tc">-/-</div>';
                        warpHtml+='<div class="fl w22 tc bc"><div class="w45 tc fl wsn orange">半场让分 '+baskList.lb1+'</div><div class="w45 tc fr wsn orange">半场大小 '+baskList.bb1+'</div></div>';
                        warpHtml+='<div class="fl w5 tc">-</div><div class="fl w5 tc">-</div><div class="fl w10 tc red">-</div>';
                        warpHtml+='<div class="fl w22 tc"><div class="w45 tc fl wsn orange">全场让分 '+baskList.l1+'</div><div class="w45 tc fr wsn orange">全场大小 '+baskList.b1+'</div></div></div>';
                        warpHtml+='<div class="guset_content">'
                        warpHtml+='<div class="w15 fl"><i class="green">(客)</i>&nbsp;'+baskList.guestteam+'</div>'
                        warpHtml+='<div class="fl w5 tc">-</div>'
                        warpHtml+='<div class="fl w5 tc">-</div>'
                        warpHtml+='<div class="fl w10 tc">-/-</div>'
                        warpHtml+='<div class="fl w22 tc bc">'
                        warpHtml+='<div class="fl w45 tc bcxx"><span class="selectbtn">主</span><span class="selectbtn">客</span></div>'
                        warpHtml+='<div class="fr w45 tc bcxx"><span class="selectbtn">大</span><span class="selectbtn">小</span></div></div>'
                        warpHtml+='<div class="fl w5 tc">-</div>'
                        warpHtml+='<div class="fl w5 tc">-</div>'
                        warpHtml+='<div class="fl w10 tc red">-</div>'
                        warpHtml+='<div class="fl w22 tc bc">'
                        warpHtml+='<div class="fl w45 tc bcxx"><span class="selectbtn">主</span><span class="selectbtn">客</span></div>';
                        warpHtml+='<div class="fr w45 tc bcxx"><span class="selectbtn">大</span><span class="selectbtn">小</span></div>'
                        warpHtml+='</div></div></li>';
					
				}

				$('.user-gusetwarp-list').html(warpHtml);
				//alert(123)
				updata();
			}else{
				$('.user-gusetwarp-list').html("!暂无数据！");
			}
			
		}
	});
}


function updata(){
	var $touchBtn=$('.touchBtn');

	$touchBtn.on('click',function(){
		if(getCookie('userid')==''){
			unlogin();
			return false;
		}else{
			var _this=$(this);

			//判断是否已经竞猜此项
			var $userid=getCookie('userid');
			var sDataMod=$(this).attr('data-mod').split(',');

			/*
				sDataMod[0]  //竞猜类型
				sDataMod[1]  //竞猜比赛id
				sDataMod[2]  //竞猜详细
				sDataMod[3]  //竞猜日期
				sDataMod[4]  //竞猜盘口
			*/


			var guesstypeHtml='',guessDetailHtml='',pankou=sDataMod[4];
			switch(sDataMod[0]){
				case '1':
					guesstypeHtml="半场让分";
				break;
				case '2':
					guesstypeHtml="半场大小";
				break;
				case '3':
					guesstypeHtml="全场让分";
				break;
				case '4':
					guesstypeHtml="全场大小";
				break;
			}

			switch(sDataMod[2]){
				case 'h':
					guessDetailHtml="主胜";
				break;
				case 'g':
					guessDetailHtml="客胜";
				break;
				case 'o':
					guessDetailHtml="大";
				break;
				case 'u':
					guessDetailHtml="小";
				break;
			}


			//alert(sDataMod);

			//先判断是否还能竞猜(次数够不够)
			var datas='type=checkIsGuess&id='+sDataMod[1]+'&userid='+$userid+'&guesstype='+sDataMod[0]+'&guessdetail='+sDataMod[2]+'&guessTime='+sDataMod[3];

			var reqdatas='id='+sDataMod[1]+'&userid='+$userid+'&guesstype='+sDataMod[0]+'&guessdetail='+sDataMod[2]+'&guessTime='+sDataMod[3]+'&pankou='+sDataMod[4];
			$('#d').attr('fuckdata',reqdatas)
			
			$.ajax({
				url:'web/guess.php',
				type:"POST",
				data:datas,
				success:function(str){
					console.log(str);
					var sData=eval('('+str+')');

					if(sData.respondCode==1){
						guessTipFn(function(){
							$('.guessdetail').html(sData.respondMsg);
							$('.subBtn').html('<a href="javascript:;" class="cancleBtn">关闭</a>');
							$('.important').remove();
						});
					}else{

						// if(sData.respondCode==1){
						// 	alert('今日次数已用完！');
						// 	return false;
						// }else{
							if(sData.isKey==1){
								//isKey=1 表示还有一次重点竞猜的机会
								guessTip(3,sData.guessNum,guesstypeHtml,guessDetailHtml,pankou,_this);

							}else{
								guessTip(2,sData.guessNum,guesstypeHtml,guessDetailHtml,pankou,_this);
							}
						//}
						
						//console.log(sData)
					}
				}
			})


		}
	});
}


//初始化页面


function initPageGuess(uid){
	$.ajax({
		url:'web/guess.php',
		type:"POST",
		data:"type=myGuessList&userid="+uid,
		success:function(str){
			console.log(str);

			var sData=eval('('+str+')');
			if(sData.respondCode!=1){
				for(var i=0; i<sData.result.length; i++){
					var oListArr=eval('('+sData.result[i]+')')
					
					//z找到页面所有的data-mod  对比gameid
					for(var j=0; j<$('a[data-mod]').length; j++){

						if($('a[data-mod]').eq(j).attr('data-mod').split(',')[1]==oListArr.gameid && $('a[data-mod]').eq(j).attr('data-mod').split(',')[0]==oListArr.guesstype){
							$('a[data-mod]').eq(j).addClass('active');
						}
					}
				}
			}else{
				
				
			}
		}
	})
}


//判断是否已经竞猜此项

//没有登录

function unlogin(){
	var str='<div id="leayerGuess"><div class="lwrap"><h2>您还没有登录!</h2>\
        <div class="subBtn" style="padding-top: 20px;">\
            <a href="javascript:;" class="cancleBtn">取消</a>\
            <a href="login" class="sureBtn">马上登录</a>\
        </div></div></div>';
	$(document.body).append(str);


	$('.cancleBtn,#leayerGuess').on('click',function(ev){
		$('#leayerGuess').remove();
	});
   $(".lwrap").on('click',function(event){
        event.stopPropagation();
    });
};

function guessTip(type,guessNum,guesstypeHtml,guessDetailHtml,pankou,_this){

	var str='<div id="leayerGuess"><div class="lwrap">\
        <h2>您确定提交此竞猜结果吗？</h2>\
        <p class="guessdetail"></p>\
        <p class="important"><input type="checkbox" /></b></p>\
        <p class="guessNum"></p>\
        <div class="subBtn">\
            <a href="javascript:;" class="sureBtn">确定</a>\
            <a href="javascript:;" class="cancleBtn">取消</a>\
        </div>\
        <p class="goldtip">您的金币不足,<a href="" target="_blank">立即充值</a>!</p></div></div>';
        $(document.body).append(str);

	if(type==1){
		$('.guessdetail').html("该场次已竞猜,请勿重复提交！");
		$('.subBtn').html('<a href="javascript:;" class="cancleBtn">关闭</a>');
		$('.important').remove();
	}else if(type==2){
		//type=2  重点场次已用完
		$('.important').remove();
		$('.guessNum').html('您今天还可以竞猜'+guessNum+'次');
	}else if(type==3){
		$('.guessNum').html('您今天还可以竞猜'+guessNum+'次');
		$('.important').html('<input type="checkbox"  id="imp" /><label for="imp">设置为重点竞猜<b>将扣除您5个金币！</b></label>')
		$('.guessdetail').html(guesstypeHtml+'&nbsp;&nbsp;&nbsp;'+pankou+'&nbsp;&nbsp;'+guessDetailHtml);
	}

	$('.sureBtn').on('click',function(){
		$(this).remove();
		surefn(_this);
	});
	$('.cancleBtn,#leayerGuess').on('click',function(ev){
		$('#leayerGuess').remove();
	});
    $(".lwrap").on('click',function(event){
        event.stopPropagation();
    });
	
};

function guessTipFn(fn){

	var str='<div id="leayerGuess"><div class="lwrap">\
        <h2>您确定提交此竞猜结果吗？</h2>\
        <p class="guessdetail"></p>\
        <p class="important"><input type="checkbox" /></b></p>\
        <p class="guessNum"></p>\
        <div class="subBtn">\
            <a href="javascript:;" class="sureBtn">确定</a>\
            <a href="javascript:;" class="cancleBtn">取消</a>\
        </div>\
        <p class="goldtip">您的金币不足,<a href="" target="_blank">立即充值</a>!</p></div></div>';
        $(document.body).append(str);
    
    fn&fn();
	$('.sureBtn').on('click',function(){
		$(this).remove();
		surefn(_this);
	});
	$('.cancleBtn,#leayerGuess').on('click',function(ev){
		$('#leayerGuess').remove();
	});
    $(".lwrap").on('click',function(event){
        event.stopPropagation();
    });
	
};




function surefn(_this){
	var $imp=$('#imp').is(':checked');
	var $isKey=0;
	if($imp==false){
		$isKey=0;
	}else{
		$isKey=1;
	}
	var datas='type=guessOneGame&isKey='+$isKey+'&'+$('#d').attr('fuckdata');
	//查询用户是否有足够的金币
	if($isKey==1){
		checkGold(function(){
			insertInto();
		});
	}else{
		//提交竞猜
		insertInto()
	}

	function insertInto(){
		$.ajax({
			url:'web/guess.php',
			type:'POST',
			data:datas,
			success:function(str){
				console.log(str);
				var sData=eval('('+str+')');
				if(sData.respondCode==0){
					
					_this.addClass('active');
					//alert('提交成功！');
					$('.goldtip').css('display','block').html('<a href="javascript:;">竞猜成功！</a>');
					setTimeout(function(){
						$('#leayerGuess').remove();
					},1500)

				}else{
					alert(sData.respondMsg)
				}
			}
		})
	}

}


//查询用户是否有足够的金币

function checkGold(fn){
	$.ajax({
		url:'web/guess.php',
		type:'POST',
		data:'type=checkGold&userid='+getCookie('userid'),
		success:function(str){
			var sData=eval('('+str+')');
			if(sData.gold<5){
				$('.goldtip').html('您的金币不足不能参与重点竞猜,<a href="" target="_blank">立即充值</a>!').css('display','block');
				return false;
				//alert('您的金币不足不能参与重点竞猜!<a href="">立即充值</a>');
			}else{
				fn&fn();
			}
		}
	})
}


/*
<div id="leayerGuess">
    <div class="lwrap">
        <h2>您确定提交此竞猜结果吗？</h2>
        <p class="guessdetail">大小竞猜  大  2.5</p>
        <p class="important"><input type="checkbox" />设置为重点竞猜<b>将扣除您5个金币！</b></p>
        <div class="subBtn">
            <a href="javascript:;" class="sureBtn">确定</a>
            <a href="javascript:;" class="cancleBtn">取消</a>
        </div>
    </div>
</div>

*/






















