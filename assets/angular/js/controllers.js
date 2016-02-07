"use strict";
angular.module('telekinesisServer.controllers', [])


.controller('navCtrl', ($scope, $mdSidenav, $location) => {
	$scope.items = [{
		name: 'Home',
		link: 'notifications',
		icon: 'ic_home_black_24px.svg'
	}, {
		name: 'Messages',
		link: 'messages',
		icon: 'ic_message_black_24px.svg'
	}, {
		name: 'Contacts',
		link: 'contacts',
		icon: 'ic_contacts_black_24px.svg'
	}, {
		name: 'Settings',
		link: 'settings',
		icon: 'ic_settings_black_24px.svg'
	}, ];

	$scope.toggleFilter = function() {
		$mdSidenav('left')
			.toggle()
			.then(function() {});
	};

	$scope.changeView = function(link) {
		$scope.toggleFilter();
		$location.path(link);
	};

	$scope.closeFilter = function(sideId) {
		$mdSidenav(sideId).close()
			.then(function() {});
	};
})


.controller('settingsCtrl', ($scope, Page) => {
	Page.setTitle('Settings');
	$scope.message = "This is the settings controller.";
})


.controller('notificationsCtrl', ($scope, Page) => {
	Page.setTitle('Notifications');
	$scope.message = 'THERE SHALL BE NOTIFICATIONS';
})

.controller('titleCtrl', ($scope, Page, $routeParams, $window, $rootScope) => {
	$scope.Page = Page;
	$rootScope.$on('showBack', function(ev, args) {
        $scope.checkView = args;
        });
	$scope.goBack = function() {
		$window.history.back();
	};
})

.controller('messagesCtrl', ($scope, Page, $timeout, dataFactory, $location, $rootScope) => {
	Page.setTitle('Messages');
	$scope.messages = [];
	$scope.mpromise = dataFactory;
    $rootScope.$emit('showBack', 0);
	$scope.mpromise.then(function(solved) {
		console.log("Messages loaded");
		$scope.messages = solved[0];
	}).then(function(err) {
		return err;
	});

	$scope.goToChat = function(section, name, address) {
        let displayName = name || address;
		$location.path("/messages/" + section + "/" + displayName);
	};
})

.controller('chatCtrl', ($scope, $routeParams, Page, dataFactory, $rootScope) => {
	let hash = $routeParams.thread_id;
	// I'm pretty sure there's a better way to get rid of the ":" without substring.
	Page.setTitle($routeParams.name);
    $rootScope.$emit('showBack', 1);
	$scope.hash = Number(hash);
	$scope.messages = [];
	$scope.mpromise = dataFactory;
	$scope.mpromise.then(function(solved) {
		$scope.messages = solved[0];
	}).then(function(err) {
		return err;
	});
    $scope.sendMessage = function() {
        $scope.messageInput = "";
        console.log("Submit");
    };


})

.controller('contactsCtrl', ($scope, $timeout, $mdDialog, Page, dataFactory) => {
	Page.setTitle('Contacts');
	$scope.contacts = [];
	$scope.promise = dataFactory;
	$scope.promise.then(function(solved) {
		console.log("Contacts loaded.");
		$scope.contacts = solved[1];
	}).then(function(err) {
		return err;
	});


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
		$scope.currentName = name;
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
