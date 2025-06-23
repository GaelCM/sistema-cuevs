import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   // Añade esta línea:
  // output: 'export', // Comentado para permitir rutas dinámicas
  // Opcional: Si tienes problemas con rutas de imágenes después de exportar:
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Considera quitar esto para producción real
  },
  eslint: {
    ignoreDuringBuilds: true, // Considera quitar esto para producción real
  }
};

export default nextConfig;
