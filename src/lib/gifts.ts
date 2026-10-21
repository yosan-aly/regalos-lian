import type { Gift } from "@/types/gift";

/** Cantidad que aún se puede elegir */
export const availableQty = (g: Gift) => Math.max(g.required - g.selected, 0);

/** Un regalo está disponible si aún quedan unidades */
export const isAvailable = (g: Gift) => availableQty(g) > 0;
