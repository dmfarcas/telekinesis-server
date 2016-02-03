'use strict';

angular.module('telekinesisServer', ['ngMaterial', 'ngRoute', 'telekinesisServer.controllers'])
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

.factory('dataFactory', function($timeout, $q) {
	const ipcRender = require("electron").ipcRenderer;
	let data = {};
	let q = $q.defer();
	data.message = [];
	data.contacts = [];

	//Request messages
    ipcRender.send('gimmemessages');
    ipcRender.on('messages', (event, message) => {
		if (message[0]) {
        for (let i = 0; i < message[0].length; i++) {
			console.log(message[0][i]);
			}
		}
	});

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

		otherwise({
			redirectTo: '/contacts'
		});
	}
]);
