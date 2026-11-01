import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, RefreshCw, X } from "lucide-react";
import { ApiError, getAttendanceSummary, type ConfirmationSummary } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
}

const people = (n: number) => `${n} ${n === 1 ? "persona" : "personas"}`;
const dateFormat = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

/**
 * Vista oculta de confirmados (se abre desde el ícono del calendario).
 * Pide un código de solo consulta; mientras la página siga abierta no lo vuelve a pedir.
 */
export function GuestsDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [code, setCode] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [summary, setSummary] = useState<ConfirmationSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (value: string) => {
    setLoading(true);
    setError(null);
    try {
      setSummary(await getAttendanceSummary(value));
      setCode(value);
    } catch (err) {
      // Código incorrecto o demasiados intentos: se vuelve a pedir el código
      if (err instanceof ApiError && (err.status === 401 || err.status === 429)) setCode(null);
      setError(err instanceof ApiError ? err.message : "No pudimos cargar las confirmaciones.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      setInput("");
      setVisible(false);
      setError(null);
      if (!dialog.open) dialog.showModal();
      if (code) load(code);
    } else if (dialog.open) {
      dialog.close();
    }
    // Solo al abrir o cerrar
  }, [open]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (input.trim()) load(input.trim());
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border bg-card p-6 text-foreground shadow-soft backdrop:bg-forest/40 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-forest/40"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>

      {!code ? (
        <form onSubmit={submit} className="text-center">
          <Lock className="mx-auto h-6 w-6 text-forest" aria-hidden />
          <label htmlFor="viewer-code" className="mt-3 block font-display text-xl font-semibold text-forest">
            Código
          </label>
          <div className="relative mt-3">
            <input
              id="viewer-code"
              type={visible ? "text" : "password"}
              autoComplete="off"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border bg-background px-12 py-3 text-center text-base outline-none focus:border-sage focus:ring-2 focus:ring-sage/40 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Ocultar código" : "Mostrar código"}
              aria-pressed={visible}
              className="absolute top-1/2 right-2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted"
            >
              {visible ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-3 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Consultando…" : "Ver"}
          </button>
        </form>
      ) : (
        <div>
          <h2 className="pr-8 font-display text-2xl font-semibold text-forest">Confirmaciones de asistencia</h2>

          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-muted p-3">
              <p className="font-display text-3xl font-semibold text-forest">{summary?.totalConfirmations ?? "–"}</p>
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Confirmaciones</p>
            </div>
            <div className="rounded-2xl bg-forest p-3 text-primary-foreground">
              <p className="font-display text-3xl font-semibold">{summary?.totalAttendees ?? "–"}</p>
              <p className="text-[11px] font-bold uppercase tracking-wide opacity-80">Personas en total</p>
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-3 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              {error}
            </p>
          )}

          {summary?.confirmations.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">Todavía no hay confirmaciones.</p>
          )}

          <ul className="mt-3 max-h-[50vh] divide-y overflow-y-auto">
            {summary?.confirmations.map((c) => (
              <li key={c.id} className="flex items-center gap-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{dateFormat.format(new Date(c.createdAt))}</p>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-forest">
                  {people(c.attendees)}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => load(code)}
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-bold text-forest disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden />
            Actualizar
          </button>
        </div>
      )}
    </dialog>
  );
}
