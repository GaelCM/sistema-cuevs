/* eslint-disable @typescript-eslint/no-require-imports */
const Database=require('better-sqlite3');
const path = require('path');
const { app} = require('electron');

const dbPath = path.join(app.getPath("userData"), "sistema-cuevs.db"); // aqui se guarda la base de datos 
const db = new Database(dbPath);
console.log("Base de datos creada en: ", dbPath);

// Crear tabla
db.prepare(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT
  )`).run();



module.exports = db;