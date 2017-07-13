
var app=angular.module('hzl',[]);
app.controller('hzlWrap',function($scope,$http,$timeout){


	//

	$scope.classNum=[];
	$scope.dataList=[];
	//$scope.num=0;
	$scope.AllPrice=0;

	$scope.loading=false;
	$scope.imagesArrTmp=[];
	$scope.selected=[];

	var transform = function(data){
        return $.param(data);
    }

	$http.post('js/data.php',{
		"type":"getData"
	},{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transform
    }).success(function(info){
		
		console.log(info);

		$scope.dataList=info;
		$scope.dataList.forEach(function(data,index){
			if(index%4==0 || index%4==3){
				$scope.classNum.push('white');
			}else{
				$scope.classNum.push('black');
			}
			$scope.AllPrice+=data.price*data.num;
			//console.log(data)
			if(data.num>0){
				$scope.selected.push(data);
			}
		});

		//增加
		$scope.up=function(id){
			var temData=[];
			var temSelected=[];
			$scope.dataList.forEach(function(data,index){
				if(id===data.id){
					data.num++;
					$scope.AllPrice=data.price*data.num;
					temData=data;
				}
			});
			var bSys=false;
			$scope.selected.forEach(function(data,index){
				if(id===$scope.selected[index].id){
					bSys=true;
				}else{
					temSelected.push(temData);
				}
			});
			if(!bSys){
				$scope.selected.push(temSelected[0]);
			}
		}

		//减少
		$scope.down=function(id,nums){
			console.log($scope.selected)
			var init=false;

			
			$scope.dataList.forEach(function(data,index){
				//限制鸡和猪肉

				if(id==1 && id===data.id){
					if(data.num<=5){
						data.num=5;
						init=true;
						alert("请最少选购5斤大山黑猪肉");
					}else{
						data.num--;	
					}
					return false;
				}
				if(id==2 && id===data.id){
					if(data.num<=3){
						data.num=3;
						init=true;
						alert("请最少选购3只大山纯良土鸡");
					}else{
						data.num--;	
					}
					return false;
				}
				if(id===data.id){
					if(data.num<=1){
						data.num=0;
						init=true;
						return false;
					}else{
						data.num--;	
					}
				}

			});


			//
			$scope.selected.forEach(function(data,index){
				if(init && data.id===id){
					$scope.selected.splice(index,1);
				}
			});

			console.log($scope.selected)

		}
		//计算合计总金额
		$scope.getTotalAmount = function () {
			 var totalAmount = 0;
			 angular.forEach(info, function (info, index, array) {
			  totalAmount += info.num * info.price;  
			 });
			 return totalAmount;
		 };


		$scope.showImageArr=function(id){
			///alert(id);


			angular.forEach(info,function(info , index ){
				if(info.id===id){
					//console.log(info);
					$scope.imagesArrTmp=info;
				}
			});
			
			$scope.imagesArrBys=!$scope.imagesArrBys;
			
			
			var oTab=document.getElementById("tabPic");
			oTab.style.width=document.documentElement.clientWidth+'px';
			$timeout(function() {
				fnTab();
				$scope.loading=true;
			}, 1500);
		}



	}).error(function(){

	});
	



	$scope.AllData=function(){
		/*
			type:ShopData,
			data:'"openId":"openId","shopAttr":"'+$scope.selected+'"'
		*/

		//var Shopdata=$scope.selected;


		// for(var i=0; i<$scope.selected.length; i++){
			
		// 	for(var k in $scope.selected[i]){
		// 		if(k=='imageList' || k=='unit' || k=='coverpic' || k=='$$hashKey'){
		// 			delete $scope.selected[i][k]; 
		// 		}
		// 	}
		// };

		//console.log($scope.selected)

		var sShopAttr=JSON.stringify($scope.selected);


		var newJson=eval('('+sShopAttr+')');

		for(var i=0; i<newJson.length; i++){
			
			for(var k in newJson[i]){
				if(k=='imageList' || k=='unit' || k=='coverpic' || k=='$$hashKey' || k=='title'){
					delete newJson[i][k]; 
				}
			}
		};

		//console.log(newJson);
		
		var newStr=JSON.stringify(newJson);
		$http.post('js/data.php',{
			'type':'ShopData',
			'openId':getCookie('openId'),
			'shopAttr':newStr
		},{
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
	        transformRequest: transform
	    }).success(function(info){
			console.log(info)
		}).error();
	};

	
	$scope.showShop=false;

	$scope.imagesArrBys=false;

	$scope.imagesArrBysfn=function(){
		$scope.imagesArrBys=!$scope.imagesArrBys;
		$scope.loading=!$scope.loading;
	}
});
app.directive('allnum',function(){
	return {
		restrict:"E",
		template:'<div class="numwrap">\
					<a href="javascript:;" class="down">-</a>\
					<input type="number" min="3" name="" value="{{num}}">\
					<a class="up" ng-click="$scope.up()">+</a></div>'
	}
});

app.directive('imagesarr',function(){
	return {
		restrict:"E",
		template:'<div class="imagesWrap" ng-show="imagesArrBys" ng-click="imagesArrBysfn()">\
		<div  id="tabPic">\
			<section class="loaders" ng-class="loading?\'hide\':\'show\'"><span class="loader loader-quart"> </span> 加载中，请稍后...</section>\
			<span id="picnum" ng-class="loading?\'show\':\'hide\'">{{}}</span>\
			<ul id="picList" ng-class="loading?\'show\':\'hide\'">\
				<li ng-repeat="imagesArrInfo in imagesArrTmp.imageList"><img src="{{imagesArrInfo.pic}}"><p>{{imagesArrInfo.pictitle}}</p></li>\
			</ul></div></div>',
		replace:true
	}
});



function fnTab(){
	var oTab=document.getElementById("tabPic");
	var oList=document.getElementById("picList");
	var oLi=oList.children;
	var picnum=document.getElementById('picnum');
	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=0;
	var iStartTouchX=0;
	var iStartX=0;
	oTab.style.width=iW+'px';
	oList.style.width=oLi.length*100+'%';
	picnum.innerHTML=(iNow+1)+'/'+oLi.length;
	for(var i=0; i<oLi.length; i++){
		oLi[i].style.width=100/oLi.length+'%';
		oLi[i].style.height=view().h+'px';
	}
	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	function fnStart(ev)
	{
		oList.style.transition="none";
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		//clearInterval(oTimer);
	}
	function fnMove(ev)
	{
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	function fnEnd()
	{
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>oLi.length-1)
		{
			iNow=oLi.length-1;
		}

		picnum.innerHTML=(iNow+1)+'/'+oLi.length;
		tab();
	}
	function tab()
	{
		iX=-iNow*iW;
		oList.style.transition="0.5s";
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}

}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}





function setCookie(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);

	document.cookie = name + '=' + value + ';expires=' + oDate;
}

function getCookie(name) {
	var arr = document.cookie.split('; ');

	var re = new RegExp('\\b' + name + '=\\w+');

	var res = document.cookie.match(re);

	if (res) {
		return res[0].split('=')[1];
	} else {
		return '';
	}
}

function removeCookie(name) {
	setCookie(name, '1', -1);
}
