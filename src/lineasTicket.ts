import type { LineaTicket, ResultadoLineaTicket } from "./types";

const IVA_POR_TIPO = {
  general: 0.21,
  reducido: 0.10,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0.00,
  sinIva: 0.00
} as const;

export const calcularLineas = (lineas: LineaTicket[]): ResultadoLineaTicket[] => {
  return lineas.map(linea => {
    const precioSinIva = linea.producto.precio * linea.cantidad;
    const iva = precioSinIva * IVA_POR_TIPO[linea.producto.tipoIva];
    
    return {
      nombre: linea.producto.nombre,
      cantidad: linea.cantidad,
      precioSinIva: Number(precioSinIva.toFixed(2)),
      tipoIva: linea.producto.tipoIva,
      precioConIva: Number((precioSinIva + iva).toFixed(2))
    };
  });
};