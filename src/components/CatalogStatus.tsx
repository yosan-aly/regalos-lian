import { RefreshCw } from "lucide-react";

/** Tarjetas fantasma mientras carga (Neon puede tardar unos segundos en despertar). */
export function CatalogLoading() {
  return (
    <div className="mt-8 space-y-4" aria-busy="true" aria-label="Cargando la lista de regalos">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-56 animate-pulse rounded-2xl border bg-card/70" />
      ))}
      <p className="text-center text-sm text-muted-foreground">Cargando la lista de regalos…</p>
    </div>
  );
}

export function CatalogError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="mt-8 rounded-2xl border bg-card p-6 text-center shadow-soft">
      <p className="font-semibold text-forest">No pudimos cargar la lista</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
      >
        <RefreshCw className="h-4 w-4" aria-hidden />
        Reintentar
      </button>
    </div>
  );
}
