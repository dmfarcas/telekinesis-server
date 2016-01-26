'use strict';
let contact = [];


exports.listen = function(io) {
	io.on('connection', function(socket) {
		socket.on('contacts', function(response) {
      contact.push(response.contact);
			// console.log(response.contact[2]);
		});
	});
};
