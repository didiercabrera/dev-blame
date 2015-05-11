angular.module('devux',[])

.controller('main',['$scope','$http',function ($scope,$http) {
	$scope.container = {
		adding:false,
		src:'',
		caption:''
	}

	$scope.reactions = [];

	$http.get('/reactions/1').success(function(data){
		$scope.reactions = data.reverse();
	});
	$scope.addNew = function () {
		$scope.container.adding = true;
	}

	$scope.submit = function (argument) {
		$http.post('/reactions',{
			imgsrc:$scope.container.src,
			caption:$scope.container.caption
		}).success(function (data) {
			$scope.reactions.unshift({
				imgsrc:$scope.container.src,
				caption:$scope.container.caption				
			});
			$scope.container = {
				adding:false,
				src:'',
				caption:''
			}
		});
	};
}])

.directive('like',['$http',function ($http){
	return {
		restrict:'A',
		scope:{
			likes:'=likes',
			rid:'=rid'
		},
		link:function (scope,element,attrs){
			element.bind('click',function (){
				$http.post('/reactions/like',{
					id:scope.rid,
				}).success(function (data) {
					scope.likes = (scope.likes || 0) + 1;
				});				
			})
		}
	}
}])

.directive('dislike',['$http',function ($http){
	return {
		restrict:'A',
		scope:{
			dislikes:'=dislikes',
			rid:'=rid'
		},
		link:function (scope,element,attrs){
			element.bind('click',function (){
				$http.post('/reactions/dislike',{
					id:scope.rid,
				}).success(function (data) {
					scope.dislikes = (scope.dislikes || 0) + 1;
				});				
			})
		}
	}
}])