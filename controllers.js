/*
Chris Samuel
ksamuel.chris@gmail.com
September 25, 2015

Understanding Model View Controller

MVC Application structure was introduced in the 1970s as a
part of smallTalk. From its conception it has become very popular in nearly every desktop
development enviroment where user interfaces were involved.
Whether you were using C++ , Java or Objective-C, there was some flavor of MVC available


In angular JS:
  - the view is the DOM
  - the controllers are Javascript Classes
  - the model data is stored in object Properties.


*/

//Data Binding
/*

Declaring certain parts of the UI map to which JavaScript properties and have them sync automatically.


*/
function NewController($scope){
  $scope.header = { title: 'Home Page' };
}
