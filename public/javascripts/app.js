angular.module('devux',[])

.controller('main',['$scope','$http',function ($scope,$http) {
	$scope.container = {
		adding:false,
		src:'',
		caption:''
	}

	$scope.reactions = [];
	$scope.tempData = [];
	$http.get('/reactions/1').success(function(data){
		$scope.reactions =[];
		// var order_data = data.sort(function (a,b){
		// 	var tms_1 = a._id.toString().substring(0,8);
		// 	var tms_2 = b._id.toString().substring(0,8);

		// 	var d1 = new Date( parseInt( tms_1, 16 ) * 1000 );
		// 	var d2 = new Date( parseInt( tms_2, 16 ) * 1000 );
		// 	return d1.getTime() > d2.getTime();
		// });

		var ts_data = data.map(function ( reaction ){
			var time = reaction._id.toString().substring(0,8);
			var date = new Date( parseInt( time, 16 ) * 1000 );
			reaction.tms = date.getTime();
			return reaction;
		});

		$scope.reactions = ts_data;
		tempData = ts_data;
	});

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