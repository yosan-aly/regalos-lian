import type { Category } from "@/types/gift";
import { GiftCard } from "./GiftCard";
import { ContributionCard } from "./ContributionCard";

export function CategorySection({ category }: { category: Category }) {
  return (
    <section id={category.id} className="scroll-mt-20 pt-10">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{category.title}</h2>
      <p className="mt-1 text-muted">{category.description}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.gifts.map((g) => (
          <GiftCard key={g.id} gift={g} />
        ))}
        {category.contribution && <ContributionCard contribution={category.contribution} />}
      </div>
    </section>
  );
}
