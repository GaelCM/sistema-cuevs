import { sqlClient } from "@/lib/db";
import { NextResponse } from "next/server";


export class Categorias{

    static async obtenerCategorias() {
        const result = await sqlClient.execute({
            sql: "SELECT * FROM categorias",
        });

        if (result.rows.length === 0) {
            return NextResponse.json({ message: "No hay categorías", data: [] }, { status: 404 });
        } else {
            const categorias = result.rows;
            return NextResponse.json({ message: "Categorías obtenidas", data: categorias }, { status: 200 });
        }
    }
    
    
}