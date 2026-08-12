# Meki Batu Union — Website

Static frontend for the Meki Batu Fruits and Vegetables Growers' Cooperative
Union Ltd. Built with **React + Vite** and **plain CSS** (no framework, no
CSS-in-JS). Backend (member portal, RFQ system, CMS) is a Phase 2 addition —
see notes at the bottom.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Project structure

```
meki-batu-union/
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/                     # static assets served as-is (favicon, etc.)
├─ src/
│  ├─ main.jsx                 # app entry point, router setup
│  ├─ App.jsx                  # route definitions
│  │
│  ├─ styles/
│  │  ├─ variables.css         # design tokens: colors, type, spacing, radius
│  │  └─ global.css            # base element styles, layout helpers
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.jsx / .css  # site header + nav
│  │  │  └─ Footer.jsx / .css  # site footer
│  │  └─ common/               # small reusable pieces, each with its own .css
│  │     ├─ Button.jsx
│  │     ├─ StatCard.jsx
│  │     ├─ ProductCard.jsx
│  │     └─ PageHero.jsx
│  │
│  ├─ pages/                   # one file per route
│  │  ├─ Home.jsx / .css
│  │  ├─ About.jsx
│  │  ├─ Products.jsx
│  │  ├─ Farmers.jsx
│  │  ├─ Buyers.jsx            # includes the Request-a-Quote form
│  │  ├─ RetailOutlets.jsx
│  │  ├─ News.jsx
│  │  ├─ Impact.jsx
│  │  ├─ Contact.jsx
│  │  ├─ NotFound.jsx
│  │  └─ InnerPage.css         # shared styles reused across interior pages
│  │
│  └─ data/                    # static content, structured to mirror future
│     │                        # MongoDB collections — swap for fetch() calls later
│     ├─ products.js
│     ├─ outlets.js
│     └─ news.js
│
└─ dist/                       # production build output (generated)
```

## Styling approach

Plain CSS, organized as:
- **`styles/variables.css`** — every color, font, spacing value, and radius
  used on the site lives here as a CSS custom property. Change the palette
  or type scale in one place.
- **`styles/global.css`** — resets, base element styles, and shared layout
  utility classes (`.container`, `.section`, `.section--alt`, `.eyebrow`,
  `.img-placeholder`, etc.)
- **Component/page-level `.css` files** — each component or page imports
  its own stylesheet with scoped class names (BEM-ish: `.block__element`,
  `.block--modifier`). No global class name collisions in practice because
  every class is prefixed by its component.

## Images

Every photo on the site is currently an **`.img-placeholder`** div labelled
`REPLACE WITH REAL PHOTO — [description]`. Before launch, replace these with
real photography of the union's farms, produce, packhouses, staff, and
retail outlets — no stock or AI-generated imagery.

## Content

Product, outlet, and news content lives in `src/data/*.js` as plain arrays —
easy to hand-edit now, and structured so it maps cleanly onto future MongoDB
collections (`products`, `outlets`, `news`) once the backend exists.

## Phase 2 — backend integration (not built yet)

When the MERN backend is ready:
- Replace the static imports in `src/data/*.js` with `fetch()` calls to the
  Express API (e.g. `GET /api/products`, `GET /api/news`).
- Wire the Buyers RFQ form (`src/pages/Buyers.jsx`) and Contact form
  (`src/pages/Contact.jsx`) to `POST` to the API instead of just toggling
  local state.
- Add authenticated routes for the member portal (the "Member login" button
  in `Header.jsx` and the "coming soon" card on `Farmers.jsx` are the two
  stub points to wire up).
- Add an `.env` file for the API base URL, e.g. `VITE_API_URL=https://api.mekibatuunion.org`.
