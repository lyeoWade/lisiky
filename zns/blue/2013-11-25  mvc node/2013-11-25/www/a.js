//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var str='b.js';
	var modB=require(str);
	
	exports.show=function ()
	{
		alert(modB.b);
	};
	
	module.exports={
		a: 555,
		b: 666,
		c: 777,
		hanshu: function ()
		{
			alert('abc');
		}
	};
});