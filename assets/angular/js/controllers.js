"use strict";

angular.module('telekinesisServer.controllers', [])

.controller('notificationsCtrl', ($scope) => {
    $scope.message = 'This is a test';

})

.controller('contactsCtrl', ($scope, $timeout, $mdDialog) => {
  const ipcRender = require("electron").ipcRenderer;

  //create an initialized value and check if 'contactsinit' has been run before
  let initialized = false;
  $scope.contacts = [];
  // $scope.message = $scope.contacts;

  // Ask for contacts via IPC, maybe they are already stored
  ipcRender.send('gimmecontacts');

  ipcRender.on('contactsinit', (event, contact) => {
    $timeout(function() {
        for (let i=0; i<contact[0].length; i++) {
          $scope.contacts[i] = contact[0][i];
        }
  },0);
    });
    $scope.$watch('contacts', (newValue, oldValue) => {
        console.log("Changed"  + newValue + " " + oldValue);
        // $scope.contacts = newValue;
        // console.log($scope.contacts[0]);
    });

    $scope.sendMessageForm = ($event) => {
    $mdDialog.show({
        targetEvent: $event,
        clickOutsideToClose: true,
        controller: DialogController,
        templateUrl: 'html/sendMessage.html',
        locals: { clickedname: $scope.contacts.displayName }
        // .title('Send a message')
        // .textContent('Send a message to ' + person)
        // .ariaLabel('Send message')
        // .ok('Send!')
        // .targetEvent(event)
  });
  };

  function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.send = function(name, message) {
    console.log(name + " " + message);
    $mdDialog.hide(message);
  };
}


});
