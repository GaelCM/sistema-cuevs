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

    ipcMain.handle('insertar-producto', (event, producto) => {
        const stmtCheck = db.prepare('SELECT * FROM productos WHERE idProducto = ?');
        const productoExistente = stmtCheck.get(producto.idProducto);

        if (productoExistente) {
            return {
                success: false,
                message: 'El producto con este ID ya existe',
                data: productoExistente
            };
        }

        const stmt = db.prepare('INSERT INTO productos (idProducto, nombreProducto, precio, descripcion, idCategoria, idEstado) VALUES (?, ?, ?, ?, ?, ?)');
        const res = stmt.run(producto.idProducto, producto.nombreProducto, producto.precio, producto.descripcion, producto.idCategoria, producto.idEstado);
        return {
            success: true,
            message: 'Producto insertado correctamente',
            data: res
        };
    });

    ipcMain.handle('update-producto', (event, producto) => {
        const stmt = db.prepare('UPDATE productos SET nombreProducto = ?, precio = ?, descripcion = ?, idCategoria = ?, idEstado = ? WHERE idProducto = ?');
        const res = stmt.run(producto.nombreProducto, producto.precio, producto.descripcion, producto.idCategoria, producto.idEstado, producto.idProducto);
        return {
            success: true,
            message: 'Producto actualizado correctamente',
            data: res
        };
    });

    ipcMain.handle('delete-producto', (event, id) => {
        const stmt = db.prepare('DELETE FROM productos WHERE id = ?');
        const res = stmt.run(id);
        return res;
    });
    
    
}

module.exports = { registerProductosController };