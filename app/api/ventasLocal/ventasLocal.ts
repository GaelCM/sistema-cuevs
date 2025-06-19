import { ProductoItem } from "@/types/Productos";

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