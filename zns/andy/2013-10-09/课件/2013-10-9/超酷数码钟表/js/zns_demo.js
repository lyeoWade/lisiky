var g_aWeekName=
[
	"seven",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six"
];

window.onload=function ()
{
	var aImg=document.getElementById('clock').getElementsByTagName('img');
	
	setInterval(fn,1000);
	fn();
	
	function fn(){
		var oDate=new Date();
		var s=oDate.getFullYear()+'a'+toDou((oDate.getMonth()+1))+'a'+toDou(oDate.getDate())+'a';
		s+=toDou(oDate.getHours())+'a';
		s+=toDou(oDate.getMinutes())+'a';
		s+=toDou(oDate.getSeconds())+'a';
		
		
		for(var i=0;i<aImg.length-1;i++)
		{
			if(s.charAt(i)=='a')continue;
			aImg[i].src="images/"+s.charAt(i)+".png";
		}
		
		aImg[aImg.length-1].src="images/"+g_aWeekName[oDate.getDay()]+".png";	
	}
};

function toDou(n)
{
	return n<10?'0'+n:''+n;
};










