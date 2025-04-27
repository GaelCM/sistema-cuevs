
import { NextResponse } from "next/server";
import { sqlClient } from "@/lib/db";

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
}