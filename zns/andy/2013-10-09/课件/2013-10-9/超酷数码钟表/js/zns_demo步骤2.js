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
	var s=oDate.getFullYear()+'6'+toDou((oDate.getMonth()+1))+'1'+toDou(oDate.getDate())+'1';
	s+=toDou(oDate.getHours())+'1';
	s+=toDou(oDate.getMinutes())+'1';
	s+=toDou(oDate.getSeconds())+'10';
	
	for(var i=0;i<aImg.length;i++)
	{
		if(i==4||i==7||i==10||i==13||i==16||i==19)continue;
		aImg[i].src="images/"+s.charAt(i)+".png";
	}
	
};

function toDou(n)
{
	return n<10?'0'+n:''+n;
};










