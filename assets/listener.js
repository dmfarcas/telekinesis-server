//Move the mouse across the screen as a sine wave.
var robot = require("robotjs");
var io = require('socket.io')(6910);

//Speed up the mouse.
robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;



exports.sendcoords =  function (x, y) {
  io.on('connection', function (socket) {
    socket.on('dragend', function () {
      console.log("Dragend.");
    });
    socket.on('dragging', function(response) {
      robot.moveMouse(response.x, response.y);
      console.log("X is at " + response.x + ", y is at " + response.y );
    });
  });
  //

};

// var exports = module.exports = {};
