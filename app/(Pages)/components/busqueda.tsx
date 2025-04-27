"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogProducto from "./DialogProducto";
import React from "react";
import { Producto } from "@/types/Productos";


const busquedaSchema = z.object({
    producto: z.string().min(2,{
        message: "El producto debe tener al menos 2 caracteres"
    })
})


export function Busqueda(){
  const [producto, setProducto] = React.useState<Producto | null>(null);
    const [open, setOpen] = React.useState(false);

    const {register,handleSubmit,formState: { errors }} = useForm<z.infer<typeof busquedaSchema>>({
        resolver: zodResolver(busquedaSchema),
        defaultValues: {
          producto: "",
        },
      })

      async function iniciarSesion(values: z.infer<typeof busquedaSchema>) {
        const url=`${process.env.NEXT_PUBLIC_API_URL}/api/productos/${values.producto}`;
        const response= await fetch(url,)
        if(response.status === 401){
            setProducto(null)
            setOpen(true)
        }else{
            const res = await response.json()
            console.log(res.data);
            setProducto(res.data);
            setOpen(true);
        }
    
      }

    return(
        <>
        <form onSubmit={handleSubmit(iniciarSesion)} className="bg-white rounded flex items-center p-4 shadow-sm border border-gray-200 ">
           
            <button className="outline-none focus:outline-none">
              <svg className="w-5 text-gray-600 h-5 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
            <input type="text" autoFocus className='w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-black' placeholder="Ingrese el código del producto"  {...register('producto')}  />
            {errors.producto && <p className="text-red-500 text-sm">{errors.producto.message}</p>}   
        </form>
        <DialogProducto isOpen={open} onOpenChange={setOpen} product={producto} ></DialogProducto>
        </>
    )
}