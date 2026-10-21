import { categories } from "@/data/categories";
import { eventInfo } from "@/data/event";
import { PrototypeBanner } from "@/components/PrototypeBanner";
import { Hero } from "@/components/Hero";
import { CategoryNav } from "@/components/CategoryNav";
import { CategorySection } from "@/components/CategorySection";
import { WhatsAppFooter } from "@/components/WhatsAppFooter";

export default function App() {
  return (
    <>
      <PrototypeBanner />
      <Hero info={eventInfo} />
      <CategoryNav categories={categories} />
      <main className="mx-auto max-w-5xl px-4 pb-16 space-y-16">
        {categories.map((c) => (
          <CategorySection key={c.id} category={c} />
        ))}
      </main>
      <WhatsAppFooter url={eventInfo.whatsappUrl} />
    </>
  );
}
