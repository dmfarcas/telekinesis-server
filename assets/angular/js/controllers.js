"use strict";
angular.module('telekinesisServer.controllers', [])


.controller('navCtrl', ($scope, $mdSidenav, $location) => {
  $scope.items = [
    { name: 'Home', link: 'notifications', icon: 'ic_home_black_24px.svg' },
    { name: 'Messages', link: 'messages', icon: 'ic_message_black_24px.svg' },
    { name: 'Contacts', link: 'contacts', icon: 'ic_contacts_black_24px.svg' },
    { name: 'Settings', link: 'settings', icon: 'ic_settings_black_24px.svg' },
  ];

 $scope.toggleFilter = function() {
    $mdSidenav('left')
      .toggle()
      .then(function () {
      });
    };

    $scope.changeView = function(link){
        $scope.toggleFilter();
        $location.path(link);
    };

    $scope.closeFilter = function(sideId) {
          $mdSidenav(sideId).close()
            .then(function () {
            });
    };
})


.controller('settingsCtrl', ($scope, Page) => {
    Page.setTitle('Settings');
    $scope.message = "This is the settings controller.";
})


.controller('notificationsCtrl', ($scope, Page) => {
    Page.setTitle('Notifications');
	$scope.message = 'This is a test';
})

.controller('titleCtrl', ($scope, Page) => {
  $scope.Page = Page;
})

.controller('messagesCtrl', ($scope, Page, $timeout, dataFactory) => {
    Page.setTitle('Messages');
    $scope.message = dataFactory.message;
})


.controller('contactsCtrl', ($scope, $timeout, $mdDialog, Page, dataFactory) => {
    Page.setTitle('Contacts');
	const ipcRender = require("electron").ipcRenderer;
    $scope.contacts = dataFactory.contacts;

    $scope.clearText = function() {
      $scope.searchText = "";
    };

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
})

.directive('esccancel', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
            element.on('keyup', function(e) {
                if (e.keyCode === 27) {
                    scope.searchText = "";
                    scope.$apply();
                }
            });
        }
    };
});
