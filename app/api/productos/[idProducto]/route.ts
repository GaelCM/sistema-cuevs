import { ProductoClass } from "../../data/productos";


export async function GET(req:Request,{ params }: { params: { idProducto: string } }) {
    const idProducto = await params.idProducto.trim().toUpperCase();
    try{
        return ProductoClass.obtenerProducto(idProducto)
    }catch(error){
        console.log(error)
        return new Response("Internal Server Error", {status: 500})
    }

}