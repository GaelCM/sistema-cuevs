import { ProductoClass } from "../data/productos"


export async function GET(){
     try{
            return ProductoClass.obtenerProductos()
        }catch(error){
            console.log(error)
            return new Response("Internal Server Error", {status: 500})
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();
        return ProductoClass.registrarProducto(body);
    } catch (error) {
        console.error("Error al registrar el producto:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

