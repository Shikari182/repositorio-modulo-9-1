import type { 
    LineaTicket, 
    ResultadoLineaTicket, 
    TipoIva 
  } from './types';
  
  const IVA_POR_TIPO: Record<TipoIva, number> = {
    general: 0.21,
    reducido: 0.10,
    superreducidoA: 0.05,
    superreducidoB: 0.04,
    superreducidoC: 0.00,
    sinIva: 0.00
  };
  
  export const calcularLineaTicket = (linea: LineaTicket): ResultadoLineaTicket => {
    const precioSinIva = linea.producto.precio * linea.cantidad;
    const iva = precioSinIva * IVA_POR_TIPO[linea.producto.tipoIva];
    
    return {
      nombre: linea.producto.nombre,
      cantidad: linea.cantidad,
      precioSinIva: Number(precioSinIva.toFixed(2)),
      tipoIva: linea.producto.tipoIva,
      precioConIva: Number((precioSinIva + iva).toFixed(2))
    };
  };
  
  export const calcularTotales = (lineas: ResultadoLineaTicket[]) => {
    return lineas.reduce((acc, linea) => ({
      sinIva: acc.sinIva + linea.precioSinIva,
      iva: acc.iva + (linea.precioConIva - linea.precioSinIva),
      conIva: acc.conIva + linea.precioConIva
    }), { sinIva: 0, iva: 0, conIva: 0 });
  };
  
  export const calcularDesgloseIva = (lineas: ResultadoLineaTicket[]) => {
    const desglose = lineas.reduce((acc, linea) => {
      const iva = linea.precioConIva - linea.precioSinIva;
      acc[linea.tipoIva] = (acc[linea.tipoIva] || 0) + iva;
      return acc;
    }, {} as Record<TipoIva, number>);
  
    return Object.entries(desglose).map(([tipo, cuantia]) => ({
      tipoIva: tipo as TipoIva,
      cuantia: Number(cuantia.toFixed(2))
    }));
  };