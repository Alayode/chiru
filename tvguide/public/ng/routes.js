/*
Chris Samuel
ksamuel.chris@gmail.com
September 24, 2015

Changing layouts with Routes and $location

Though AJAX apps are technically single-page apps (in the sense that they only load an HTML page on
the first request, and then just update areas within the DOM thereafter), we usually have multiple
sub page vies that we show or hide from the user, as appropriate.

*/

//
// We can use angular's $route service to magnage this scenario for us. Routes let you specify that,
// for  a given URL that the browser points to, Angular should load and display a Template, and instantiate
// a controller to provide context for the template.
//
angular.module('MyApp', [ 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'layouts/home.html',
                controller: 'MainCtrl'
            })
            .when('/shows/:id', {
                templateUrl: 'layouts/detail.html',
                controller: 'DetailCtrl'
            })
            .when('/login', {
                templateUrl: 'layouts/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'layouts/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/add', {
                templateUrl: 'layouts/add.html',
                controller: 'AddCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
            return {
                request: function(config) {
                    if ($window.localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                    }
                    return config;
                },
                responseError: function(response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            }
        });
    });
