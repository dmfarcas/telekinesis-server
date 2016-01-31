'use strict';

angular.module('telekinesisServer', ['ngMaterial', 'ngRoute', 'telekinesisServer.controllers'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey');
})

.factory('Page', function(){
  var title = 'default';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
})



.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/notifications', {
        templateUrl: 'html/notifications.html',
        controller: 'notificationsCtrl'
    }).

      when('/contacts', {
        templateUrl: 'html/contacts.html',
        controller: 'contactsCtrl'
      }).
      otherwise({
        redirectTo: '/contacts'
      });
}]);
