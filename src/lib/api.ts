import type { Category, Gift } from "@/types/gift";

const BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

/** Error del API con el código estable que define el backend. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface CatalogResponse {
  categories: Category[];
}

export interface ReservationResult {
  id: string;
  quantity: number;
  createdAt: string;
  /** El regalo con la disponibilidad ya actualizada */
  gift: Gift;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/api/v1${path}`, init);
  } catch (err) {
    if (init?.signal?.aborted) throw err;
    throw new ApiError(0, "NETWORK_ERROR", "No pudimos conectarnos. Revisa tu conexión e inténtalo de nuevo.");
  }

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(
      res.status,
      body?.error?.code ?? "UNKNOWN",
      body?.error?.message ?? "Ocurrió un error inesperado. Inténtalo de nuevo en un momento.",
    );
  }
  return body as T;
}

export async function getCatalog(signal?: AbortSignal): Promise<Category[]> {
  const data = await request<CatalogResponse>("/catalog", { signal });
  return data.categories;
}

export function reserveGift(giftId: string, quantity: number): Promise<ReservationResult> {
  return request<ReservationResult>(`/gifts/${encodeURIComponent(giftId)}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
}

/** Confirmación de asistencia guardada en el backend. */
export interface AttendanceConfirmation {
  id: string;
  name: string;
  /** Total de personas que asistirán, incluyendo a quien confirma */
  attendees: number;
}

export function createAttendanceConfirmation(name: string, attendees: number): Promise<AttendanceConfirmation> {
  return request<AttendanceConfirmation>("/attendance-confirmations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, attendees }),
  });
}

export function updateAttendanceConfirmation(
  id: string,
  name: string,
  attendees: number,
): Promise<AttendanceConfirmation> {
  return request<AttendanceConfirmation>(`/attendance-confirmations/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, attendees }),
  });
}
