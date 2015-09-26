// angular.module('MyApp')
//     .controller('AddCtrl', function($scope) {
//       $scope.messages = { page:"Add Page"}
//     }]);

//
// angular.module('MyApp')
//  .controller('AddCtrl',['$scope',function($scope){
//   $scope.header = { message: 'Add Page' };
// }]);
//
//




/*
* Chris Samuel
* 02-14-2015
* Add.js
*
* this script will be used for
* adding shows to  mongoDB database.
* When the angular Module  uses the Show function it will
* inject the service into controller.
*
*
* */
angular.module('MyApp')
  .controller('AddCtrl', ['$scope', '$alert', 'Show', function($scope, $alert, Show) {
    $scope.addShow = function() {
      Show.save({ showName: $scope.showName },
        function() {
          $scope.showName = '';
          $scope.addForm.$setPristine();
          $alert({
            content: 'TV show has been added.',
            placement: 'top-right',
            type: 'success',
            duration: 3
          });
        },
        function(response) {
          $scope.showName = '';
          $scope.addForm.$setPristine();
          $alert({
            content: response.data.message,
            placement: 'top-right',
            type: 'danger',
            duration: 3
          });
        });
    };
  }]);
