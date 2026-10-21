export function StatusBadge({ available }: { available: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
        available ? "bg-secondary text-forest" : "bg-muted text-unavailable"
      }`}
    >
      {available ? "Disponible" : "No disponible"}
    </span>
  );
}
