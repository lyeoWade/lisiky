
var app=angular.module('hzl',[]);
app.controller('hzlWrap',function($scope,$http){

	$scope.classNum=[];
	$scope.dataList=[];
	//$scope.num=0;
	$scope.AllPrice=0;

	$scope.selected=[];
	$http.get('js/data.php',{

	}).success(function(info){


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
		$scope.down=function(id){
			console.log($scope.selected)
			var init=false;
			$scope.dataList.forEach(function(data,index){
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


	}).error(function(){

	});

	$scope.showShop=false;
	//console.log($scope.dataList);
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







































