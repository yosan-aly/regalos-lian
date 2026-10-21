import type { EventInfo } from "@/types/gift";
import dinoBg from "@/assets/dino-bg.webp";

export function Hero({ info }: { info: EventInfo }) {
  return (
    <header className="relative overflow-hidden">
      <img src={dinoBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      <div className="relative mx-auto max-w-xl px-6 pt-72 pb-10 text-center sm:pt-96">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{info.dateLabel}</p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-forest">
          Los regalos de {info.babyName}
        </h1>
      </div>
    </header>
  );
}
