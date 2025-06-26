
/* eslint-disable @typescript-eslint/no-require-imports */
const { ipcMain } = require('electron');
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




function authenticationController(){
    ipcMain.handle('login', (event, username, password) => {
        const stmt = db.prepare('SELECT * FROM usuarios WHERE usuario = ?');
        const res = stmt.get(username);
        if(!res){
            return{
                success: false,
                message: 'Usuario no encontrado',
                data: res,
                path: '/login'
            }
        }

        const user = res;
        const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

        if(!isPasswordValid){
            return{
                success: false,
                message: 'Contraseña incorrecta',
                data: user,
                path: '/login'
            }
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'}); //aqui se genera el token

       

        return{
            success: true,
            message: 'Login exitoso',
            data: user,
            token: token,
            path: '/'
        }
    });
}

module.exports = {authenticationController};
