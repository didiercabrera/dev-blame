angular.module('devux',[])

.controller('main',['$scope','$http',function ($scope,$http) {
	$scope.container = {
		adding:false,
		src:'',
		caption:''
	}

	$scope.reactions = [];

	$http.get('/reactions').success(function(data){
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
			$scope.reactions.push({
				imgsrc:$scope.container.src,
				caption:$scope.container.caption				
			});
			$scope.container = {
				adding:false,
				src:'',
				caption:''
			}
		});
	}
}]);