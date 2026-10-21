interface Props { required: number; selected: number; available: number }

export function QuantityStats({ required, selected, available }: Props) {
  const items = [
    { label: "Requerida", value: required },
    { label: "Seleccionada", value: selected },
    { label: "Disponible", value: available },
  ];
  return (
    <dl className="grid grid-cols-3 gap-2 rounded-xl bg-cream p-3 text-center">
      {items.map((it) => (
        <div key={it.label}>
          <dd className="font-display text-xl font-semibold">{it.value}</dd>
          <dt className="text-[11px] uppercase tracking-wide text-muted">{it.label}</dt>
        </div>
      ))}
    </dl>
  );
}
