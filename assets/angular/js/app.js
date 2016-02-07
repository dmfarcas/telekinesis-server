'use strict';

angular.module('telekinesisServer', ['ngMaterial', 'ngRoute', 'telekinesisServer.controllers', 'angular.filter'])
	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('blue-grey');
	})

.factory('Page', function() {
	let title = 'undefined';
	return {
		title: function() {
			return title;
		},
		setTitle: function(newTitle) {
			title = newTitle;
		}
	};
})

//From:
// http://stackoverflow.com/questions/18006334/updating-time-ago-values-in-angularjs-and-momentjs
.filter('time', ['$interval', function($interval) {
	// trigger digest every 60 seconds
	$interval(function() {}, 60000);

	function fromNowFilter(time) {
		return moment(time).fromNow();
	}


	fromNowFilter.$stateful = true;
	return fromNowFilter;
}])

.factory('dataFactory', function($q) {
	const ipcRender = require("electron").ipcRenderer;
	let messagePromise = $q.defer();
	let contactPromise = $q.defer();

	function askForMessages() {
		ipcRender.send('gimmemessages');
		ipcRender.on('messages', (event, message) => {
			if (message) {
				messagePromise.resolve(message);
				console.log("Received messages.");
			} else {
				messagePromise.reject('Cannot retrieve messages');
			}
		});
		return messagePromise.promise;
	}

	function askForContacts() {
		ipcRender.send('gimmecontacts');
		ipcRender.on('contactsinit', (event, contact) => {
			if (contact) {
				contactPromise.resolve(contact);
			} else {
				contactPromise.reject('Cannot retrieve contacts');
			}
		});
		return contactPromise.promise;
	}


	return $q.all([askForMessages(), askForContacts()])
		.then(function(data) {
			// REGEX TODO: \b[\s()\d-]{6,}\d\b
			//
			//Create and sort the contact list by phone number
			const re = /\b[\s()\d-]{6,}\d\b/g;
			let sortedNumbers = [];
			data[1].forEach((contact) => {
				console.log(contact.phoneNumbers[0].number.replace(re, ''));
				sortedNumbers.push({
					number: contact.phoneNumbers[0].number,
					displayName: contact.displayName
				});
			});

			sortedNumbers.sort((a, b) => {
				return a.number - b.number;
			});

			//Assign name to message array
			data[0].forEach((toFind, messagepos) => {
				sortedNumbers.filter(function(contact, sortedpos) {
					if (contact.number === toFind.address) {
						data[0][messagepos].displayName = contact.displayName;
					}
				});
			});
			return data;

		}, function(err) {
			console.log("Could not get combined data and messages array.");
		});
})


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.

		when('/notifications', {
			templateUrl: 'html/notifications.html',
			controller: 'notificationsCtrl'
		}).

		when('/settings', {
			templateUrl: 'html/settings.html',
			controller: 'settingsCtrl'
		}).

		when('/contacts', {
			templateUrl: 'html/contacts.html',
			controller: 'contactsCtrl'
		}).

		when('/messages', {
			templateUrl: 'html/messages.html',
			controller: 'messagesCtrl'
		}).

		when('/messages/:thread_id/:name', {
			templateUrl: 'html/chat.html',
			controller: 'chatCtrl'
		}).

		otherwise({
			redirectTo: '/contacts'
		});
	}
]);
