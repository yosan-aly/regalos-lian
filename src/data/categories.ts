import type { Category } from "@/types/gift";

export const categories: Category[] = [
  {
    id: "ropita",
    title: "Ropita y accesorios",
    description: "Prendas por talla, pañales, toallitas y accesorios para vestir a Lian.",
    gifts: [
      { id: "bodies-3-6", name: "Bodies de algodón", variant: "3–6 meses", description: "Bodies para uso diario; talla 3–6 meses.", required: 6, selected: 2 },
      { id: "bodies-6-9", name: "Bodies de algodón", variant: "6–9 meses", description: "Bodies para uso diario; talla 6–9 meses.", required: 6, selected: 0 },
      { id: "bodies-9-12", name: "Bodies de algodón", variant: "9–12 meses", description: "Bodies para uso diario; talla 9–12 meses.", required: 6, selected: 6 },
      { id: "panales-t2", name: "Pañales talla 2", variant: "Talla 2", description: "Pañales desechables; revisar unidades por paquete.", required: 4, selected: 1 },
    ],
  },
  {
    id: "cuidado",
    title: "Cuidado, descanso y desarrollo",
    description: "Higiene, baño, descanso seguro, juguetes y básicos del día a día.",
    gifts: [
      { id: "toalla", name: "Toalla con capucha", description: "Toalla suave con capucha.", required: 1, selected: 0 },
      { id: "saco", name: "Saco de dormir", variant: "Talla según peso", description: "Saco de dormir sin peso, adecuado al tamaño del bebé.", required: 1, selected: 1 },
      { id: "juguetes", name: "Juguetes de alto contraste", variant: "Desde nacimiento", description: "Estímulos visuales sencillos para bebé.", required: 3, selected: 1 },
      { id: "biberon", name: "Biberón anticólicos", variant: "Según preferencia", description: "Solo si la familia decide utilizar biberón.", required: 1, selected: 0 },
    ],
  },
  {
    id: "paseo",
    title: "Paseo",
    description: "Para salir con Lian: cómo llevarlo y llevar todo lo necesario.",
    gifts: [
      { id: "portabebe", name: "Portabebé ergonómico", variant: "Apto desde nacimiento", description: "Elegir modelo adecuado para la edad y seguir instrucciones.", required: 1, selected: 0 },
      { id: "panalera", name: "Pañalera o mochila", variant: "Desde nacimiento", description: "Pañalera o mochila para llevar lo necesario.", required: 1, selected: 0 },
    ],
  },
  {
    id: "especiales",
    title: "Regalos especiales y aportes",
    description: "Regalos de mayor valor y la opción de un aporte para los gastos de Lian.",
    gifts: [
      { id: "coche", name: "Coche para bebé", variant: "Apto desde recién nacido", description: "Coche plegable y apropiado para recién nacidos.", required: 1, selected: 0 },
      { id: "corral", name: "Corral / cuna portátil", description: "Espacio portátil para dormir o descansar, con superficie firme y plana.", required: 1, selected: 0 },
      { id: "esterilizador", name: "Esterilizador", variant: "Microondas o eléctrico", description: "Para artículos de alimentación cuando corresponda; seguir instrucciones del fabricante.", required: 1, selected: 1 },
    ],
    contribution: {
      id: "aporte",
      name: "Aporte para gastos de Lian",
      variant: "Monto libre",
      description: "Aporte voluntario para gastos del bebé; sin monto obligatorio.",
      available: true,
    },
  },
];
