angular.module('Karaoke').
  filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
