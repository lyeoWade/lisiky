
$(function(){
	var PageSize=20,nowpage=1,newtype='';
	var Sid=geturldata(window.location.href);
	if(Sid){
		newtype=Sid.id;
	}else{
		newtype='';
	}
	//getNewsList(newtype,nowpage,PageSize);
	
});

function getNewsList(newtype,nowpage,PageSize){
		$.ajax({
		url:"phpdata/datapage/arclist.php",
		type:"POST",
		beforeSend: function(data){
			loading();
		},
		data:"type=getSelectNewsList&newtype="+newtype+"&PageSize="+PageSize+"&nowpage="+nowpage+"",
		success:function(str){
			console.log(str);
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			//pagefn(now_page,str);
			var oData=$.parseJSON(str);
			if(oData.Total==0){
				$('.content-box-warps').html("暂无数据;").animate({opacity:1});
			}else{
				var newtype='',html='';
				for(var i=0; i<oData.result.length; i++){
					var obj=eval('('+oData.result[i]+')');
					switch(obj.newtype){
						case '1':
							newtype="篮球新闻";
						break;
						case '2':
							newtype="足球新闻";
						break;
						case '3':
							newtype="实时新闻";
						break;
						case '4':
							newtype="神棍区";
						break;
						case '5':
							newtype="推荐文章";
						break;
						case '6':
							newtype="篮球心水";
						break;
						case '7':
							newtype="足球心水";
						break;
					}

					html+='<section class="content-list"><div class="h2_box"><h2><a   title="'+obj.title+''+keys()+'" target="_blank"  href="content.html?id='+obj.id+'">'+obj.title+'</a></h2>\
					<p class="info-title">所属栏目:<a href="news.html?id='+obj.newtype+'">'+newtype+'</a><span>'+obj.datatime+'</span></p>\
					</div><div class="clearfix warp_c"><div class="descripion fl"><p class="des" title="'+obj.title+''+keys()+'">'+obj.descption+'</p></div></div>\
					<div class="clearfix list_info"><p class="fr"><a title="'+obj.title+''+keys()+'" href="content.html?id='+obj.id+'" target="_blank">阅读全文</a></p</div></section>';
				};
				$('.content-box-warps').html(html).animate({opacity:1});

				pagination(oData.Total,PageSize,nowpage,function(nowpage){
					getNewsList(nowpage,PageSize);
				})
			}
		},
		complete:function(){

		}
	})
}
