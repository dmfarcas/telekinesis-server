angular.module('telekinesisServer.controllers', [])

.controller('mainCtrl', function($scope, $mdSidenav) {
 // code goes here
})

.controller('notificationsCtrl', function($scope) {
    $scope.message = 'This is a test';

})

.controller('contactsCtrl', function($scope, $timeout) {
  const ipcRender = require("electron").ipcRenderer;
  $scope.message = 'This is contacts';
  ipcRender.on('contactsinit', function(event, contact) {
    // $timeout(function() {
      console.log(contact);
  // },0);
    });

});
