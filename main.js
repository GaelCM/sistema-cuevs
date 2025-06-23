/* eslint-disable @typescript-eslint/no-require-imports */
// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const isDev = process.env.NODE_ENV !== 'production';
const { registerTestController } = require('./controllers/testController');
const { registerProductosController } = require('./controllers/productosController');
const { registerVentasController } = require('./controllers/ventasController');
const { registerCategoriasController } = require('./controllers/categoriasController');


function createWindow() {
  // Crea la ventana del navegador.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Opcional: si necesitas script de precarga
      // Importante por seguridad, pero puede complicar la comunicación inicial:
      // contextIsolation: true,
      // nodeIntegration: false,
      // Considera usar `contextBridge` en preload.js si necesitas exponer APIs de Node al renderer.
    },
  });

  // Carga la URL de la aplicación.
  const startUrl = isDev
    ? 'http://localhost:3000' // URL del servidor de desarrollo de Next.js
    : url.format({
        pathname: path.join(__dirname, './out/index.html'), // Ruta al export estático de Next.js
        protocol: 'file:',
        slashes: true,
      });

  mainWindow.loadURL(startUrl);

  // Abre las DevTools si está en desarrollo
  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }
}

// Este método será llamado cuando Electron haya finalizado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden usarse solo después de que ocurra este evento.
app.whenReady().then(() => {
  createWindow();
  registerTestController();
  registerProductosController();
  registerVentasController();
  registerCategoriasController();

  app.on('activate', function () {
    // En macOS es común recrear una ventana en la aplicación cuando el
    // icono del dock es clickeado y no hay otras ventanas abiertas.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Sal cuando todas las ventanas hayan sido cerradas, excepto en macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Opcional: Crea un archivo preload.js si lo referenciaste en webPreferences
// Este archivo se ejecuta en un contexto privilegiado antes de que se cargue la página web.
// Crea un archivo preload.js en la raíz si es necesario.
/*
// preload.js (Ejemplo básico)
console.log('Preload script loaded');
// Aquí podrías usar contextBridge para exponer APIs de Node de forma segura
// const { contextBridge, ipcRenderer } = require('electron');
// contextBridge.exposeInMainWorld('myAPI', {
//   doSomething: () => ipcRenderer.send('do-something'),
// });
*/