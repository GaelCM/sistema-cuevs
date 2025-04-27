import sql from "mssql";
import mysql from 'mysql2/promise';
import {createClient} from '@libsql/client';


const config={
    user: 'sa',
    password: '1235',
    server: `192.168.1.65`, // O el nombre de tu servidor
    database: 'sistemaCuevs',
    options: {
      encrypt: true, // Habilitado según la captura (Encryption: Mandatory)
      trustServerCertificate: true, // para un certificado local
    }
  }
 
const configMysql = {
    host: 'sql3.freesqldatabase.com',       // IP o nombre del host
    user: 'sql3775001',               // tu usuario MySQL
    password: 'MmdiAP4NgF',           // tu contraseña
    database: 'sql3775001',   // nombre de la base de datos
    port: 3306,                 // por defecto es 3306
  };  


  export const connectToDb = async ()=> {
      try {
        const pool = await sql.connect(config);
        return pool;
      } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
      }
    };
  
    export const connectToMysql = async () => {
      try {
        const connection = await mysql.createConnection(configMysql);
        console.log('Conexión a MySQL exitosa');
        return connection;
      } catch (err) {
        console.error('Error al conectar a MySQL:', err);
        throw err;
      }
    };

    export const sqlClient=createClient({
        url:process.env.DB_URL ?? "",
        authToken: process.env.AUTH_TOKEN ?? "",
    })
