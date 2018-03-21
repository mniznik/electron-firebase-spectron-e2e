const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const  path = require('path');

let mainWindow = null;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        center: true,
        width: 800,
        height: 400,
        minHeight: 100,
        minWidth: 100
    });

    const index = path.join(__dirname, "..", "src");
    mainWindow.loadURL('file://' + index + '/index.html');
    mainWindow.on('closed', function () { mainWindow = null })
});