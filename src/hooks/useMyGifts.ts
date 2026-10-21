import { useCallback, useState } from "react";

const STORAGE_KEY = "regalos-lian:mis-regalos";

/** giftId -> unidades que eligió este navegador */
type MyGifts = Record<string, number>;

function read(): MyGifts {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as MyGifts;
  } catch {
    return {};
  }
}

/**
 * Recuerda en este navegador qué regalos eligió el invitado, solo para
 * mostrárselo. La reserva es anónima: nada de esto se envía al servidor.
 */
export function useMyGifts() {
  const [myGifts, setMyGifts] = useState<MyGifts>(read);

  const add = useCallback((giftId: string, quantity: number) => {
    setMyGifts((prev) => {
      const next = { ...prev, [giftId]: (prev[giftId] ?? 0) + quantity };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Modo privado o almacenamiento bloqueado: solo se pierde el recordatorio.
      }
      return next;
    });
  }, []);

  return { myGifts, add };
}
