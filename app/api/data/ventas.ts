import { sqlClient } from "@/lib/db"
import {ProductoItem } from "@/types/Productos";
import { NextResponse } from "next/server"
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export class VentasClass{

    static async nuevaVenta(totalVenta: number, idUsuario: number, status: number, productos: ProductoItem[]): Promise<NextResponse> { // O como función normal
     
        const timeZone = 'America/Mexico_City';

        // Obtener la fecha local
        const now = new Date();
        const zonedDate = toZonedTime(now, timeZone);
        const fechaFormateada = format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
                
        const tx = await sqlClient.transaction('write');

            try {
            // Insertar en la tabla de ventas
            await tx.execute({
                sql: 'INSERT INTO ventas (fechaVenta, totalVenta, idUsuario, idStatusVenta) VALUES (?, ?, ?, ?)',
                args: [fechaFormateada, totalVenta, idUsuario, status],
            });

            const ventaIdResult = await tx.execute(`SELECT last_insert_rowid() as idVenta`);
            const idVenta = ventaIdResult.rows[0].idVenta;
            // Insertar detalles de la venta
            for (const producto of productos) {
                const subtotal = producto.product.precio * producto.quantity;
                await tx.execute({
                sql: 'INSERT INTO detalleVentas (idVenta, idProducto, cantidadProducto, precioUnitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                args: [idVenta,producto.product.idProducto, producto.quantity, producto.product.precio, subtotal],
                });
            }
        
            // Confirmar la transacción
            await tx.commit();
            return NextResponse.json({ message: 'nueva venta creada', data: idVenta }, { status: 200 });
            
        } 
            
            catch (error) {
            // Revertir la transacción en caso de error
            await tx.rollback();
            console.error('Error durante la transacción de la venta:', error);
            return NextResponse.json({ message: 'ERROR al crear la venta', data: '' }, { status: 500 });
            }
        }
    
    }