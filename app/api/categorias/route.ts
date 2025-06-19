import { Categorias } from "../data/categorias";


export async function GET(){
    try {
        return Categorias.obtenerCategorias();
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}