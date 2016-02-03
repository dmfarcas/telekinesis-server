"use strict";
const ipcMain = require('electron').ipcMain;

// TODO this data needs to be persistent.
// Maybe refresh only when the client sends information
// Connection detection should be handled somehow...

exports.listen = function(io, mainWindow) {
	io.on('connection', function(socket) {
		socket.on('messages', function(response) {
			console.log("Received message list.");
			mainWindow.webContents.send('messages', response.messages);
		});
	});

	//the Angular page will ask ipc for stored array on refresh. there should be a better way though.
	ipcMain.on('gimmemessages', function() {
		console.log("Refreshing messages list.");
			io.emit('reinitializemessages');
	});
};
