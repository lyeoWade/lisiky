//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var modA=require('a.js');
	var modB=require('b.js');
	
	exports.sum=function ()
	{
		alert(modA.a+modB.b);
	};
});