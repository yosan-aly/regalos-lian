/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base del backend, ej. http://localhost:7070 */
  readonly VITE_API_URL: string;
  /** "true" muestra la sección de confirmación de asistencia */
  readonly VITE_ATTENDANCE_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
