"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


export default function Sidebar(){

   const ruta=usePathname();
   const [openReportes, setOpenReportes] = useState(false);

   const links = [
      {
        name: 'Dashboard', href: '/dashboard',
        icon: (isValid:boolean)=> <svg className={`w-6 h-6 ${isValid?'text-white':'text-gray-500'} flex-shrink-0 group-hover:text-white transition duration-75`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
         </svg>
      },
      { name: 'Productos', href: '/productos', 
        icon: (isValid:boolean)=><svg className={`w-6 h-6 ${isValid?'text-white':'text-gray-500'} flex-shrink-0 group-hover:text-white transition duration-75`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
     </svg> },
     { name: 'Usuarios', href: '/usuarios', 
      icon: (isValid:boolean)=> <svg className={`w-6 h-6 ${isValid?'text-white':'text-gray-500'} flex-shrink-0 group-hover:text-white transition duration-75`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
      </svg> },
    ];
    

    return(
         <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 pt-24 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
         <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
               <div className="flex-1 px-3 bg-white divide-y space-y-1">

                  <ul className="space-y-6 pb-2">

                        <li>
                        <a href={"/"}  className={`text-base font-normal rounded-lg hover:bg-red-500 hover:text-white flex items-center p-2 group ${ruta=="/" ? 'bg-red-500 text-white' : 'text-gray-900'}`}>
                           <svg className={`w-6 h-6 ${ruta=="/"?'text-white':'text-gray-500'} flex-shrink-0 group-hover:text-white transition duration-75`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Ventas</span>
                        </a>
                        </li>  

                     {links.map((link)=>(
                        <li key={link.name}>
                        <Link href={link.href}  className={`text-base font-normal rounded-lg hover:bg-red-500 hover:text-white flex items-center p-2 group ${ruta==link.href ? 'bg-red-500 text-white' : 'text-gray-900'}`}>
                           {link.icon(ruta==link.href)}
                           <span className="ml-3 flex-1 whitespace-nowrap">{link.name}</span>
                        </Link>
                        </li>      
                     ))}
                     
                     {/* Menú Reportes con submenú */}
                     <li>
                       <button
                         type="button"
                         onClick={() => setOpenReportes((prev) => !prev)}
                         className={`text-base font-normal w-full rounded-lg hover:bg-red-500 hover:text-white flex items-center p-2 group ${ruta=="/reportes" ? 'bg-red-500 text-white' : 'text-gray-900'}`}
                       >
                         <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-white transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2v8h10V6H5zm2 2h6v4H7V8z" clipRule="evenodd"></path>
                         </svg>
                         <span className="ml-3 whitespace-nowrap">Reportes</span>
                         <svg className={`w-4 h-4 ml-auto transition-transform duration-200 ${openReportes ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                         </svg>

                       </button>
                       {openReportes && (
                         <ul className="pl-10 py-1 space-y-1">
                           <li>
                             <Link href="/reportes/mis-ventas" className="block px-2 py-2 text-gray-700 hover:bg-red-500 hover:text-white rounded-lg">
                               Mis ventas
                             </Link>
                           </li>
                         </ul>
                       )}
                     </li>
                  </ul>

                  <div className="space-y-6 pt-4">
                     
                     <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                        <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="ml-3">Perfil</span>
                     </a>
                     
                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                           <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
                           </svg>
                           <span className="ml-3 flex-1 whitespace-nowrap">Cerrar Sesión</span>
                        </a>                                                         
                  </div>


               </div>
            </div>
         </div>
      </aside>
    )
}