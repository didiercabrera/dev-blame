angular.module('devux',[])

.controller('main',['$scope','$http',function ($scope,$http) {
	$scope.container = {
		adding:false,
		src:'',
		caption:''
	}

	$scope.reactions = [];
	$scope.tempData = [];

	function getData(){
		$http.get('/reactions/1').success(function(data){
			$scope.reactions =[];
			
			var ts_data = data.map(function ( reaction ){
				var time = reaction._id.toString().substring(0,8);
				var date = new Date( parseInt( time, 16 ) * 1000 );
				reaction.tms = date.getTime();
				return reaction;
			});

			$scope.reactions = ts_data;
			tempData = ts_data;
		});
	}

	$scope.addNew = function () {
		$scope.container.adding = true;
	}

	$scope.all = function (){
		$scope.reactions = tempData;
	}

	$scope.top = function (){
		var top_data = [];
		$scope.reactions.forEach(function (reaction){
			if( reaction.likes && reaction.likes>5){
				top_data.push(reaction);
			}
		});

		tempData = $scope.reactions;
		$scope.reactions = top_data;

	};

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

	$scope.back = function (){

	}

	$scope.next = function (){

	}
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