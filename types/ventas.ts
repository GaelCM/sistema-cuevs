export type EstadoVenta = "inicio" | "cargando" | "finalizado";

export type VentaResponse = {
  success: boolean;
  message: string;
  data: number;
};