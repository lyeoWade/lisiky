//版权 北京智能社©, 保留所有权利

(function (){
	var form_reg={
		email:		/^([a-z0-9][\w\.]*@[a-z0-9\-]+(\.[a-z]{2,4}){1,2})$/,
		cn_name:	/^([\u4e00-\u9fa5]{2,8})$/,
		zip_code:	/^([1-9]\d{5})$/,
		pass:		/^(.{4,32})$/,
		pass2:		/^(.{4,32})$/
	};
	window.formCheck=function (id, fnCheck)
	{
		var oForm=document.getElementById(id);
		var aInput=oForm.getElementsByTagName('input');
		function check(oTxt, re)   // 文本框   re
		{
			//第一关
			if(re.test(oTxt.value)) //如果文本框里的值匹配正确了
			{
				//第二关
				if(!fnCheck) //如果没有fnCheck  如果外面没有调用这个函数那么~~~~~~~~~~~~~~
				{
					oTxt.className='ok'; 
					return true;
				}
				else  // 如果有这个函数
				{
					if(fnCheck(oTxt)) //
					{
						oTxt.className='ok';
						return true;
					}
					else
					{
						oTxt.className='error';
						return false;
					}
				}
			}
			else
			{
				oTxt.className='error';
				return false;
			}
		}
		
		//失去焦点
		for(var i=0;i<aInput.length;i++)
		{
			if(form_reg[aInput[i].name])
			{
				(function (index){
					aInput[i].onblur=function ()
					{
						check(this, form_reg[aInput[index].name]);
					};
				})(i);
			}
		}
		//提交
		oForm.onsubmit=function ()
		{
			var ok=true;
			
			for(var i=0;i<aInput.length;i++) //  
			{
				if(form_reg[aInput[i].name]) //如果这些input的那么有form_reg[]里匹配的 就走~~~  
				{
					if(false==check(aInput[i], form_reg[aInput[i].name])) //如果check有一个没有完成 那ok就等于false
					{
						ok=false;
					}
				}
			}
			
			if(!ok)  //只要ok没完成那么久 return  false
			{
				return false;
			}
		};
	};
	
	document.write('<link rel="stylesheet" type="text/css" href="formCheck.css" />');
})();