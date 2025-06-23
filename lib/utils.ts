import { Categorias, Producto, ProductoItem, ProductoResponse } from "@/types/Productos";
import { Notes } from "@/types/test";
import { VentaResponse } from "@/types/ventas";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatCurrency = (value:number) => {
  return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
  }).format(value);}
  


declare global {
    interface Window {
      electronApi: {
        getNotes: () => Promise<Notes[]>;
        addNotes: (name: string) => Promise<Notes>;
        deleteNotes: (id: number) => Promise<{ id: number }>;
        ///////////////////////////////
        getProductos: () => Promise<Producto[]>;
        getProducto: (id:string) => Promise<Producto>;
        insertarProducto: (producto: Producto) => Promise<ProductoResponse>;
        updateProducto: (producto: Producto) => Promise<ProductoResponse>;
        deleteProductos: (id: number) => Promise<{ id: number }>;
        ///////////////////////////////
        nuevaVenta: (totalVenta: number, idUsuario: number, status: number, productos: ProductoItem[], pago:number) => Promise<VentaResponse>;
        ///////////////////////////////
        getCategorias: () => Promise<Categorias[]>;
      };
    }
  }
  
export {}; // Muy importante para que TypeScript trate esto como un módulo y no genere errores.