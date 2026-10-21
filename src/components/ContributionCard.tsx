import type { Contribution } from "@/types/gift";

export function ContributionCard({ contribution }: { contribution: Contribution }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border-2 border-dashed border-peach bg-peach/10 p-5">
      <span className="w-fit rounded-full bg-peach/30 px-3 py-1 text-xs font-bold">Opcional</span>
      <div>
        <h3 className="font-display text-lg font-semibold">{contribution.name}</h3>
        <p className="text-sm text-muted">{contribution.variant}</p>
      </div>
      <p className="text-sm">{contribution.description}</p>
      <p className="text-sm font-semibold">
        Estado: {contribution.available ? "Disponible" : "No disponible"}
      </p>
      <button type="button" disabled className="mt-auto rounded-full bg-peach px-4 py-2 text-sm font-bold text-ink disabled:cursor-not-allowed">
        Ver cómo aportar · próximamente
      </button>
    </article>
  );
}
