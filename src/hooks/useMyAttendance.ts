import { useCallback, useState } from "react";
import type { AttendanceConfirmation } from "@/lib/api";

const STORAGE_KEY = "regalos-lian:mi-asistencia";

function read(): AttendanceConfirmation | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttendanceConfirmation) : null;
  } catch {
    return null;
  }
}

/**
 * Recuerda en este navegador la confirmación de asistencia. El id es lo que
 * permite actualizarla después; solo lo tiene quien confirmó.
 */
export function useMyAttendance() {
  const [confirmation, setConfirmation] = useState<AttendanceConfirmation | null>(read);

  const save = useCallback((c: AttendanceConfirmation) => {
    setConfirmation(c);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      // Modo privado o almacenamiento bloqueado: solo se pierde el recordatorio.
    }
  }, []);

  return { confirmation, save };
}
