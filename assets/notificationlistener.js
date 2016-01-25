var notifier = require('node-notifier');
var path = require('path');
exports.listen = function(io) {
  io.on('connection', function (socket) {
    socket.on('notification', function(response) {
      console.log(response.notification);
      notifier.notify({
      title: response.notification.title,
      message: response.notification.text,
      // icon: path.join(__dirname, '/assets/images/sign-info-icon.png'), // absolute path (not balloons)
      sound: true, // Only Notification Center or Windows Toasters
      wait: true // wait with callback until user action is taken on notification
      }, function (err, response) {
      // response is response from notification
    });
  });
});
};
