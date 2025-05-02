import { VentasClass } from "../data/ventas"


export async function POST(req:Request){
    const body=await req.json()
    const {totalVenta,idUsuario,status,productos,pago}=body
    try{
        return VentasClass.nuevaVenta(totalVenta,idUsuario,status,productos,pago)
        }catch(error){
        console.log(error)
        return new Response("Internal Server Error", {status: 500})
    }
}