import { Producto } from "@/types/Productos";


export const getProducto = async (idProducto:string): Promise<Producto|null> => {
    if (window.electronApi?.getProducto) {
      const res = await window.electronApi.getProducto(idProducto);
      if (!res) {
        console.log("Producto no encontrado:", res);
        return null
      }
      console.log("Producto encontrado:", res);
      return res as Producto;
    } else {
      console.warn("electronAPI no está disponible.");
      return null;
    }
  };