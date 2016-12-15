//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var common=require('common.js');
	var move=require('move.js');
	var jq=require('jquery-1.7.2.js');
	
	exports.createSlider=function (id)
	{
		var oDiv=document.getElementById(id);
		var aBtn=oDiv.getElementsByTagName('ol')[0].children;
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		
		for(var i=0;i<aBtn.length;i++)
		{
			(function (index){
				aBtn[i].onclick=function ()
				{
					for(var i=0;i<aBtn.length;i++)
					{
						aBtn[i].className='';
					}
					this.className='active';
					move.startMove(oUl, {top: -index*aLi[0].offsetHeight});
				};
			})(i);
		}
	};
});