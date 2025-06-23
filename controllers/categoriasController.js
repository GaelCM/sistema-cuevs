/* eslint-disable @typescript-eslint/no-require-imports */
const { ipcMain } = require('electron');
const db = require('../db');

function registerCategoriasController(){

    ipcMain.handle('get-categorias', () => {
        const stmt = db.prepare('SELECT * FROM categorias');
        const res = stmt.all(); // aqui se obtiene todas las categorias el .all() es para obtener todas las categorias
        return res;
    });
}



module.exports = {registerCategoriasController};

