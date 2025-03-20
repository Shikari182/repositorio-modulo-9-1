import type { LineaTicket } from "./types";
import { calcularLineas } from "./lineasTicket";
import { calcularTotales } from "./totalesTicket";
import { calcularDesglose } from "./desgloseIva";

// Datos de ejemplo completamente independientes
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

// Procesamiento completamente independiente de cada sección
const resultado = {
  lineas: calcularLineas(productos),
  total: calcularTotales(productos),
  desgloseIva: calcularDesglose(productos)
};

console.log('Ticket completo:', resultado);