import type { Contribution } from "@/types/gift";

/**
 * Aportes voluntarios por categoría. No se reservan, así que no están en el API;
 * los regalos y su disponibilidad vienen del backend (regalos-lian-api).
 */
export const contributions: Record<string, Contribution> = {
  especiales: {
    id: "aporte",
    name: "Lluvia de sobres para Lian",
    variant: "Monto libre",
    description: "Un aporte voluntario con el monto que desees.",
    available: true,
  },
};
