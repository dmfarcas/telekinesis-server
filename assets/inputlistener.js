"use strict";

const robot = require("robotjs");

//Speed up the mouse.
robot.setMouseDelay(0);
let initpos;
let moveX;
let moveY;
let sensitivity = 1.5; // TODO: this thing should be in Settings
exports.listen = function(io) {
	io.on('connection', function(socket) {
		socket.on('dragstart', function(response) {
			initpos = robot.getMousePos();
			console.log(">>DRAG START<<<");
		});

		socket.on('dragend', function() {
			console.log(">>>DRAG END<<<");
		});

		socket.on('dragging', function(response) {
			moveX = Math.trunc(initpos.x) + Math.trunc(response.x)  * sensitivity;
			moveY = Math.trunc(initpos.y) + Math.trunc(response.y) *sensitivity;
			robot.moveMouse(moveX, moveY);
			console.log("Received mouse coordinates: " + moveX + " " + moveY);
		});

		socket.on('hold', function(response) {
			robot.mouseToggle('down');
			console.log("Tap hold.");
		}).on('touch', function(response) {
			robot.mouseToggle('up');
		});

		socket.on('tap', function(response) {
			robot.mouseClick('left');
			console.log("Touched.");
		});

		socket.on('scrollup', function(response) {
			robot.scrollMouse(1, "up");
			console.log('Swiping up...');
		});
		socket.on('scrolldown', function(response) {
			robot.scrollMouse(1, "down");
			console.log('Swiping down...');
		});
		socket.on('rightclick', function(response) {
			robot.mouseClick("right");
			console.log('Right click.');
		});

		socket.on('keypress', function(response) {
			var presser = String.fromCharCode(response.key);
			console.log("Got key: " + response.key);
			if (response.key === 8)
				robot.keyTap("backspace");
			if (response.key === 13)
				robot.keyTap("enter");
			robot.typeString(presser);
		});
	});
	//

};

// var exports = module.exports = {};
