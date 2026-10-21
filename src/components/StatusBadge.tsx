export function StatusBadge({ available }: { available: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        available ? "bg-sage/20 text-sage-dark" : "bg-sand text-muted"
      }`}
    >
      {available ? "Disponible" : "No disponible"}
    </span>
  );
}
