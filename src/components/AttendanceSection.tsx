import { CalendarCheck, Check } from "lucide-react";
import type { AttendanceConfirmation } from "@/lib/api";

interface Props {
  /** Confirmación guardada en este navegador, si la hay */
  confirmed: AttendanceConfirmation | null;
  onOpen: () => void;
}

export function AttendanceSection({ confirmed, onOpen }: Props) {
  return (
    <section id="asistencia" className="mt-12 scroll-mt-20 rounded-3xl border bg-card p-6 text-center shadow-soft">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-forest">
        <CalendarCheck className="h-6 w-6" aria-hidden />
      </div>
      <h2 className="mt-3 font-display text-2xl font-semibold text-forest">¿Nos acompañas?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Confírmanos tu asistencia para preparar todo con mucho cariño.
      </p>

      {confirmed && (
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
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
