
import { useListaProductos } from "@/app/hooks/listaProductos";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,DialogDescription,DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";

import {Package} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


type DialogConfirmProps ={
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DialogConfirmVenta({isOpen, onOpenChange} :DialogConfirmProps) {

    const {carrito,getTotalPrice,clearCart}=useListaProductos()
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar el loading

    const generarNuevaVenta=async()=>{
        if(carrito.length===0){
            onOpenChange(!isOpen) // Cerrar el diálogo si no hay productos en el carrito
            toast.error('NO HAY PRODUCTOS EN LA VENTA', {
                description: 'Agrega productos al carrito antes de confirmar la venta.',})
            return
        }
        setIsLoading(true); // Iniciar loading
        const url=`${process.env.NEXT_PUBLIC_API_URL}/api/ventas` // Asegúrate de que la URL sea correcta
        const res=await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                totalVenta: getTotalPrice(), // Cambia esto por el total real de la venta
                idUsuario: 1, // Cambia esto por el ID real del usuario
                status: 1, // Cambia esto por el estado real de la venta
                productos: carrito // Asegúrate de que 'carrito' tenga la estructura correcta
            })
        })
        if(!res.ok){
            console.log("Error al crear la venta")
            return
        }else{
            const data=await res.json()
            console.log(data) // Maneja la respuesta según sea necesario
            setIsLoading(false); // Detener loading
            onOpenChange(!isOpen) // Cerrar el diálogo
            clearCart() // Limpiar el carrito después de la venta
        }
    }

    return(        

      <Dialog open={isOpen} onOpenChange={() => onOpenChange(!isOpen)}>
       {
        isLoading ? (
            <DialogContent className="sm:max-w-[750px] p-0 "> {/* Ajusta max-w si es necesario, quitamos padding general */}
            <DialogHeader className="p-6 pb-4">
                <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Package size={24} /> {/* Icono de paquete */}
                    Generando venta...
                </DialogTitle>
                <DialogDescription className="text-center"> {/* Texto centrado */}
                    Por favor, espere mientras se procesa su venta.
                </DialogDescription>
            </DialogHeader>

            <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div
                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
            >
                <div
                className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
            </div>
            </div>
            </DialogContent>

        ) : <DialogContent className="sm:max-w-[750px] p-0 "> {/* Ajusta max-w si es necesario, quitamos padding general */}
        <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <Package size={24} /> {/* Icono de paquete */}
                ¿Desea confirmar la venta?
            </DialogTitle>
            <DialogDescription>
            </DialogDescription>              
        </DialogHeader>
      
        <DialogFooter className="bg-gray-50 p-4 border-t"> {/* Fondo sutil para el footer */}
          
          <Button variant="outline" onClick={()=>{onOpenChange(!isOpen)}} className="bg-red-200" > {/* Variante outline puede ser más suave */}
                Cancelar
          </Button>             
          <Button variant="outline" onClick={generarNuevaVenta}  className="bg-green-200" > {/* Variante outline puede ser más suave */}
                Terminar venta
          </Button>
            
        </DialogFooter>
    </DialogContent>
       } 
      
  </Dialog>
    )
}
    