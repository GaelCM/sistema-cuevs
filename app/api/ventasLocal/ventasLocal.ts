import { ProductoItem } from "@/types/Productos";
import { Venta, DetalleVenta } from "@/types/ventas";

export const nuevaVenta=async(totalVenta:number,idUsuario:number,status:number,productos:ProductoItem[],pago:number)=>{

    if (window.electronApi?.nuevaVenta) {
        const res = await window.electronApi.nuevaVenta(totalVenta,idUsuario,status,productos,pago);
        if (!res) {
          console.log("Error al crear la venta:", res);
          return null
        }
        console.log("Venta creada:", res);
        return res
      } else {
        console.warn("electronAPI no está disponible.");
        return null;
      }
    
}


export const obtenerReporteVentas=async(fechaDesde:string,fechaHasta:string):Promise<Venta[] | null>=>{
  if (window.electronApi?.reporteVentas) {
    const res = await window.electronApi.reporteVentas(fechaDesde,fechaHasta);
    if (!res) {
      console.log("Error al buscar las ventas:", res);
      return null
    }
    console.log("Ventas encontradas:", res);
    return res
  } else {
    console.warn("electronAPI no está disponible.");
    return null;
  }
}


export const obtenerDetalleVenta = async (idVenta: string): Promise<DetalleVenta[] | null> => {
  if (window.electronApi?.detalleVenta) {
    const res = await window.electronApi.detalleVenta(idVenta);
    if (!res) {
      console.log("Error al obtener los detalles de la venta:", res);
      return null
    }
    console.log("Detalles de venta encontrados:", res);
    return res
  } else {
    console.warn("electronAPI no está disponible.");
    return null;
  }
}