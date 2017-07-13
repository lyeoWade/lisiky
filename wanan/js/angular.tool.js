var app=angular.module('arccontent',[]);
app.filter('trustHtml', function ($sce) {
     return function (input) {
        return $sce.trustAsHtml(input);
     }
});
app.filter('ntobr', function(){
    var filter = function(input){
        return input.replace(/\n/g,"<\/br>").replace(/ /g,"&nbsp;");
    };
    return filter;
});


// app.filter('getUrlAttr',function(){
// 	return function(){

// 	}
// });