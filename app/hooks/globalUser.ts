import { UsuarioPublico } from "@/types/Usuarios";
import { create } from "zustand";



type globalUserModel = {

    user: UsuarioPublico; // <--- Usuario publico
    setUser: (user: UsuarioPublico) => void; // Añade o incrementa cantidad
    clearUser: () => void; // Elimina el usuario

    getUser: () => UsuarioPublico; // <--- Obtiene el usuario publico

};

export const useUserData = create<globalUserModel>((set, get) => ({
    user: {
        id: 0,
        usuario: "",
        email: "",
        nombre: "",
        apellidos: "",
        activo: false,
        fecha_creacion: "",
    },
    setUser: (user: UsuarioPublico) => set({ user }),
    clearUser: () => set({ user: {id: 0, usuario: "", email: "", nombre: "", apellidos: "", activo: false, fecha_creacion: ""} }),
    getUser: () => get().user,
}));