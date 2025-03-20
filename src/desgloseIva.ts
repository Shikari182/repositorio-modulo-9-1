import type { LineaTicket, TotalPorTipoIva } from "./types";

const IVA_POR_TIPO = {
  general: 0.21,
  reducido: 0.10,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0.00,
  sinIva: 0.00
} as const;

export const calcularDesglose = (lineas: LineaTicket[]): TotalPorTipoIva[] => {
  const desglose = lineas.reduce((acc, linea) => {
    const precioSinIva = linea.producto.precio * linea.cantidad;
    const iva = precioSinIva * IVA_POR_TIPO[linea.producto.tipoIva];
    
    const tipoIva = linea.producto.tipoIva;
    acc[tipoIva] = (acc[tipoIva] || 0) + iva;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(desglose).map(([tipo, cuantia]) => ({
    tipoIva: tipo as keyof typeof IVA_POR_TIPO,
    cuantia: Number(cuantia.toFixed(2))
  }));
};