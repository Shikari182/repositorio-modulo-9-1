import type { LineaTicket, ResultadoTotalTicket } from "./types";

const IVA_POR_TIPO = {
  general: 0.21,
  reducido: 0.10,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0.00,
  sinIva: 0.00
} as const;

export const calcularTotales = (lineas: LineaTicket[]): ResultadoTotalTicket => {
  const totales = lineas.reduce((acc, linea) => {
    const precioSinIva = linea.producto.precio * linea.cantidad;
    const iva = precioSinIva * IVA_POR_TIPO[linea.producto.tipoIva];
    
    return {
      sinIva: acc.sinIva + precioSinIva,
      iva: acc.iva + iva,
      conIva: acc.conIva + precioSinIva + iva
    };
  }, { sinIva: 0, iva: 0, conIva: 0 });

  return {
    totalSinIva: Number(totales.sinIva.toFixed(2)),
    totalIva: Number(totales.iva.toFixed(2)),
    totalConIva: Number(totales.conIva.toFixed(2))
  };
};