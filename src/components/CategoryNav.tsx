import type { Category } from "@/types/gift";

export function CategoryNav({ categories }: { categories: Category[] }) {
  return (
    <nav className="sticky top-0 z-10 border-b border-sand bg-cream/90 backdrop-blur">
      <ul className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3">
        {categories.map((c, i) => (
          <li key={c.id} className="shrink-0">
            <a
              href={`#${c.id}`}
              className="block rounded-full border border-sand bg-white px-4 py-2 text-sm font-semibold hover:border-sage hover:text-sage-dark"
            >
              {i + 1}. {c.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
