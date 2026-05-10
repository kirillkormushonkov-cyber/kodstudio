<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Decorative mockups inside cards

Никогда не размещай декоративные mockup-окошки (browser, chat, phone и подобные) как `absolute` поверх текстовой области карточки. Они визуально наезжают на контент при изменении ширины. Вместо этого:

1. Используй CSS Grid внутри `<article>`: одна колонка для текста, отдельная — для декора (`grid-cols-1 lg:grid-cols-[minmax(0,1fr)_<fixed>]`).
2. Скрывай декор-колонку до того breakpoint, где она реально помещается рядом с текстом (`<div className="hidden lg:block">`).
3. Если карточка узкая (1/3 grid и меньше) — декор туда не клади, текст съест колонку.
4. Сам mockup внутри своей grid-колонки может быть `absolute` (для смещения и rotate), но `pointer-events-none` обязателен.

Антипаттерн (приводит к наезду на текст):
```tsx
<article className="relative overflow-hidden p-8">
  <div className="max-w-md">{/* контент */}</div>
  <BrowserMockup className="absolute -right-8 -bottom-12 w-72" />
</article>
```
