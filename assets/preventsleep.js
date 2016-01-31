"use strict";
const powerSaveBlocker = require('electron').powerSaveBlocker;
let sleepBlock;

exports.listen = function(io) {

  io.on('connection', function(socket) {
    socket.on('psleep', function(response) {
      if (response.keep) {
        sleepBlock = powerSaveBlocker.start('prevent-display-sleep');
        console.log("Preventing computer from sleep: " + response.keep);
      } else {
        powerSaveBlocker.stop(sleepBlock);
        console.log("Letting computer chill out: " + response.keep);
      }
    });
  });
};
