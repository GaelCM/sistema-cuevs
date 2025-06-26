import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {

    const rutaActual = request.nextUrl.pathname //aqui obtenemos la ruta actual del sistema en el que estamos
    const rutasPublicas = ["/login"] //aqui definimos las rutas publicas que pueden acceder sin token

    if(rutasPublicas.includes(rutaActual) || rutaActual.startsWith('/api')){ //aqui revisamos si la ruta es publica o es una api
        return NextResponse.next() //si es publica o api, se permite el acceso
    }

    const cookie = await cookies() //aqui obtenemos el token del cookie
    const token = cookie.get("token")?.value

    if(!token){ //si no hay token, se redirige a la pagina de login
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} // esto es para que el middleware se ejecute en todas las rutas excepto en las que estan en el array

