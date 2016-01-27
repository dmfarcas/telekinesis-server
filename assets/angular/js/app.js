'use strict';

angular.module('telekinesisServer', ['ngMaterial', 'ngRoute', 'telekinesisServer.controllers'])

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
