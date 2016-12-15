//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	var common=require('common.js');
	
	//模板元素
	var oTmpReply=document.getElementById('tmp_reply');
	var oReplyParent=oTmpReply.parentNode;
	
	oReplyParent.removeChild(oTmpReply);
	
	//准备
	dupEle=common.dupEle;
	
	module.exports={
		createReply:	function (id, content, time, acc, ref)
		{
			var oDate=new Date();
			oDate.setTime(time*1000);
			
			var sDate=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+oDate.getHours()+':'+oDate.getMinutes();
			
			var oNewDiv=dupEle(oTmpReply, {content: content, time: sDate, acc: acc, ref: ref});
			
			oReplyParent.appendChild(oNewDiv);
		}
	};
});