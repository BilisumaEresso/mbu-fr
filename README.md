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

## Deploying to cPanel

This is a static React Single Page Application (SPA). On traditional shared hosting (such as cPanel running Apache), the application must be built locally or via CI, and only the compiled assets are uploaded.

### Step 1: Set Production Environment Variables
Vite bakes variables prefixed with `VITE_` directly into the bundled JavaScript at build time. Before building, create or update `.env.production` (or `.env`) with the live endpoints:

```env
VITE_BUYERS_FORM_ENDPOINT=https://formspree.io/f/YOUR_BUYERS_FORM_ID
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/YOUR_CONTACT_FORM_ID
```

### Step 2: Build the Production Bundle
```bash
npm run build
```
This generates the optimized production bundle inside the `dist/` folder.

### Step 3: Upload Contents to `public_html`
1. Open cPanel **File Manager** (or connect via FTP / SFTP).
2. Navigate into the document root for your domain (typically `public_html/`).
3. Upload **all files and folders from inside `dist/`** directly into `public_html/` (do **not** upload the `dist/` folder itself).
4. **Ensure `.htaccess` is uploaded**: In cPanel File Manager, click **Settings** (top right) and check **"Show Hidden Files (dotfiles)"**. Confirm that `.htaccess` is present in `public_html/`.

> **What `.htaccess` does:**  
> - **SPA Routing (`mod_rewrite`)**: Rewrites all non-file/non-directory requests (e.g. `/en/products`, `/om/about`) to `/index.html`, allowing React Router to handle page navigation without 404 errors on browser reload.  
> - **Asset Caching (`mod_expires`)**: Caches versioned images, scripts, and stylesheets for 1 month to 1 year, while ensuring `index.html` is never cached (`0 seconds`) so users always receive instant site updates.  
> - **Gzip Compression (`mod_deflate`)**: Automatically compresses HTML, CSS, JS, JSON, and SVG for fast page loads.

