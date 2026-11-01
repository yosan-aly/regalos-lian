import { CalendarCheck, Check } from "lucide-react";
import type { AttendanceConfirmation } from "@/lib/api";

interface Props {
  /** Confirmación guardada en este navegador, si la hay */
  confirmed: AttendanceConfirmation | null;
  /** Fecha sugerida para confirmar, ej. "1 de diciembre" */
  deadline: string;
  onOpen: () => void;
  /** Clic en el ícono del calendario: abre la vista oculta de confirmados */
  onSecret: () => void;
}

export function AttendanceSection({ confirmed, deadline, onOpen, onSecret }: Props) {
  return (
    <section id="asistencia" className="mt-4 scroll-mt-20 rounded-3xl border bg-card p-6 text-center shadow-soft">
      {/* Se ve igual que un ícono decorativo (sin cursor de mano ni efecto al pasar
          el mouse): solo quien lo sabe toca aquí para ver las confirmaciones. */}
      <button
        type="button"
        onClick={onSecret}
        aria-label="Calendario"
        className="mx-auto grid h-12 w-12 cursor-default place-items-center rounded-2xl bg-secondary text-forest outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
      >
        <CalendarCheck className="h-6 w-6" aria-hidden />
      </button>
      <h2 className="mt-3 font-display text-2xl font-semibold text-forest">Confirmar asistencia</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Confírmanos tu asistencia para preparar todo con mucho cariño.
      </p>
      <p className="mt-3 inline-block rounded-full bg-gold/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.15em] text-accent-foreground">
        Confirma antes del {deadline}
      </p>

      {confirmed && (
        <p className="mt-4 flex justify-center items-center gap-1.5 text-sm font-semibold text-forest">
          <Check className="h-4 w-4" aria-hidden />
          Confirmaste como {confirmed.name} · {confirmed.attendees} {confirmed.attendees === 1 ? "persona" : "personas"}
        </p>
      )}

      <button
        type="button"
        onClick={onOpen}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110"
      >
        <CalendarCheck className="h-4 w-4" aria-hidden />
        {confirmed ? "Actualizar confirmación" : "Confirmar asistencia"}
      </button>
    </section>
  );
}
