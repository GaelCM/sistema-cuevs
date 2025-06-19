
/* eslint-disable @typescript-eslint/no-require-imports */
const { ipcMain } = require('electron');
const db = require('../db');

function registerProductosController() {

    ipcMain.handle('get-productos', () => {
        const stmt = db.prepare('SELECT * FROM productos');
        const res = stmt.all();
        return res;
    });

    ipcMain.handle('get-producto', (event, id) => {
        const stmt = db.prepare('SELECT * FROM productos WHERE idProducto = ?');
        const res = stmt.get(id); // si esperas 1 resultado
        return res;
    });

    ipcMain.handle('add-producto', (event, producto) => {
        const stmt = db.prepare('INSERT INTO productos (nombre, precio) VALUES (?, ?)');
        const res = stmt.run(producto.nombre, producto.precio);
        return res;
    });

    ipcMain.handle('delete-producto', (event, id) => {
        const stmt = db.prepare('DELETE FROM productos WHERE id = ?');
        const res = stmt.run(id);
        return res;
    });
    
    
}

module.exports = { registerProductosController };