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
.service('fbService', ['$rootScope', function($rootScope) {

  var onTradersUpdateCb = null;
  var onTradesUpdateCb = null;
  var onPairsUpdateCb = null;

  this.listenToTraders = function(cb) {
    onTradersUpdateCb = cb;
  };
  this.listenToTrades = function(cb) {
    onTradesUpdateCb = cb;
  };
  this.listenToPairs = function(cb) {
    onPairsUpdateCb = cb;
  };

  this.addPair = function(id1, id2, cb) {
    onPairsUpdateCb({
      success: true
    });
  };

  this.addTrade = function(traderId, tradeKey, tradeValue, cb) {
    onPairsUpdateCb({
      success: true
    });
  };
}]);
