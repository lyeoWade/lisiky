//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var m=require('weibo_m.js');
	var v=require('weibo_v.js');
	
	exports.createAdd=function ()
	{
		var oBtn=document.getElementById('btn_snd');
		var oTxt=document.getElementById('tijiaoText');
		
		oBtn.onclick=function ()
		{
			m.add(oTxt.value, function (json){
				v.createReply(json.id, oTxt.value, json.time, 0, 0);
			});
		};
	};
});