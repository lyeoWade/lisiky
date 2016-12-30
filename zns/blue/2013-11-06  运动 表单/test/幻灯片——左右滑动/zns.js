/*
智能社© - http://www.zhinengshe.com/

微博：@北京智能社
微信：zhi_neng_she

最具深度的前端开发培训机构 HTML+CSS/JS/HTML5
*/


/* http://www.zhinengshe.com/ */

var timer      = null;
var autoTime   = null;
var ms         = 30;
var autoMs     = 3000;
var iTarget    = 0;
var speed      = 0;
var nextTarget = 0;

window.onload  = function()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    var oUl    = obj.getElementsByTagName("ul")[0];
    var oUlLis = oUl.getElementsByTagName("li");
    var oPrev  = obj.getElementsByTagName("p")[0];
    var oNext  = obj.getElementsByTagName("p")[1];

    oUl.style.width = oUlLis.length * oUlLis[0].offsetWidth + "px";

    for( var i = 0; i < aLis.length; i+=1 )
    {
        aLis[i].onmouseover = getIndx;
    }

    obj.onmouseover = function()
    {
        clearInterval(currentTime);
    }
    obj.onmouseout = function()
    {
        if(currentTime)
        {
            clearInterval(currentTime);
        }
        currentTime = setInterval("autoPlay()",autoMs);
    }

    oPrev.onmousedown = fnPrev;
    oNext.onmousedown = fnNext;

    currentTime = setInterval("autoPlay()",autoMs);
}

// ǰһ��
function fnPrev()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    nextTarget-=1;
    if(nextTarget < 0){ nextTarget = aLis.length-1; }
    goTime(nextTarget);
}

// ��һ��
function fnNext()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    nextTarget+=1;
    if(nextTarget === aLis.length){ nextTarget = 0; }
    goTime(nextTarget);
}

// �Զ�����
function autoPlay()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");

    nextTarget+=1;
    if( nextTarget >= aLis.length ) { nextTarget = 0; }
    goTime(nextTarget)
}

// ��ȡ��ǰ������ֵ
function getIndx()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");

    for( var i = 0; i < aLis.length; i+=1 )
    {
        if(aLis[i] === this)
        {
            goTime(i);
        }
    }
}

// ��ʼ����
function goTime(index)
{
    var obj      = document.getElementById("play");
    var oUl      = obj.getElementsByTagName("ul")[0];
    var oOl      = obj.getElementsByTagName("ol")[0];
    var aLis     = oOl.getElementsByTagName("li");
    var iLiWidth = oUl.getElementsByTagName("li")[0].offsetWidth;

    for( var i = 0; i < aLis.length; i+=1 )
    {
        aLis[i].className = "";
    }
    aLis[index].className = "active";

    iTarget = -index * iLiWidth;

    if(timer){ clearInterval(timer); }
    timer = setInterval("doMove("+ iTarget +")",ms)
}

// ͼƬ����
function doMove(target)
{
    var obj = document.getElementById("play");
    var oUl = obj.getElementsByTagName("ul")[0];

    oUl.style.left = speed + "px";
    speed+=(target - oUl.offsetLeft)/3;

    if( Math.abs(target-oUl.offsetLeft) === 0 )
    {
        oUl.style.left = target + "px";
        clearInterval(timer); timer = null;
    }
}
