const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const startURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4200'
    : `file://${path.join(__dirname, 'dist', 'prompt-optimizer', 'browser', 'index.html')}`;

  // 🐛 Add this log to verify the URL Electron is actually loading
  console.log('🧭 Loading:', startURL);

  win.loadURL(startURL);

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});