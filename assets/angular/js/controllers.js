"use strict";
angular.module('telekinesisServer.controllers', [])


.controller('navCtrl', ($scope, $mdSidenav) => {
  $scope.items = [
    { name: 'Home', link: '/notifications' },
    { name: 'Contacts', link: '/contacts' },
    { name: 'Settings',link: 'Settings' },
  ];

 $scope.toggleFilter = function(sideId) {

            $mdSidenav(sideId)
              .toggle()
              .then(function () {
              });

    };


$scope.closeFilter = function(sideId) {
      $mdSidenav(sideId).close()
        .then(function () {
        });
    };
})


.controller('notificationsCtrl', ($scope) => {
	$scope.message = 'This is a test';
})


.controller('contactsCtrl', ($scope, $timeout, $mdDialog) => {
	const ipcRender = require("electron").ipcRenderer;

	//create an initialized value and check if 'contactsinit' has been run before
	let initialized = false;
	$scope.contacts = [];


	// Ask for contacts via IPC, maybe they are already stored
	ipcRender.send('gimmecontacts');

	ipcRender.on('contactsinit', (event, contact) => {
		$timeout(function() {
			for (let i = 0; i < contact[0].length; i++) {
				$scope.contacts[i] = contact[0][i];
			}
		}, 0);
	});
	$scope.$watch('contacts', (newValue, oldValue) => {
		console.log("Changed" + newValue + " " + oldValue);
	});


  //Send message form.
	$scope.sendMessageForm = ($event) => {
		$mdDialog.show({
			clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
      templateUrl: 'html/sendMessage.html',
			// targetEvent: evt,
			controller: DialogController
		});
	};

  // FIXME: this is a bad function but cannot wrap my head on a better solution right now
  // Basically it needs to get the current selected name and send it to the scope.
  $scope.currentName = '';
  $scope.getName = (name) => {
    $scope.currentName =  name;
  };


	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};

      // TODO: I think the message should be sent from here? Some string logic might be required.
      // Fun times ahead.
		$scope.send = function(name, message) {
			console.log(name + " " + message);
			$mdDialog.hide(message);
		};
	}


});
