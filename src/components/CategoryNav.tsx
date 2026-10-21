import type { Category } from "@/types/gift";

export function CategoryNav({ categories }: { categories: Category[] }) {
  return (
    <nav className="sticky top-0 z-10 -mx-4 mt-8 flex gap-2 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur">
      {categories.map((c, i) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className="shrink-0 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-forest hover:bg-secondary"
        >
          {i + 1}. {c.title}
        </a>
      ))}
    </nav>
  );
}
