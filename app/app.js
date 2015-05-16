'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('Controller1', function($scope) {

  fbService.listenToPairs(function() {
    console.log('hello, new pair created');
  })

  $scope.onPairClick = function() {
    console.log('hello 1');
    fbService.addPair('id1', 'id2', function(response) {
      console.log('hello 2');
    });
  };
});
