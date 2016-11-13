
$(function(){
	var pageid=$('body').attr('pageid');
	var userid=getCookie('userid');
	if(pageid){
		//得到文章的内容

		$.ajax({
			url:"phpdata/datapage/arclist.php",
			type:"POST",
			data:'type=GetOneUserArticleInfo&id='+pageid+'&userid='+userid,
			success:function(str){
				console.log(str);
				var sData=eval('('+str+')');
				if(sData.respondCode==0){
					$('#titles').val(sData.title);
					$('#description').val(sData.descption);
					$('#newtype').val(sData.type_id);
					$('#keywords').val(sData.keywords);
					setTimeout(function(){
		              setContent(sData.article,true);
		            },1100)
				}else{
					alert(sData.respondMsg);
					history.go(-1);
				}
			}
		})
	};

	function setContent(str,isAppendTo) {
	    var arr = [];
	    arr.push();
	    UE.getEditor('container').setContent(str, isAppendTo);
	    return arr;
	};


	$('#push_btn').on('click',function(){
		
		var username=getCookie('username');
		var title=$('#titles').val();
		var description=$('#description').val();

		var newtype=$('#newtype').val();
		var keywords=$('#keywords').val();
		var content=UE.getEditor('container').getContent();
		
		if(title=='' || description==''|| content==''){
			alert('请填写完整');
			return false;
		}
		description=description.replace(/[\n]/ig,'');


		if(pageid){
			//修改
			var datas='type=UpdataOneUserArticle&id='+pageid+'&title='+title+'&description='+description+'&keywords='+keywords+'&username='+username+'&ManagerType=2&newtype='+newtype+'&content='+encodeURIComponent(content);
		}else{
			var datas='type=AddOneArticle&title='+title+'&description='+description+'&keywords='+keywords+'&username='+username+'&ManagerType=2&newtype='+newtype+'&userid='+userid+'&content='+encodeURIComponent(content);
		};

		//alert(datas);
		$.ajax({
			url:'phpdata/datapage/arclist.php',
			type:'POST',
			data:datas,
			success:function(str){
				console.log(str);
				var oData=eval('('+str+')');
				if(oData.respondCode==0){
					alert(oData.respondMsg);
					history.go(-1);
				}else{
					alert(oData.respondMsg);
				}
			}
		})

	})

});