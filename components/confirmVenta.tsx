
import { useListaProductos } from "@/app/hooks/listaProductos";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,DialogDescription,DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { EstadoVenta } from "@/types/ventas";
import {Package} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


type DialogConfirmProps ={
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}


export default function DialogConfirmVenta({isOpen, onOpenChange} :DialogConfirmProps) {

    const {carrito,getTotalPrice,clearCart}=useListaProductos()
    const [cambioEfectivo, setCambioEfectivo] = useState(0); // Estado para manejar el cambio
    const [folio,setFolio]=useState(0) // Estado para manejar el folio de la venta
    const [estadoVenta, setEstadoVenta] = useState<EstadoVenta>("inicio");

    const nuevaVenta=()=>{
        setEstadoVenta("inicio") // Reiniciar el estado de la venta
        clearCart() // Limpiar el carrito
        setCambioEfectivo(0) // Reiniciar el cambio
        onOpenChange(!isOpen) // Cerrar el diálogo
    }

    const generarNuevaVenta=async()=>{
        if(carrito.length===0){
            onOpenChange(!isOpen) // Cerrar el diálogo si no hay productos en el carrito
            toast.error('NO HAY PRODUCTOS EN LA VENTA', {
                description: 'Agrega productos al carrito antes de confirmar la venta.',})
            return
        }
        setEstadoVenta("cargando"); // Iniciar loading
        const url=`${process.env.NEXT_PUBLIC_API_URL}/api/ventas` // Asegúrate de que la URL sea correcta
        const res=await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                totalVenta: getTotalPrice(), 
                idUsuario: 1, 
                status: 1, 
                productos: carrito, // Asegúrate de que 'carrito' tenga la estructura correcta,
                pago: cambioEfectivo // Asegúrate de que 'cambioEfectivo' tenga la estructura correcta
            })
        })
        if(!res.ok){
            console.log("Error al crear la venta")
            return
        }else{
            const data=await res.json()
            console.log(data) // Maneja la respuesta según sea necesario
            setEstadoVenta("finalizado"); 
            setFolio(data.data) // Asigna el folio de la venta
            toast.success('Venta generada correctamente', {
                description:`La venta se ha generado correctamente, FOLIO ${data.data}`,})
        }
    }



    return(        

        <Dialog open={isOpen} onOpenChange={() => onOpenChange(false)}>
        {estadoVenta === "inicio" && (
            <DialogContent className="sm:max-w-[750px] p-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                        <Package size={24} /> Detalles de la venta
                    </DialogTitle>
                </DialogHeader>
                <h1 className="text-4xl text-center">TOTAL DE LA VENTA:</h1>
                <h1 className="text-6xl font-bold text-center">{formatCurrency(getTotalPrice())}</h1>

                <h1 className="text-4xl text-center p-2">PAGÓ CON:</h1>
                <div className="flex justify-center p-2">
                    <input
                        type="text"
                        className="text-6xl text-center font-bold w-[50%] bg-red-100 border-2 border-red-600"
                        autoFocus
                        onChange={(e) => {
                            setCambioEfectivo(Number(e.target.value))
                            console.log(cambioEfectivo)
                        }}
                    />
                </div>

                <DialogFooter className="bg-gray-50 p-4 border-t">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-red-200">
                        Cancelar
                    </Button>
                    <Button variant="outline" onClick={generarNuevaVenta} className="bg-green-200">
                        Terminar venta
                    </Button>
                </DialogFooter>
            </DialogContent>
        )}

        {estadoVenta === "cargando" && (
            <DialogContent className="sm:max-w-[750px] p-0">
                <DialogHeader className="p-6 pb-4 text-center">
                    <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                        <Package size={24} /> Generando venta...
                    </DialogTitle>
                    <DialogDescription>Por favor, espere mientras se procesa su venta.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-20 h-20 border-4 border-t-blue-400 border-transparent rounded-full animate-spin" />
                </div>
            </DialogContent>
        )}

        {estadoVenta === "finalizado" && (
            <DialogContent className="sm:max-w-[750px] p-0">
                <DialogHeader className="p-6 pb-4 text-center">
                    <DialogTitle className="text-4xl text-center text-green-500">
                        ✅ Venta Finalizada
                    </DialogTitle>
                    <DialogDescription className="text-xl text-center">La venta ha sido procesada con éxito.</DialogDescription>
                    
                </DialogHeader>
                <div>
                    <h1 className="text-4xl text-center pb-3">SU CAMBIO ES DE </h1>
                    <h1 className="text-6xl font-bold text-center">{formatCurrency(cambioEfectivo - getTotalPrice()>0?cambioEfectivo - getTotalPrice():0)}</h1>
                </div>
                <div className="flex flex-col items-center justify-center py-5">
                <p className="text-md font-bold text-red-600 opacity-70 ">Folio venta: {folio}</p>
                </div>
                <div className="flex justify-center">
                    <Button className="mt-6" onClick={() => {
                        nuevaVenta();
                        onOpenChange(false);
                    }}>
                        Finalizar venta 
                    </Button>
                </div>
            </DialogContent>
        )}
    </Dialog>
    
    )
}
    