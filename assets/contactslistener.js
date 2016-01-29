"use strict";
const ipcMain = require('electron').ipcMain;

let contact = [];

exports.listen = function(io, mainWindow) {
	io.on('connection', function(socket) {
		socket.on('contacts', function(response) {
			mainWindow.webContents.send('contactsinit', response.contact); //trying to send a message to angular via ipc, aaaargh
			contact.push(response.contact);
		});
	});

	//the Angular page will ask ipc for stored array on refresh. there should be a better way though.
	ipcMain.on('gimmecontacts', function() {
		mainWindow.webContents.send('contactsinit', contact);
		console.log("Sending contacts to Angular.");
	});


};
