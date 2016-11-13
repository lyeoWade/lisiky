

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
	

function keys(){
	var keywords=['我爱NBA,NBA篮球推荐,韦德国际,伟德国际,伟德国际备用网址','吉祥坊|吉祥坊合作伙伴|吉祥坊合作|吉祥坊官网|吉祥坊备用网址|吉祥坊手机官网|www.jxf2012.com','356|bet365|365手机网址|365菠菜|365比分','吉祥坊备用网址,吉祥坊,吉祥坊手机官网','威廉希尔,威廉希尔备用网址','韦德国际,伟德国际,伟德国际备用网址','吉祥坊|吉祥坊合作伙伴|吉祥坊合作|吉祥坊官网|吉祥坊备用网址|吉祥坊手机官网'];
	return keywords[roundNum(0,keywords.length-1)];
}






var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?ec074110fa21030012a6f913f5baa7f0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();