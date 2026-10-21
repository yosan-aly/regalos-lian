import type { EventInfo } from "@/types/gift";
import dinoBg from "@/assets/dino-bg.png";

export function Hero({ info }: { info: EventInfo }) {
  return (
    <header className="relative overflow-hidden">
      <img src={dinoBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
        <span className="inline-block rounded-full bg-sage/20 px-4 py-1 text-sm font-semibold text-sage-dark">
          {info.dateLabel}
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">
          Los regalos de {info.babyName}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{info.intro}</p>
        <p className="mt-4 font-semibold text-sage-dark">{info.tagline}</p>
      </div>
    </header>
  );
}
