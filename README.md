# Los regalos de Lian · React

Migración del prototipo visual (babyshowerlian.lovable.app) a un proyecto React propio.

## Stack
- **React 18 + TypeScript**
- **Vite 5** (bundler / dev server)
- **Tailwind CSS v4** (plugin `@tailwindcss/vite`, tema en `src/index.css`)
- Fuentes: Fraunces (títulos) y Nunito (texto) desde Google Fonts
- Íconos: lucide-react

## Arranque
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist para desplegar (Vercel, Netlify, etc.)
```

## Estructura
```
src/
├── main.tsx                 # Punto de entrada, monta <App/>
├── App.tsx                  # Composición de la página
├── index.css                # Tailwind + paleta y fuentes (@theme)
├── types/gift.ts            # Modelos: Gift, Category, Contribution, EventInfo
├── data/
│   ├── event.ts             # Nombre, fecha y textos
│   └── categories.ts        # Las 4 categorías y sus regalos
├── lib/gifts.ts             # Lógica: disponible = requerida − seleccionada
├── assets/dino-bg.webp      # Fondo acuarela del hero
└── components/
    ├── Hero.tsx             # Fondo, fecha y título
    ├── IntroCard.tsx        # Tarjeta de bienvenida
    ├── CategoryNav.tsx      # Menú fijo con anclas #ropita, #cuidado…
    ├── CategorySection.tsx  # Ícono, título y tarjetas de la categoría
    ├── GiftCard.tsx         # Tarjeta de regalo
    ├── StatusBadge.tsx      # Disponible / No disponible
    ├── QuantityStats.tsx    # Requerida · Seleccionada · Disponible
    ├── ContributionCard.tsx # Tarjeta "Aporte para gastos" (opcional)
    └── ChangeNotice.tsx     # Aviso final: cambios por WhatsApp (informativo)
```

## Árbol de componentes
```
App
├── Hero
├── IntroCard
├── CategoryNav
├── CategorySection ×4
│   ├── GiftCard ×n
│   │   ├── StatusBadge
│   │   └── QuantityStats
│   └── ContributionCard (solo "especiales")
└── ChangeNotice
```

## Flujo de datos
Los datos viven en `src/data/` y bajan por props. El estado "Disponible" no se guarda:
se calcula en `lib/gifts.ts` a partir de `required` y `selected`, así nunca se desincroniza.

## Pendientes / siguientes pasos
1. **URL de la vista previa**: ajustar `og:image` en `index.html` con la URL final de Vercel.
3. **Elegir regalo real**: hoy los botones están deshabilitados. Para que los invitados reserven,
   conecta un backend (Supabase, Firebase o tu API) y reemplaza `data/categories.ts`
   por un hook `useGifts()` que lea y actualice `selected`.
