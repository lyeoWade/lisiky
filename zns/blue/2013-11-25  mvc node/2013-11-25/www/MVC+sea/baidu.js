//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var m=require('baidu_m.js');
	var v=require('baidu_v.js');
	
	module.exports={
		createList:		function (txtId, ulId)
		{
			var oTxt=document.getElementById(txtId);
			
			oTxt.onkeyup=function ()
			{
				//用到M
				m.readFromBaidu(this.value, function (json){
					//交给V
					v.createList(ulId, json.s);
				});
			};
		},
		createRelated:	function (txtId, btnId, divId)
		{
			var oTxt=document.getElementById(txtId);
			var oBtn=document.getElementById(btnId);
			
			oBtn.onclick=function ()
			{
				m.readFromBaidu(oTxt.value, function (json){
					v.createRelated(divId, json.s);
				});
			};
		}
	};
});