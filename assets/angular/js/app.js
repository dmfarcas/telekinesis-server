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

.factory('messages', function($q) {
	const ipcRender = require("electron").ipcRenderer;

	//Request messages
	ipcRender.send('gimmemessages');
	let q = $q.defer();
	let messages = [];
	//TODO: chain promises, combine message data with contact data, return promise result.
	ipcRender.on('messages', (event, message) => {
		console.log("Received messages.");
		if (message) {
			q.resolve(message);
		} else {
			q.reject('Cannot retrieve messages');
		}
	});
	return q.promise;
})




.factory('contacts', function($q) {
	const ipcRender = require("electron").ipcRenderer;
	let q = $q.defer();

	//Request contacts
	ipcRender.send('gimmecontacts');
	ipcRender.on('contactsinit', (event, contact) => {
		if (contact) {
			q.resolve(contact);
		} else {
			q.reject('Cannot retrieve contacts');
		}
		// console.log("CONTACTSINIT");
		// contact.forEach((ret) => {
		// 	console.log(ret);
		// });
	});
	return q.promise;
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

		when('/messages/:thread_id', {
        templateUrl: 'html/chat.html',
        controller: 'chatCtrl'
      }).

		otherwise({
			redirectTo: '/contacts'
		});
	}
]);
