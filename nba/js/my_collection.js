$(function(){
	//获取收藏列表
	var PageSize=28,nowpage=1,userid=getCookie('userid');
	//console.log(userid)
	getCollectionList(PageSize,nowpage,userid)
});



function getCollectionList(PageSize,nowpage,userid){
		$.ajax({
		url:"phpdata/datapage/collection.php",
		type:"POST",
		data:"type=getCollectionList&PageSize="+PageSize+"&nowpage="+nowpage+"&userid="+userid,
		success: function(str){
			console.log(str)
			var oData=$.parseJSON(str);
			if(oData.Total==0){
				$('.notfound').removeClass('hidden');
				pagination(oData.Total,PageSize,nowpage,function(nowpage){
					getCollectionList(PageSize,nowpage);
				})
			}else{
				var newjjHtml='';
				for(var i=0; i<oData.result.length; i++){
					console.log(oData.result[i])
					var oNewData=eval('('+oData.result[i]+')');//<i class="cancelVideo">取消</i>
					newjjHtml+='<li><a target="_blank" href="'+oNewData.videoDetail+'_'+oNewData.Vid+'.html"><img src="'+oNewData.thumPic.substring(3)+'" /><span>'+oNewData.title+'</span></a></li>';
				}
				$('#my_collection_list').html(newjjHtml).animate({opacity:1});
				
				pagination(oData.Total,PageSize,nowpage,function(nowpage){
					getCollectionList(PageSize,nowpage,userid)
				})
			}
		},
		error: function(){
			
		}	
	});	
};

