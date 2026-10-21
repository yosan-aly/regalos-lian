import { useCallback, useEffect, useState } from "react";
import { ApiError, getCatalog } from "@/lib/api";
import { contributions } from "@/data/contributions";
import type { Category, Gift } from "@/types/gift";

export type CatalogState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; categories: Category[] };

/** Carga el catálogo del API y lo mantiene al día. */
export function useCatalog() {
  const [state, setState] = useState<CatalogState>({ status: "loading" });

  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const categories = await getCatalog(signal);
      setState({
        status: "ready",
        categories: categories.map((c) => ({ ...c, contribution: contributions[c.id] })),
      });
    } catch (err) {
      if (signal?.aborted) return;
      // Si ya había datos, un refresco fallido no debe ocultar la lista.
      setState((prev) =>
        prev.status === "ready"
          ? prev
          : { status: "error", message: err instanceof ApiError ? err.message : "No pudimos cargar la lista." },
      );
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);

    // Al volver a la pestaña se refresca para ver lo que otros eligieron.
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      controller.abort();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  /** Reintenta mostrando el estado de carga (tras un error). */
  const retry = useCallback(() => {
    setState({ status: "loading" });
    load();
  }, [load]);

  /** Refresca en segundo plano, sin ocultar la lista. */
  const refresh = useCallback(() => {
    load();
  }, [load]);

  /** Reemplaza un regalo con la versión que devolvió el API tras reservar. */
  const updateGift = useCallback((gift: Gift) => {
    setState((prev) =>
      prev.status !== "ready"
        ? prev
        : {
            ...prev,
            categories: prev.categories.map((c) => ({
              ...c,
              gifts: c.gifts.map((g) => (g.id === gift.id ? gift : g)),
            })),
          },
    );
  }, []);

  return { state, retry, refresh, updateGift };
}
