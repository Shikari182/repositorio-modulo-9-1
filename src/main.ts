type TipoIva = 
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

interface LineaTicket {
  producto: {
    nombre: string;
    precio: number;
    tipoIva: TipoIva;
  };
  cantidad: number;
}

const IVA_POR_TIPO: Record<TipoIva, number> = {
  general: 0.21,
  reducido: 0.10,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0.00,
  sinIva: 0.00
};

const calculaTicket = (lineas: LineaTicket[]) => {
  const resultado = lineas.map(linea => {
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

  const totalSinIva = Number(resultado.reduce((sum, l) => sum + l.precioSinIva, 0).toFixed(2));
  const totalIva = Number(resultado.reduce((sum, l) => sum + (l.precioConIva - l.precioSinIva), 0).toFixed(2));
  
  const desgloseIva = resultado.reduce((acc, l) => {
    const iva = l.precioConIva - l.precioSinIva;
    acc[l.tipoIva] = (acc[l.tipoIva] || 0) + iva;
    return acc;
  }, {} as Record<TipoIva, number>);

  return {
    lineas: resultado,
    total: {
      totalSinIva,
      totalConIva: Number((totalSinIva + totalIva).toFixed(2)),
      totalIva
    },
    desgloseIva: Object.entries(desgloseIva).map(([tipo, cuantia]) => ({
      tipoIva: tipo as TipoIva,
      cuantia: Number(cuantia.toFixed(2))
    }))
  };
};

// Productos del ejemplo
const productos: LineaTicket[] = [
  {
    producto: { nombre: "Legumbres", precio: 2, tipoIva: "general" },
    cantidad: 2
  },
  {
    producto: { nombre: "Perfume", precio: 20, tipoIva: "general" },
    cantidad: 3
  },
  {
    producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" },
    cantidad: 6
  },
  {
    producto: { nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" },
    cantidad: 1
  }
];

console.log('Ticket calculado:', calculaTicket(productos));