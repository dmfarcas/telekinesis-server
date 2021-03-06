'use strict';

const electron = require('electron');
const app = electron.app;
const io = require('socket.io')(6565);

// node goes crazy if this is not here, because there are >11 EventEmitters
// require('events').EventEmitter.prototype._maxListeners = 100;


// import modules
const input = require('./assets/inputlistener.js');
const notif = require('./assets/notificationlistener.js');
const contacts = require('./assets/contactslistener.js');
const pSleep = require('./assets/preventsleep.js');
const messages = require('./assets/messageslistener.js');

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		minWidth: 966,
		minHeight: 568
	});

	win.loadURL(`file://${__dirname}/assets/angular/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	input.listen(io, mainWindow);
	notif.listen(io);
	contacts.listen(io, mainWindow);
	pSleep.listen(io);
	messages.listen(io, mainWindow);

});
