import { Check, Gift as GiftIcon } from "lucide-react";
import type { Gift } from "@/types/gift";
import { availableQty, isAvailable } from "@/lib/gifts";
import { StatusBadge } from "./StatusBadge";
import { QuantityStats } from "./QuantityStats";

interface Props {
  gift: Gift;
  /** Unidades que eligió este navegador */
  mine: number;
  onChoose: (gift: Gift) => void;
}

export function GiftCard({ gift, mine, onChoose }: Props) {
  const available = isAvailable(gift);
  // El recuerdo local no se entera de cancelaciones hechas por admin:
  // nunca puede superar lo que el regalo tiene seleccionado de verdad.
  const myQty = Math.min(mine, gift.selected);
  return (
    <article className={`rounded-2xl border bg-card p-5 shadow-soft ${available ? "" : "opacity-70"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug">{gift.name}</h3>
          {gift.variant && (
            <span className="mt-1 inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">
              {gift.variant}
            </span>
          )}
        </div>
        <StatusBadge available={available} />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{gift.description}</p>
      <QuantityStats required={gift.required} selected={gift.selected} available={availableQty(gift)} />
      {myQty > 0 && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
          <Check className="h-4 w-4" aria-hidden />
          Elegiste {myQty > 1 ? `${myQty} unidades` : "este regalo"}
        </p>
      )}
      <button
        type="button"
        disabled={!available}
        onClick={() => onChoose(gift)}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100"
      >
        <GiftIcon className="h-4 w-4" aria-hidden />
        {available ? "Elegir este regalo" : "Ya fue elegido"}
      </button>
    </article>
  );
}
