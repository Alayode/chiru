//
//
// // Dependency Injection
//
//   We mentioned it before, but it bears repeating that there's a lot going on with NewController
//   that we didnt have to write. For example the $scope object that does our data binding is passed to us automatically: we didnt have to create it
// by calling any function. We just asked for it by putting it in the NewControlle's constructor.


//Please Sir, May I have my Location Service!
function DiController($scope,$location){
  $scope.header = { text : 'Home'};
  //use $location for something cool here
  console.log($location); // will expose the location object

}


//
// With Dependency Injection System
//
// Dependency Injection lets us follow a development style in which, instead of creating dependencies,
// our classes just simply have to ask for what they need.
