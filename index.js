const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');

// Create an Express app
const serverApp = express();
const PORT = 8000; // port to run server on

// Serve static files from the game directory
serverApp.use(express.static(path.join(__dirname, './examples/platformer')));

// Start the server
serverApp.listen(PORT, () => {
    console.log(`Game server running on http://localhost:${PORT}`)
});

function createWindow() {
    // create the window
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // load the game via the local server
    mainWindow.loadURL(`http://localhost:${PORT}`)
};

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})