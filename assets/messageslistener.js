"use strict";
const ipcMain = require('electron').ipcMain;

// TODO this data needs to be persistent.
// Maybe refresh only when the client sends information
// Connection detection should be handled somehow...
let message = [];

exports.listen = function(io, mainWindow) {
	io.on('connection', function(socket) {
		socket.on('messages', function(response) {
			mainWindow.webContents.send('messages', response.messages);
			message.push(response.messages);
		});
	});

	//the Angular page will ask ipc for stored array on refresh. there should be a better way though.
	ipcMain.on('gimmemessages', function() {
		mainWindow.webContents.send('messages', message);
		console.log("Sending messages to Angular.");
	});


};
