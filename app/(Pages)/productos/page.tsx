import { Categorias } from "@/types/Productos";
import NuevoProductoSection from "./components/NuevoProducto";

export default async function ProductosPage(){

    const obtenerCategorias = async () => {
        const url=`${process.env.NEXT_PUBLIC_API_URL}/api/categorias`;
        const response = await fetch(url)
    
        if (!response.ok) {
            throw new Error('Error al obtener las categorías');
        }
        const data = await response.json();
        return data.data; 
    }

    const categorias:Categorias[] = await obtenerCategorias()

    return(
        <>
        <div className="px-15 py-5 bg-white flex flex-col">
            <div className="flex justify-center">
            <p className='text-4xl font-bold text-red-500 p-2'>
                Administre sus productos
            </p>
            </div>
            <NuevoProductoSection categorias={categorias} ></NuevoProductoSection>
            <section className="p-5">
                <h1>LISTA DE PRODUCTOS</h1>
            </section>    
        </div>
        </>
    )
}