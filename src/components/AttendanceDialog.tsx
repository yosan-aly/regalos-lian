import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarCheck, Heart, Minus, Plus } from "lucide-react";
import { ApiError, type AttendanceConfirmation } from "@/lib/api";
import { MAX_ATTENDEES, MAX_NAME_LENGTH, saveAttendance, validateAttendance } from "@/lib/attendance";
import { StepButton } from "./StepButton";

interface Props {
  open: boolean;
  /** Fecha sugerida para confirmar, ej. "1 de diciembre" */
  deadline: string;
  /** Confirmación previa de este navegador: precarga el formulario y se actualiza */
  current: AttendanceConfirmation | null;
  onClose: () => void;
  onSaved: (confirmation: AttendanceConfirmation) => void;
}

export function AttendanceDialog({ open, deadline, current, onClose, onSaved }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // <dialog> nativo: atrapa el foco, cierra con Esc y oscurece el fondo.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      setName(current?.name ?? "");
      setAttendees(current?.attendees ?? 1);
      setStatus("idle");
      setError(null);
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
    // Solo al abrir: current cambia justo después de guardar y no debe reiniciar el formulario.
  }, [open]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const invalid = validateAttendance(name, attendees);
    if (invalid) {
      setError(invalid);
      return;
    }
    setStatus("saving");
    setError(null);
    try {
      const saved = await saveAttendance(name, attendees, current?.id);
      onSaved(saved);
      setStatus("done");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No pudimos registrar tu confirmación. Inténtalo de nuevo.");
      setStatus("idle");
    }
  }

  const saving = status === "saving";
  const isUpdate = Boolean(current);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(e) => saving && e.preventDefault()}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border bg-card p-6 text-foreground shadow-soft backdrop:bg-forest/40 backdrop:backdrop-blur-sm"
    >
      {status === "done" ? (
        <div className="text-center">
          <Heart className="mx-auto h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest">
            {isUpdate ? "¡Confirmación actualizada!" : "¡Gracias por confirmar!"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Te esperamos
            {attendees > 1 ? ` junto a ${attendees - 1 === 1 ? "tu acompañante" : `tus ${attendees - 1} acompañantes`}` : ""}.
            Será muy especial compartir este momento contigo.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground"
          >
            Volver a la lista
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <h2 className="font-display text-2xl font-semibold text-forest">
            {isUpdate ? "Actualizar confirmación" : "Confirmar asistencia"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cuéntanos quién viene antes del {deadline} para preparar todo con cariño.
          </p>

          <label htmlFor="attendance-name" className="mt-5 block text-sm font-semibold">
            Tu nombre
          </label>
          <input
            id="attendance-name"
            type="text"
            autoComplete="name"
            maxLength={MAX_NAME_LENGTH}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
            placeholder="Ej. Sanly Ortiz"
            className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-base outline-none focus:border-sage focus:ring-2 focus:ring-sage/40 disabled:opacity-60"
          />

          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <span className="text-sm font-semibold">¿Cuántas personas asistirán?</span>
              <p className="text-xs text-muted-foreground">Incluyéndote a ti</p>
            </div>
            <div className="flex items-center gap-3">
              <StepButton label="Menos" disabled={attendees <= 1 || saving} onClick={() => setAttendees((n) => n - 1)}>
                <Minus className="h-4 w-4" aria-hidden />
              </StepButton>
              <span className="w-6 text-center text-xl font-bold text-forest" aria-live="polite">
                {attendees}
              </span>
              <StepButton label="Más" disabled={attendees >= MAX_ATTENDEES || saving} onClick={() => setAttendees((n) => n + 1)}>
                <Plus className="h-4 w-4" aria-hidden />
              </StepButton>
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-full rounded-full border py-3 text-sm font-bold text-forest disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden />
              {saving ? "Guardando…" : isUpdate ? "Actualizar" : "Confirmar"}
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
