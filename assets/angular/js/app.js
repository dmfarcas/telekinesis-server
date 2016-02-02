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

.factory('dataFactory', function($timeout) {
	let data = {};
	data.message = [];
	data.contacts = [];
	const ipcRender = require("electron").ipcRenderer;

	//Request messages
    ipcRender.send('gimmemessages');
    ipcRender.on('messages', (event, message) => {
        for (let i = 0; i < message[0].length; i++) {
			data.message.push(message[0][i]);
			}
	});

	//Request contacts
	ipcRender.send('gimmecontacts');
	ipcRender.on('contactsinit', (event, contact) => {
  			for (let i = 0; i < contact[0].length; i++) {
  				data.contacts.push(contact[0][i]);
  			}
	});

	return data;
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
