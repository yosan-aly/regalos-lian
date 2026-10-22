import { useEffect, useRef, useState } from "react";
import { Gift as GiftIcon, Heart, Minus, Plus } from "lucide-react";
import type { Gift } from "@/types/gift";
import { ApiError, reserveGift, type ReservationResult } from "@/lib/api";
import { availableQty } from "@/lib/gifts";
import { StepButton } from "./StepButton";

const MAX_PER_RESERVATION = 20;

interface Props {
  /** Regalo a confirmar; null cierra el diálogo */
  gift: Gift | null;
  onClose: () => void;
  onReserved: (result: ReservationResult) => void;
  /** Otro invitado se adelantó: hay que refrescar la lista */
  onConflict: () => void;
}

export function ReserveDialog({ gift, onClose, onReserved, onConflict }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // <dialog> nativo: atrapa el foco, cierra con Esc y oscurece el fondo.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (gift) {
      setQuantity(1);
      setStatus("idle");
      setError(null);
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [gift]);

  const maxQuantity = gift ? Math.min(availableQty(gift), MAX_PER_RESERVATION) : 1;

  async function confirm() {
    if (!gift) return;
    setStatus("saving");
    setError(null);
    try {
      const result = await reserveGift(gift.id, quantity);
      onReserved(result);
      setStatus("done");
    } catch (err) {
      const apiErr = err instanceof ApiError ? err : null;
      setError(apiErr?.message ?? "Ocurrió un error inesperado. Inténtalo de nuevo.");
      setStatus("idle");
      if (apiErr?.status === 409) onConflict();
    }
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(e) => status === "saving" && e.preventDefault()}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border bg-card p-6 text-foreground shadow-soft backdrop:bg-forest/40 backdrop:backdrop-blur-sm"
    >
      {gift && status === "done" ? (
        <div className="text-center">
          <Heart className="mx-auto h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest">¡Gracias!</h2>
          <p className="mt-2 text-muted-foreground">
            Reservaste {quantity > 1 ? `${quantity} × ` : ""}
            <strong className="text-foreground">{gift.name}</strong>
            {gift.variant ? ` (${gift.variant})` : ""}. Lian lo recibirá con muchísimo amor.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground"
          >
            Volver a la lista
          </button>
        </div>
      ) : gift ? (
        <div>
          <h2 className="font-display text-2xl font-semibold text-forest">¿Confirmas este regalo?</h2>
          <div className="mt-4 rounded-2xl bg-muted p-4">
            <p className="text-lg font-bold leading-snug">{gift.name}</p>
            {gift.variant && (
              <span className="mt-1 inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">
                {gift.variant}
              </span>
            )}
          </div>

          {maxQuantity > 1 && (
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold">¿Cuántas unidades?</span>
              <div className="flex items-center gap-3">
                <StepButton label="Menos" disabled={quantity <= 1 || status === "saving"} onClick={() => setQuantity((q) => q - 1)}>
                  <Minus className="h-4 w-4" aria-hidden />
                </StepButton>
                <span className="w-6 text-center text-xl font-bold text-forest" aria-live="polite">
                  {quantity}
                </span>
                <StepButton label="Más" disabled={quantity >= maxQuantity || status === "saving"} onClick={() => setQuantity((q) => q + 1)}>
                  <Plus className="h-4 w-4" aria-hidden />
                </StepButton>
              </div>
            </div>
          )}

          <p className="mt-4 text-sm text-muted-foreground">
            Tu elección es anónima. Si luego necesitas cambiarla, escríbenos por WhatsApp.
          </p>

          {error && (
            <p role="alert" className="mt-4 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={status === "saving"}
              className="w-full rounded-full border py-3 text-sm font-bold text-forest disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={status === "saving" || maxQuantity < 1}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
            >
              <GiftIcon className="h-4 w-4" aria-hidden />
              {status === "saving" ? "Reservando…" : "Sí, lo regalaré"}
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
