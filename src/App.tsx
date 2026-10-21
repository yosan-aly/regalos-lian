import { categories } from "@/data/categories";
import { eventInfo } from "@/data/event";
import { Hero } from "@/components/Hero";
import { IntroCard } from "@/components/IntroCard";
import { CategoryNav } from "@/components/CategoryNav";
import { CategorySection } from "@/components/CategorySection";
import { WhatsAppFooter } from "@/components/WhatsAppFooter";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero info={eventInfo} />
      <main className="mx-auto max-w-xl px-4 pb-16">
        <IntroCard info={eventInfo} />
        <CategoryNav categories={categories} />
        {categories.map((c) => (
          <CategorySection key={c.id} category={c} />
        ))}
        <WhatsAppFooter url={eventInfo.whatsappUrl} />
      </main>
    </div>
  );
}
