"use client"

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import logo from "../../assets/logo.png"
import mascota from "../../assets/mascota.png"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { iniciarSesion } from "@/app/api/authentication/authentication";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUserData } from "@/app/hooks/globalUser";


const loginForm = z.object({
    username: z.string().min(2, {
    message: "El usuario debe tener al menos 2 caracteres",
    }),  
    password: z.string().min(2, {
        message: "La contraseña debe tener al menos 2 caracteres",
    }),
})

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useUserData();
    const router = useRouter();
    const form = useForm<z.infer<typeof loginForm>>({
        resolver: zodResolver(loginForm),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof loginForm>) => {
        setIsLoading(true);
        const res = await iniciarSesion(data.username, data.password);
        if(!res?.success){
            toast.error(res?.message);
            setIsLoading(false);
        }else{
            // Guarda el token en una cookie
            Cookies.set('token', res.token, { expires: 1, sameSite: 'strict' }); // expires: 1 día
            setUser(res.data);
            router.push(res?.path);
            toast.success(res?.message);
            setIsLoading(false);

        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[340px] max-w-xl w-full flex flex-col items-center">
        <img src={mascota.src} alt="Mascota" className="w-10 mb-4" />
        <img src={logo.src} alt="Logo" className="w-200 mb-4" />
        <h1 className="text-br-red-500 font-bold text-2xl mb-2 py-10">Iniciar sesión</h1>
       
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-[60%] items-center gap-4">
          <Input {...form.register("username")} placeholder="Usuario" className="" type="text" />
          <p className="text-red-500 text-center text-xs col-span-4">{form.formState.errors.username?.message}</p>
          <Input {...form.register("password")} placeholder="Contraseña" className="" type="password" />
          <p className="text-red-500 text-center text-xs col-span-4">{form.formState.errors.password?.message}</p>
          <div>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 font-semibold text-base mt-2 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>
          </div>
        </form>
        <div className="mt-6 text-red-400 font-medium">
          <span>¿Olvidaste tu contraseña?</span>
        </div>
      </div>
    </div>
  );
}