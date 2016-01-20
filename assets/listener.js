//Move the mouse across the screen as a sine wave.
var robot = require("robotjs");
var io = require('socket.io')(6910);

//Speed up the mouse.
robot.setMouseDelay(5);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = screenSize.height;
var width = screenSize.width;
var initpos;
var moveX;
var moveY;

exports.sendevents =  function () {
  io.on('connection', function (socket) {
    socket.on('dragstart', function(response) {

      // console.log("Started at " + initpos.x + " " +initpos.y );
      console.log("Screen size is: " + width);
      console.log("Height is: " + height);
      console.log(">>DRAG START<<<");
    });
    socket.on('dragend', function () {
      console.log(">>>DRAG END<<<");
    });

    socket.on('dragging', function(response) {
      initpos = robot.getMousePos();
      moveX = initpos.x + response.x;
      moveY = initpos.y +  response.y;
      robot.moveMouse(moveX, moveY);
      console.log("X is at " + moveX +  ", y is at " + moveY);
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
