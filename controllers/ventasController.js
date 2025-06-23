/* eslint-disable @typescript-eslint/no-require-imports */
const { ipcMain } = require('electron');
const db = require('../db');
const { format } = require('date-fns');
const { toZonedTime } = require('date-fns-tz');



function registerVentasController() {

    ipcMain.handle('nueva-venta', (event, totalVenta, idUsuario, status, productos, pago) => {
    
        const timeZone = 'America/Mexico_City';
        const now = new Date();
        const zonedDate = toZonedTime(now, timeZone);
        const fechaFormateada = format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
      
        let cambioVenta=0
            if(!pago || pago < totalVenta){
                cambioVenta=0
            }else{
                cambioVenta=pago - totalVenta
            }
      
        const insertVenta = db.prepare(`
          INSERT INTO ventas (fechaVenta, totalVenta, idUsuario, idStatusVenta, pagoVenta, cambioVenta)
          VALUES (?, ?, ?, ?, ?, ?)
        `); // aqui se prepara la consulta para insertar la venta en la tabla ventas
      
        const getLastId = db.prepare('SELECT last_insert_rowid() as idVenta'); // aqui se prepara la consulta para obtener el id de la venta
      
        const insertDetalle = db.prepare(`
          INSERT INTO detalleVentas (idVenta, idProducto, cantidadProducto, precioUnitario, subtotal)
          VALUES (?, ?, ?, ?, ?)
        `); // aqui se prepara la consulta para insertar los detalles de la venta en la tabla detalleVentas 
      
        const transact = db.transaction(() => {

          insertVenta.run(fechaFormateada, totalVenta, idUsuario, status, pago, cambioVenta);
          const { idVenta } = getLastId.get();
      
          for (const producto of productos) {
            const subtotal = producto.product.precio * producto.quantity; // aqui se calcula el subtotal de la venta
            insertDetalle.run(
              idVenta,
              producto.product.idProducto,
              producto.quantity,
              producto.product.precio,
              subtotal
            );
          }
      
          return idVenta;
        });
      
        try {
          const idVenta = transact();
          return {
            success: true,
            message: 'Nueva venta creada',
            data: idVenta
          };
        } catch (error) {
          console.error('Error durante la transacción de venta:', error);
          return {
            success: false,
            message: 'ERROR al crear la venta',
            error: error.message
          };
        }
      });
}

module.exports = { registerVentasController };