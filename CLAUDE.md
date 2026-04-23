# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Lempira** — a free pricing calculator for Honduran entrepreneurs, built by CFV Technology and offered to the community. Astro static site for calculating retail and wholesale prices in Honduran Lempiras (HNL). Includes full SEO (Open Graph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt).

- **Product name**: Lempira
- **Publisher / creator**: CFV Technology (attribution only, not product name)
- **Domain**: https://lempira.cfv.technology

## Commands

```bash
npm run dev       # Start dev server on localhost:4321
npm run build     # Build static site to dist/
npm run preview   # Preview production build
npx astro check   # TypeScript type checking
```

## Architecture

```
src/
├── layouts/Layout.astro    # Base HTML layout with SEO meta tags (OG, Twitter, JSON-LD)
├── pages/index.astro       # Calculator page — imports layout, CSS, and mounts JS
├── styles/global.css       # All CSS (custom properties, glassmorphism, responsive grid)
└── scripts/calculator.ts   # Vanilla TS — pricing logic, theme toggle, clipboard
public/
├── favicon.svg             # CFV branded favicon
└── robots.txt              # Crawl rules + sitemap reference
```

Astro config (`astro.config.mjs`): site URL set to `https://lempira.cfv.technology`, `@astrojs/sitemap` integration enabled.

## Calculation Logic

All functions live in `src/scripts/calculator.ts` and are exposed to `window` for inline `oninput`/`onclick` handlers.

**Retail**: `cost → +profit% → +marketing% → +otherCosts% → subtotal → +IVA% → +bankFee% → final`

**Wholesale**: `subtotal → -wholesaleDiscount% → wholesaleSub → +IVA% → +bankFee% → final`

Percentages are applied to COST (profit, marketing, other), except IVA (applied to subtotal) and bank fee (applied to subtotal+IVA). Net margin = `netProfit / finalPrice * 100`.

### Defaults (Honduras market)

Profit 100%, IVA 15%, bank fee (comisión bancaria) 4.5%, marketing 10%, other costs 0%, wholesale discount 30%. Cost example value: 333.

**Source of truth**: `src/components/InputCard.astro` (the `<InputField value={…}>` attributes). If you change a default, update this section too.

## Conventions

- **Language**: All UI text in Spanish (Honduras). Locale `es-HN` for number formatting
- **Currency**: Lempiras (HNL), prefixed with `L`, always 2 decimals
- **Element IDs**: `br-*` for retail breakdown, `wh-*` for wholesale breakdown
- **Theming**: Dark/light via `data-theme` attribute on `<body>`, CSS custom properties `--cfv-*`, persisted in `localStorage` key `cfv-theme`
- **No framework JS**: Calculator is vanilla TypeScript, no React/Vue/Svelte needed
- **SEO**: Layout handles all meta tags via props (`title`, `description`, `canonical`, `ogImage`)
- **Components are MANDATORY**: Every UI element MUST be an Astro component in `src/components/`. Never hardcode UI (toggles, buttons, inputs, tooltips) inline inside other components. If it doesn't exist as a component, create it first. Existing components: `InputField`, `Card`, `ToggleSwitch`, `Tooltip`, `BreakdownRow`, `MarginIndicator`, `ShareButton`
