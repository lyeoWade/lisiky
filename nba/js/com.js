



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






// tabswitch
$(function(){
	$('.columnwrap li').on('mouseenter',function(){
    	$('.columnwrap li').removeClass('active');
	  	$('.tabswitch').css('display','none');
	  	$(this).addClass('active');
	  	$('.tabswitch').eq($(this).index()).css('display','block');
	})
});


var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?ec074110fa21030012a6f913f5baa7f0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();