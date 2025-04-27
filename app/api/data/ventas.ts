import { sqlClient } from "@/lib/db"
import {ProductoItem } from "@/types/Productos";
import { LibsqlError } from "@libsql/client";
import { NextResponse } from "next/server"
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export class VentasClass{

    static async nuevaVenta(totalVenta: number, idUsuario: number, status: number, productos: ProductoItem[]): Promise<NextResponse> { // O como función normal

      
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const batchStatements: { sql: string, args: any[] }[] = [];
        const timeZone = 'America/Mexico_City';

        // Obtener la fecha local
        const now = new Date();
        const zonedDate = toZonedTime(now, timeZone);
        const fechaFormateada = format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
                
        // Statement 1: Insertar en ventas
        batchStatements.push({
            sql: "INSERT INTO ventas (fechaVenta, totalVenta, idUsuario, idStatusVenta) VALUES (?, ?, ?, ?)", // Usar 'localtime' si quieres la hora local del servidor
            args: [fechaFormateada,totalVenta, idUsuario, status],
        });
    
        // Insertar en detalle_venta usando last_insert_rowid()
        productos.forEach(product => {

            const subtotal = product.product.precio * product.quantity; // Calcular subtotal
            batchStatements.push({
                // Usamos la función de SQLite para obtener el ID de la inserción anterior (ventas)
                // dentro de la misma transacción (que batch maneja implícitamente)
                sql: "INSERT INTO detalleVentas (idVenta, idProducto, cantidadProducto, precioUnitario, subtotal) VALUES (last_insert_rowid(), ?, ?, ?, ?)",
                args: [product.product.idProducto, product.quantity, product.product.precio, subtotal],
            });
        }); 
        // Statement N+1: Seleccionar el ID de la venta insertada para devolverlo
        // Nota: Esto asume que last_insert_rowid() todavía contiene el ID de la primera inserción.
        // En una transacción batch simple como esta, debería ser el caso.
        batchStatements.push({
            sql: "SELECT last_insert_rowid() as idVenta",
            args: [],
        });
    
        try {
            // 2. Ejecutar el batch completo como una transacción
            // El modo 'write' es apropiado aquí y a menudo el predeterminado para batch.
            const batchResult = await sqlClient.batch(batchStatements, 'write');
    
            // 3. Verificar el resultado y extraer el ID de la última sentencia (el SELECT)
            // La estructura exacta de batchResult puede variar, pero usualmente es un array de resultados.
            // Verifica que la ejecución no falló y que obtuvimos un array de resultados esperado.
            if (batchResult && batchResult.length === batchStatements.length) {
                const selectResult = batchResult[batchResult.length - 1]; // Resultado del SELECT ... as idVenta
    
                // Comprobar si el SELECT devolvió la fila y la columna esperada
                if (selectResult.rows && selectResult.rows.length > 0 && typeof selectResult.rows[0].idVenta === 'number') {
                    const idVenta = selectResult.rows[0].idVenta;
                    console.log("Venta y detalles insertados con éxito. ID Venta:", idVenta);
                    return NextResponse.json({ message: 'nueva venta creada', data: idVenta }, { status: 200 });
                } else {
                    // Esto es inesperado si el batch no lanzó error, pero cubre el caso.
                    console.error("El batch se completó, pero no se pudo recuperar el idVenta del resultado del SELECT.");
                    return NextResponse.json({ message: 'ERROR al crear la venta (falló recuperación de ID)', data: "" }, { status: 500 });
                }
            } else {
                // El batch pudo haber fallado parcialmente o la estructura del resultado no es la esperada
                console.error("Falló la ejecución del batch o el resultado no fue el esperado:", batchResult);
                return NextResponse.json({ message: 'ERROR al crear la venta (falló el batch)', data: "" }, { status: 500 });
            }
    
        } catch (error) {
            // Captura cualquier error durante la ejecución del batch (la transacción debería hacer rollback automáticamente)
            console.error("Error durante la transacción de la venta:", error);
            // Considera loggear más detalles del error si es posible
            const errorMessage = error instanceof LibsqlError ? error.message : 'Error desconocido al crear la venta';
            return NextResponse.json({ message: `ERROR al crear la venta: ${errorMessage}`, data: "" }, { status: 500 }); // Usar 500 para errores internos
        }
    }

}