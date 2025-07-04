import { Categorias, Producto, ProductoItem, ProductoResponse } from "@/types/Productos";
import { Notes } from "@/types/test";
import { Usuario } from "@/types/Usuarios";
import { Venta, VentaResponse, DetalleVenta } from "@/types/ventas";
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
        deleteProducto: (id: string) => Promise<{success:boolean, message:string}>;
        ///////////////////////////////
        nuevaVenta: (totalVenta: number, idUsuario: number, status: number, productos: ProductoItem[], pago:number) => Promise<VentaResponse>;
        ///////////////////////////////
        getCategorias: () => Promise<Categorias[]>;
        ///////////////////////////////
        reporteVentas: (fechaDesde: string, fechaHasta: string) => Promise<Venta[]>;
        detalleVenta: (idVenta: string) => Promise<DetalleVenta[]>;
        ///////////////////////////////
        login: (username: string, password: string) => Promise<{success:boolean, message:string, data:Usuario, token:string, path:string}>;

      };
    }
  }
  
export {}; // Muy importante para que TypeScript trate esto como un módulo y no genere errores.