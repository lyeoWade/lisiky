

function seeting(){
	var arr=[];
	//var oData;
	$.ajax({
		type:"POST"	,
		url:"phpdata/datapage/othersetting.php",
		data:"type=GetOtherSetting",
		async: false, 
		success: function(str){
			var oData=$.parseJSON(str);
			arr.push({
				contactQQ:  oData.contactQQ,
				description:oData.description,
				fLink:      oData.fLink,
				keyword:    oData.keyword,
				keyword1:   oData.keyword1,
				keyword2:   oData.keyword2,
				keyword3:   oData.keyword3,
				newsTag:    oData.newsTag,
				statement1: oData.statement1,
				statement2: oData.statement2,
				videoTag:   oData.videoTag
			})
			
		}
	});	
	return arr[0];	
};


function loading(){
	
	var oLoayer=document.createElement('div');
	oLoayer.className='layer_loading';
	
	oLoayer.innerHTML='<div id="load"><div>加</div><div>载</div><div>中</div><div>,</div><div>请</div><div>稍</div><div>后</div></div>';
	document.body.appendChild(oLoayer);
	
};




function roundNum(s, b){
	return parseInt( Math.random()*(b-s+1)+s);
};
//关键字seo
	



