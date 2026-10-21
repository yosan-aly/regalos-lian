export type CategoryId = "ropita" | "cuidado" | "paseo" | "especiales";

export interface Gift {
  id: string;
  name: string;
  /** Talla, edad o variante (ej. "3–6 meses") */
  variant?: string;
  description: string;
  required: number;
  selected: number;
}

export interface Contribution {
  id: string;
  name: string;
  variant: string;
  description: string;
  available: boolean;
}

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  gifts: Gift[];
  contribution?: Contribution;
}

export interface EventInfo {
  babyName: string;
  dateLabel: string;
  intro: string;
  tagline: string;
  whatsappUrl?: string;
}
