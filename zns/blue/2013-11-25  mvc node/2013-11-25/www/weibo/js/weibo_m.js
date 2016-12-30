//版权 北京智能社©, 保留所有权利

//M——所有跟数据相关的工作
define(function (require, exports, module){
	var common=require('common.js');
	
	//函数
	var json2url=common.json2url;
	var ajax=common.ajax;
	var parseJson=common.parseJson;
	
	var URL='weibo.php';
	
	module.exports={
		add:	function (content, fnSucc)
		{
			var url=URL+'?'+json2url({act: 'add', content: content});
			
			ajax(url, function (str){
				var data=parseJson(str);
				
				fnSucc && fnSucc(data);
			});
		}
	};
});