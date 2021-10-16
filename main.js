// server config
const https = require('https');
const handler = require('serve-handler');
const fs = require('fs');


// ssl config
const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

// create server with ssl and load index.html
const server = https.createServer(options, function (request, response) {
    return handler(request, response);
})

// listen to port
server.listen(6161, () => {
    console.log('Running at https://localhost:6161');
});

// electron
const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;


// When app ready
app.on('ready', function(){
    // Create window
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: true,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            zoomFactor: 1
        }
    });
    // Load HTML file
    mainWindow.loadURL(`file://${__dirname}/login.html`);

    // Build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    //Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [];

app.on('certificate-error', function(event, webContents, url, error,
    certificate, callback) {
        event.preventDefault();
        callback(true);
});

app.on(
    "window-all-closed",
    () => process.platform !== "darwin" && app.quit() // "darwin" targets macOS only.
);