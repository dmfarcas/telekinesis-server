"use strict";
const ipcMain = require('electron').ipcMain;


exports.listen = function(io, mainWindow) {
	io.on('connection', function(socket) {
		socket.on('contacts', function(response) {
			console.log("Received contacts list.");
			mainWindow.webContents.send('contactsinit', response.contact);
		});
	});

	//the Angular page will ask ipc for stored array on refresh. there should be a better way though.
	ipcMain.on('gimmecontacts', function() {
		console.log("Refreshing contacts list.");
		io.emit('reinitializecontacts');
	});
};
