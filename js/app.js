angular.module('radioclock', [])

.controller('StatusCtrl', [$scope, function($scope) {
	$scope.onair = true;
	$scope.modul = true;
}]);