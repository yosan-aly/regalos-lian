import { Leaf } from "lucide-react";
import type { EventInfo } from "@/types/gift";

export function IntroCard({ info }: { info: EventInfo }) {
  return (
    <section className="rounded-3xl border bg-card/90 p-6 text-center shadow-soft">
      <Leaf className="mx-auto h-5 w-5 text-sage" aria-hidden />
      <p className="mt-3 text-base leading-relaxed">{info.intro}</p>
      <p className="mt-5 border-t border-gold/40 pt-5 font-display text-xl italic text-forest">{info.tagline}</p>
    </section>
  );
}
