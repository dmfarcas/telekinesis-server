"use strict";

let contact = [];

exports.listen = function(io, mainWindow) {
	io.on('connection', function(socket) {
		socket.on('contacts', function(response) {
			mainWindow.webContents.send('contactsinit', response.contact); //trying to send a message to angular via ipc, aaaargh
			// contact.push(response.contact);
		});
	});
};
