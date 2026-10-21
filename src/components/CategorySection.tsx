import { Baby, Gift as GiftIcon, Moon, Shirt, Sparkles, type LucideIcon } from "lucide-react";
import type { Category, Gift } from "@/types/gift";
import { GiftCard } from "./GiftCard";
import { ContributionCard } from "./ContributionCard";

const icons: Record<string, LucideIcon> = {
  ropita: Shirt,
  cuidado: Moon,
  paseo: Baby,
  especiales: Sparkles,
};

interface Props {
  category: Category;
  myGifts: Record<string, number>;
  onChoose: (gift: Gift) => void;
}

export function CategorySection({ category, myGifts, onChoose }: Props) {
  const Icon = icons[category.id] ?? GiftIcon;
  return (
    <section id={category.id} className="scroll-mt-20 pt-8">
      <div className="mb-4 flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-forest">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold text-forest">{category.title}</h2>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {category.gifts.map((g) => (
          <GiftCard key={g.id} gift={g} mine={myGifts[g.id] ?? 0} onChoose={onChoose} />
        ))}
        {category.contribution && <ContributionCard contribution={category.contribution} />}
      </div>
    </section>
  );
}
