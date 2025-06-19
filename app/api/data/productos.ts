
import { NextResponse } from "next/server";
import { sqlClient } from "@/lib/db";
import { Producto } from "@/types/Productos";

export class ProductoClass{

    static obtenerProducto=async(idProducto:string)=>{


        const result = await sqlClient.execute({
          sql: "SELECT * FROM productos WHERE idProducto = ? ",
          args: [idProducto],
        });
  
        if (result.rows.length === 0) {
          return NextResponse.json({ message: "El producto no existe", data: "" },{ status: 401 } );
        } 
        else{
          const producto = result.rows[0];
          return NextResponse.json({ message: "El producto existe", data: producto },{ status: 200 });
        }
    }


    static obtenerProductos=async()=>{      
      const result = await sqlClient.execute({
        sql: "SELECT * FROM productos",
      });
      if (result.rows.length === 0) {
        return NextResponse.json({ message: "no hay productos", data: "" },{ status: 401 } );
      } 
      else{
        const productos = result.rows;
        return NextResponse.json({ message: "Productos", data: productos },{ status: 200 });
      }
    }

    static productoExiste = async (idProducto: string) => {
    const result = await sqlClient.execute({
        sql: "SELECT 1 FROM productos WHERE idProducto = ?",
        args: [idProducto],
    });
    return result.rows.length > 0;
}

    static registrarProducto=async(producto:Producto)=>{
        const { idProducto, nombreProducto, precio, descripcion, idCategoria, idEstado } = producto;

       const existe = await this.productoExiste(idProducto);
        if (existe) {
        return NextResponse.json({ message: "El producto ya existe", data: "" }, { status: 409 });
        }
        

        const result = await sqlClient.execute({
          sql: "INSERT INTO productos (idProducto, nombreProducto, precio, descripcion, idCategoria, idEstado) VALUES (?, ?, ?, ?, ?, ?)",
          args: [idProducto, nombreProducto, precio, descripcion, idCategoria, idEstado],
        });

        if (result.rowsAffected === 0) {
          return NextResponse.json({ message: "Error al registrar el producto", data: "" },{ status: 500 });
        } else {
          return NextResponse.json({ message: "Producto registrado exitosamente", data: producto },{ status: 201 });
        }
    }

}