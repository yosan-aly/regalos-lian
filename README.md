# Los regalos de Lian · React

Migración del prototipo visual (babyshowerlian.lovable.app) a un proyecto React propio.

## Stack
- **React 18 + TypeScript**
- **Vite 5** (bundler / dev server)
- **Tailwind CSS v4** (plugin `@tailwindcss/vite`, tema en `src/index.css`)
- Fuentes: Fredoka (títulos) y Nunito (texto) desde Google Fonts

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
│   ├── event.ts             # Nombre, fecha, textos, enlace WhatsApp
│   └── categories.ts        # Las 4 categorías y sus regalos
├── lib/gifts.ts             # Lógica: disponible = requerida − seleccionada
├── assets/dino-bg.png       # Fondo del hero (reemplazar por el original)
└── components/
    ├── PrototypeBanner.tsx  # Franja "Prototipo visual"
    ├── Hero.tsx             # Encabezado con fecha, título e intro
    ├── CategoryNav.tsx      # Menú fijo con anclas #ropita, #cuidado…
    ├── CategorySection.tsx  # Título + grilla de tarjetas por categoría
    ├── GiftCard.tsx         # Tarjeta de regalo
    ├── StatusBadge.tsx      # Disponible / No disponible
    ├── QuantityStats.tsx    # Requerida · Seleccionada · Disponible
    ├── ContributionCard.tsx # Tarjeta "Aporte para gastos" (opcional)
    └── WhatsAppFooter.tsx   # Pie con botón de WhatsApp
```

## Árbol de componentes
```
App
├── PrototypeBanner
├── Hero
├── CategoryNav
├── CategorySection ×4
│   ├── GiftCard ×n
│   │   ├── StatusBadge
│   │   └── QuantityStats
│   └── ContributionCard (solo "especiales")
└── WhatsAppFooter
```

## Flujo de datos
Los datos viven en `src/data/` y bajan por props. El estado "Disponible" no se guarda:
se calcula en `lib/gifts.ts` a partir de `required` y `selected`, así nunca se desincroniza.

## Pendientes / siguientes pasos
1. **Imagen del dinosaurio**: descarga el `dino-bg.png` original del sitio y reemplaza `src/assets/dino-bg.png` (el actual es un marcador).
2. **WhatsApp**: pon el enlace en `data/event.ts` → `whatsappUrl: "https://wa.me/57XXXXXXXXXX?text=..."`.
3. **Elegir regalo real**: hoy los botones están deshabilitados. Para que los invitados reserven,
   conecta un backend (Supabase, Firebase o tu API) y reemplaza `data/categories.ts`
   por un hook `useGifts()` que lea y actualice `selected`.
4. **Paleta**: los colores en `index.css` son aproximados; ajústalos a los del diseño original.
