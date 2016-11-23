
var app=angular.module('hzl',[]);
app.controller('hzlWrap',function($scope,$http){

	$scope.classNum=[];
	$scope.dataList=[];
	//$scope.num=0;
	

	$http.get('js/data.php',{

	}).success(function(info){
		$scope.dataList=info;
		$scope.dataList.forEach(function(data,index){
			//console.log(index);
			if(index%4==0 || index%4==3){
				$scope.classNum.push('white');
			}else{
				$scope.classNum.push('black');
			}
		});

		$scope.up=function(id){
				
			$scope.dataList.forEach(function(data,index){
				if(id===data.id){
					data.num++;
				}
			});
		}

		$scope.down=function(id){
				
			$scope.dataList.forEach(function(data,index){
				if(id===data.id){
					if(data.num<1){
						//alert("数量不能小于0");
						return false;
						data.num=0;
					}else{
						data.num--;	
					}
				}
			});
		}
	}).error(function(){

	});

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







































