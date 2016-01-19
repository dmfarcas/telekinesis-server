//Move the mouse across the screen as a sine wave.
var robot = require("robotjs");
var io = require('socket.io')(6910);

//Speed up the mouse.
// robot.setMouseDelay(1);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = screenSize.height;
var width = screenSize.width;
var initpos;
var lastposX;
var lastposY;


exports.sendevents =  function () {
  io.on('connection', function (socket) {
    socket.on('dragstart', function(response) {
      // console.log("Started at " + initpos.x + " " +initpos.y );
      initpos = robot.getMousePos();
      lastposX = initpos.x;
      lastposY = initpos.y;
      console.log("Screen size is: " + width);
      console.log("Height is: " + height);
      console.log(">>DRAG START<<<");
    });
    socket.on('dragend', function () {

      // console.log("Ended at " + lastposX + " " + lastposY );
      console.log(">>>DRAG END<<<");
    });

    socket.on('dragging', function(response) {
      robot.moveMouse(response.x, response.y);
      console.log("X is at " + response.x + ", y is at " + response.y );
    });

    socket.on('hold', function(response) {
      robot.mouseToggle('down');
      console.log("Tap hold.");
    }).on('release', function(response) {
      robot.mouseToggle('up');
    });
    socket.on('tap', function(response) {
      robot.mouseClick('left');
      console.log("Touched.");
    });
  });
  //

};

// var exports = module.exports = {};
