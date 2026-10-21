import type { Gift } from "@/types/gift";
import { availableQty, isAvailable } from "@/lib/gifts";
import { StatusBadge } from "./StatusBadge";
import { QuantityStats } from "./QuantityStats";

export function GiftCard({ gift }: { gift: Gift }) {
  const available = isAvailable(gift);
  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border border-sand bg-white p-5 shadow-sm ${
        available ? "" : "opacity-60"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold">{gift.name}</h3>
          {gift.variant && <p className="text-sm text-muted">{gift.variant}</p>}
        </div>
        <StatusBadge available={available} />
      </div>
      <p className="text-sm">{gift.description}</p>
      <QuantityStats required={gift.required} selected={gift.selected} available={availableQty(gift)} />
      <button
        type="button"
        disabled
        className={`mt-auto rounded-full px-4 py-2 text-sm font-bold ${
          available ? "bg-sage text-white" : "bg-sand text-muted"
        } disabled:cursor-not-allowed`}
      >
        {available ? "Elegir este regalo · próximamente" : "Ya fue elegido"}
      </button>
    </article>
  );
}
