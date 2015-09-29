angular.module('MyApp')
    .factory('Show', ['$resource', function($resource) {
        return $resource('/api/shows/:_id');
    }]);
// This controller sends a POST request to /api/shows with the TV show name -
 // the route we have created in the previous step. If the request has been successfull,
 // the form is cleared and a successful notification is shown.
