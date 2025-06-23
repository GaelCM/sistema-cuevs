import { getProductosLocal } from "@/app/api/productosLocal/productosLocal";
import ProductoDetalle from "@/app/(Pages)/productos/[id]/components/ProductoDetalle";

// Función requerida para exportación estática
export async function generateStaticParams() {
    try {
        const productos = await getProductosLocal();
        if (productos && productos.length > 0) {
            return productos.map((producto) => ({
                id: producto.idProducto,
            }));
        }
    } catch (error) {
        console.warn("No se pudieron obtener productos para generateStaticParams:", error);
    } 
    // Si no hay productos o hay error, devolver un array vacío
    // Esto permitirá que la página se genere dinámicamente
    return [];
}


export default async function ProductoDetallePage({ params }:{params:{id:string}}) {

    const {id} = await params;
    return <ProductoDetalle id={id} />;
    
}