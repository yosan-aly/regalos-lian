import type { Contribution } from "@/types/gift";

/**
 * Aportes voluntarios por categoría. No se reservan, así que no están en el API;
 * los regalos y su disponibilidad vienen del backend (regalos-lian-api).
 */
export const contributions: Record<string, Contribution> = {
  especiales: {
    id: "aporte",
    name: "Aporte para gastos de Lian",
    variant: "Monto libre",
    description: "Aporte voluntario para gastos del bebé; sin monto obligatorio.",
    available: true,
  },
};
