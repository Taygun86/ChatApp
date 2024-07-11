const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        titleBarStyle: 'customButtonsOnHover',
        titleBarStyle:'hidden',
        titleBarOverlay: {
            color: '#2a2a2f',
            symbolColor: '#fff',
            height: 20,
            transparent: true
        },
        trafficLightPosition: { x: 7, y: 3 },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
        
    });
    // Menüleri kaldır
    mainWindow.setMenu(null);

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});