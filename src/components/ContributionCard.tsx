import { Heart } from "lucide-react";
import type { Contribution } from "@/types/gift";

export function ContributionCard({ contribution }: { contribution: Contribution }) {
  return (
    <article className="rounded-2xl border border-dashed border-gold/60 bg-cream p-5">
      <div className="flex items-center gap-2 text-gold">
        <Heart className="h-4 w-4" aria-hidden />
        <span className="text-xs font-bold uppercase tracking-wider">Opcional</span>
      </div>
      <h3 className="mt-2 text-lg font-bold">{contribution.name}</h3>
      <span className="mt-1 inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">
        {contribution.variant}
      </span>
      <p className="mt-3 text-sm text-muted-foreground">{contribution.description}</p>
      <p className="mt-3 text-sm font-semibold text-forest">
        Estado: {contribution.available ? "Disponible" : "No disponible"}
      </p>
      <button
        type="button"
        disabled
        className="mt-4 w-full rounded-full border border-gold py-3 text-sm font-bold text-accent-foreground"
      >
        Ver cómo aportar · próximamente
      </button>
    </article>
  );
}
