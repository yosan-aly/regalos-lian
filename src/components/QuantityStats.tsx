interface Props { required: number; selected: number; available: number }

export function QuantityStats({ required, selected, available }: Props) {
  const items = [
    { label: "Requerida", value: required, highlight: false },
    { label: "Seleccionada", value: selected, highlight: false },
    { label: "Disponible", value: available, highlight: available > 0 },
  ];
  return (
    <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
      {items.map((it) => (
        // dt antes de dd (HTML válido); flex-col-reverse muestra el número arriba
        <div key={it.label} className={`flex flex-col-reverse rounded-xl py-2 ${it.highlight ? "bg-secondary" : "bg-muted"}`}>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{it.label}</dt>
          <dd className="text-xl font-bold text-forest">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
