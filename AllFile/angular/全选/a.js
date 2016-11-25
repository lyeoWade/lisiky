var cartModule = angular.module('cart', []);
cartModule.controller('cartCtr', ['$scope', function ($scope) {
 $scope.discount = 0.9;
 $scope.items = [{id: 10001,title: "Web全栈工程师的自我修养 余果", price: 40.80,quantity: 2,linkUrl: "https://detail.tmall.com/item.htm?spm=a1z0d.6639537.1997196601.4.cwywJs&id=532166746631"},
     {id: 10002,title: "MacBook Pro Retina 15英寸", price: 16088.00,quantity: 1,linkUrl: "https://detail.tmall.com/item.htm?spm=a1z0d.6639537.1997196601.26.cwywJs&id=45771116847"},
     {id: 10003,title: "Surface Book I5 128G 独显",price: 11088.00, quantity: 1,linkUrl: "https://detail.tmall.com/item.htm?spm=a1z0d.6639537.1997196601.15.cwywJs&id=525614504276"},
     {
	id: 10004,
	title: "Lenovo Yoga3Pro I5 4G",
	price: 7299.00,
	quantity: 1,
	linkUrl: "https://detail.tmall.com/item.htm?spm=a1z0d.6639537.1997196601.37.cwywJs&id=41541519814"
}];
 

$scope.add = function (id) {
  angular.forEach($scope.items, function (item, index, array) {
        if (item.id === id) {item.quantity++;} })
 };
 
$scope.reduce = function (id) {
  angular.forEach($scope.items, function (item, index, array) {
        if (item.id === id) {item.quantity--; } })
 };

 //输入框添加keydown事件，避免输入非正整数
 $scope.quantityKeydown = function (event) {
  event = event || window.event;
  var target=event.target||event.srcElement;
  var keycode = event.keyCode;
  if ((37 <= keycode && keycode <= 40)||(48 <= keycode && keycode <= 57) || (96 <= keycode && keycode <= 105) || keycode == 8) {
    //方向键↑→ ↓←、数字键、backspace
  }
  else {
   console.log(keycode);
   event.preventDefault();
   return false;
  }
 };
//keyup事件，当输入数字为0时，重新刷新文本框内容
$scope.quantityKeyup = function (event) {
  event = event || window.event;
  var target=event.target||event.srcElement;
  var keycode = event.keyCode;
  if (48 === keycode || 96 === keycode ) {
   target.value=parseInt(target.value);
 }};
 //删除商品
 $scope.delete = function (id) {
  $scope.items.forEach(function (item, index) {
  if (item.id == id) {
   if (confirm("确定要从购物车中删除此商品？")) {
    $scope.items.splice(index, 1);
    return;
   }
  }
 })
 };
 //计算已选商品数量
 $scope.getQuantites = function () {
 var quantities = 0;
 angular.forEach($scope.items, function (item, index, array) {
  if (item.quantity) {
   quantities += parseInt(item.quantity);
  }
 });
 return quantities;
 };
 //计算合计总金额
 $scope.getTotalAmount = function () {
	 var totalAmount = 0;
	 angular.forEach($scope.items, function (item, index, array) {
	  totalAmount += item.quantity * item.price;  
	 });
	 return totalAmount;
 };

 $scope.alertSubmit = function () {alert("Angular实现购物车"); }
}]);