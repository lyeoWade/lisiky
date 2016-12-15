var g_aWeekName=
[
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven"
];

window.onload=function ()
{
	var aImg=document.getElementById('clock').getElementsByTagName('img');
	
	var oDate=new Date();
	var s=oDate.getFullYear()+''+toDou((oDate.getMonth()+1))+toDou(oDate.getDate());
	s+=toDou(oDate.getHours());
	s+=toDou(oDate.getMinutes());
	s+=toDou(oDate.getSeconds());
	
	for(var i=0;i<aImg.length;i++)
	{
		
			
	}
	
};

function toDou(n)
{
	return n<10?'0'+n:''+n;
};










