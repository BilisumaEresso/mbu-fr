---
name: Agri-Heritage Editorial
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#424844'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#727973'
  outline-variant: '#c2c8c2'
  surface-tint: '#496455'
  primary: '#173124'
  on-primary: '#ffffff'
  primary-container: '#2d4739'
  on-primary-container: '#98b5a3'
  inverse-primary: '#b0cdbb'
  secondary: '#9d4320'
  on-secondary: '#ffffff'
  secondary-container: '#fd8c63'
  on-secondary-container: '#742503'
  tertiary: '#2b2c2a'
  on-tertiary: '#ffffff'
  tertiary-container: '#414240'
  on-tertiary-container: '#aeaeac'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ccead6'
  primary-fixed-dim: '#b0cdbb'
  on-primary-fixed: '#062014'
  on-primary-fixed-variant: '#324c3e'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59b'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#7e2c0a'
  tertiary-fixed: '#e3e2e0'
  tertiary-fixed-dim: '#c7c6c4'
  on-tertiary-fixed: '#1a1c1a'
  on-tertiary-fixed-variant: '#464745'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.8'
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.08em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built for a professional, institutional presence that honors Ethiopian agricultural heritage with a contemporary editorial lens. The brand personality is **authoritative, grounded, and transparent**, reflecting the union's status as a certified global exporter.

The visual style blends **Corporate Modernism** with **Editorial Minimalism**. It avoids the flighty aesthetics of typical tech products in favor of stability and physical presence. The interface should feel like a high-end annual report: structured, spacious, and deliberate. High-quality photography of soil, crops, and cooperative members should take center stage, supported by a rigid but asymmetric layout that feels sophisticated yet accessible to global partners and local stakeholders.

## Colors

The palette is derived from the Ethiopian landscape—deep foliage and rich volcanic soil.

*   **Primary (Leaf Green):** Used for headers, primary navigation, and institutional weight. It signifies growth and GlobalG.A.P certification standards.
*   **Secondary (Terracotta):** Reserved strictly for primary calls to action or critical highlights. It represents the earth and provides a high-contrast focal point against the green.
*   **Background (Warm Cream):** Replaces pure white to reduce eye strain and provide a more organic, paper-like quality to the interface.
*   **Text (Deep Charcoal):** Used for all primary communication to ensure maximum legibility and a serious tone.

Avoid any use of gradients or artificial glows. All colors must remain flat and solid to maintain the "grounded" institutional feel.

## Typography

Typography follows an editorial hierarchy. **Inter** provides a clean, neutral structure for headings, which must always be set in **sentence case** to maintain a humble, professional tone. 

**Source Sans 3** is used for body copy, chosen for its exceptional legibility in data-heavy or long-form agricultural reports. We utilize a generous line-height (1.6 to 1.8) to create an "airy" feel that prevents the content from feeling cramped or overly technical. 

**JetBrains Mono** is introduced sparingly for labels, data points, and technical certifications (like GlobalG.A.P codes) to evoke a sense of precision and industrial tracking.

## Layout & Spacing

The layout utilizes an **asymmetric editorial grid**. On desktop, content should favor an "off-balance" composition—for example, a 12-column grid where the main text occupies columns 3 through 10, leaving wide margins for captions or pull-quotes.

*   **Rhythm:** Use an 8px base unit for all spatial relationships.
*   **Whitespace:** Prioritize vertical breathing room between sections (minimum 80px - 120px on desktop) to signify confidence.
*   **Adaptivity:** On mobile, revert to a standard single-column flow with 16px side margins, but maintain the large vertical padding between content blocks.

## Elevation & Depth

This system avoids traditional drop shadows to maintain its "grounded" philosophy. Depth is achieved through **Tonal Layering** and **Subtle Outlines**:

*   **Flat Surfaces:** Elements sit directly on the Warm Cream background.
*   **Low-Contrast Outlines:** Use 1px borders in a darkened version of the background color (or Primary Green at 10% opacity) to define cards and input areas.
*   **Zero Shadows:** Do not use shadows to indicate elevation. Instead, use a slight color shift (e.g., from Warm Cream to a slightly darker stone tone) to indicate hover states or nested containers.

## Shapes

The shape language is structured and professional. We use **Soft (Level 1)** roundedness to take the edge off the institutional feel without becoming "bubbly." 

*   **Standard Elements:** 4px to 8px corner radius for buttons and input fields.
*   **Cards/Large Containers:** 12px corner radius.
*   **Images:** Should remain sharp (0px) or use the same 8px radius to feel like physical printed photographs.

## Components

### Buttons
Primary buttons use the **Terracotta** (#C05D38) background with white text for maximum visibility on calls to action. Secondary buttons use the **Leaf Green** (#2D4739) or a simple 1px outline. All buttons use 8px rounded corners and Medium weight typography.

### Input Fields
Fields are styled with a 1px solid border in a muted charcoal. Labeling uses the **JetBrains Mono** label style above the field. Focus states should use a simple 2px Leaf Green border—no outer glows.

### Cards
Cards are defined by their 1px subtle borders rather than shadows. They should have generous internal padding (32px+) to maintain the editorial feel.

### Lists & Data
Data tables should be minimalist, using horizontal dividers only. Header rows should use the `label-caps` typography style to clearly distinguish metadata from content.

### Additional Components
*   **Certification Badges:** Clean, monochromatic versions of GlobalG.A.P or Organic logos, presented in a row with uniform height.
*   **Impact Metrics:** Large `headline-xl` numbers with `label-caps` descriptions below them, used to highlight "50,000+ Tonnes" or "140+ Cooperatives."