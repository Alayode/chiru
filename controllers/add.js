// angular.module('MyApp')
//     .controller('AddCtrl', function($scope) {
//       $scope.messages = { page:"Add Page"}
//     }]);


angular.module('MyApp')
 .controller('AddCtrl',['$scope',function($scope){
  $scope.header = { message: 'Add Page' };
}]);
