//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var common=require('common.js');
	
	exports.readFromBaidu=function (str, fnSucc)
	{
		common.jsonp(
			'http://suggestion.baidu.com/su',
			{wd: str},
			'cb',
			fnSucc
		);
	};
});