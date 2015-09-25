// TODO: remove testing controller function once testing of pages are complete.

// angular.module('MyApp')
//  .controller('LoginCtrl',['$scope',function($scope){
//   $scope.header = { message: 'Login Page' };
// }]);

angular.module('MyApp')
    .controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.login = function() {
            Auth.login({
                email: $scope.email,
                password: $scope.password
            });
        };
    }]);
