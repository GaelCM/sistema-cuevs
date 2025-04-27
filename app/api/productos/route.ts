import { ProductoClass } from "../data/productos"


export async function GET(){
     try{
            return ProductoClass.obtenerProductos()
        }catch(error){
            console.log(error)
            return new Response("Internal Server Error", {status: 500})
    }
}

