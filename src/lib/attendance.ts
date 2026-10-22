import {
  ApiError,
  createAttendanceConfirmation,
  updateAttendanceConfirmation,
  type AttendanceConfirmation,
} from "@/lib/api";

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 80;
export const MAX_ATTENDEES = 10;

/** Muestra u oculta la sección de confirmación de asistencia. */
export const ATTENDANCE_ENABLED = import.meta.env.VITE_ATTENDANCE_ENABLED === "true";

/** Valida el formulario antes de enviarlo; devuelve un mensaje de error o null. */
export function validateAttendance(name: string, attendees: number): string | null {
  const length = name.trim().length;
  if (length < MIN_NAME_LENGTH || length > MAX_NAME_LENGTH) {
    return `Escribe tu nombre (entre ${MIN_NAME_LENGTH} y ${MAX_NAME_LENGTH} caracteres).`;
  }
  if (attendees < 1 || attendees > MAX_ATTENDEES) {
    return `La cantidad de asistentes debe estar entre 1 y ${MAX_ATTENDEES}.`;
  }
  return null;
}

/**
 * Crea la confirmación o, si este navegador ya tenía una, la actualiza.
 * Si la anterior ya no existe (la eliminó un admin), crea una nueva.
 */
export async function saveAttendance(
  name: string,
  attendees: number,
  existingId?: string,
): Promise<AttendanceConfirmation> {
  if (existingId) {
    try {
      return await updateAttendanceConfirmation(existingId, name, attendees);
    } catch (err) {
      if (!(err instanceof ApiError && err.status === 404)) throw err;
    }
  }
  return createAttendanceConfirmation(name, attendees);
}
