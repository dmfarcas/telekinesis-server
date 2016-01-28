"use strict";

angular.module('telekinesisServer.controllers', [])

.controller('notificationsCtrl', function($scope) {
    $scope.message = 'This is a test';

})

.controller('contactsCtrl', function($scope, $timeout) {
  const ipcRender = require("electron").ipcRenderer;
  $scope.contacts = [];
  // $scope.message = $scope.contacts;
  ipcRender.on('contactsinit', function(event, contact) {
    $timeout(function() {
      $scope.contacts = contact;
  },0);
    });
    $scope.$watch('contacts', function(newValue, oldValue) {
        console.log("Changed"  + newValue + " " + oldValue);
        // $scope.contacts = newValue;
        console.log($scope.contacts[100]);
    });
    $scope.sendMessage = function() {
      console.log("Works.");
    };

});

//
//
// .directive('keypressEvents', [
//   '$document',
//   'socket',
//   function($document, socket) {
//     return {
//       restrict: 'A',
//       link: function() {
//       }
//     }
//   }
// }]
