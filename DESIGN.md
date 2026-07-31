# V-Cut Salon — Design System

A design spec for the V-Cut Salon website (`vcutsalon.in`). Paste this file into
Google **Stitch** (or any AI design tool) as the design brief so generated
screens match the live site. It describes an **Apple-inspired** system: lots of
white space, SF typography, soft neutral surfaces, and the brand **red as the
single accent**, with a full **light + dark** theme.

---

## 1. Brand

- **Name:** V-Cut Salon — "V-Cut Unisex Salon"
- **Positioning:** Bangalore's most trusted salon chain. 15 branches, since 2016.
- **Credibility:** Official **L'Oréal Professionnel** partner.
- **Voice:** Premium but friendly, confident, uncluttered. Never loud.
- **Logo:** A red rounded-square mark containing a white "V" formed of angular
  strokes (two mirrored slashes + a small chevron), beside the wordmark
  "V-Cut" with the sub-label "UNISEX SALON" in wide-tracked caps.

## 2. Design principles (Apple-inspired)

1. **White space first.** Generous padding; let sections breathe. Big, calm heroes.
2. **One accent.** Neutral canvas (white / near-black) + brand red used sparingly
   for CTAs, active states, prices, and the logo. Never large red fields on white.
3. **SF typography.** System font stack; large, tight-tracked headings; muted grey
   sub-text.
4. **Soft, neutral depth.** Subtle shadows and hairline borders — no coloured glows.
5. **Pill everything.** Buttons, chips, and tags are fully-rounded pills.
6. **Two themes, one system.** Everything is a token; light is default, dark is a
   true-black canvas. A ☾/☀ toggle sits in the nav.

## 3. Colour tokens

Design as CSS custom properties. **Light is the default; dark overrides only the
values.** Brand red is the accent in both, brightened in dark for contrast.

### Light (default)
| Token | Value | Use |
|---|---|---|
| `--p`   | `#CC1111` | Accent / brand red — CTAs, active, prices, links |
| `--pd`  | `#A30D0D` | Accent hover (darker) |
| `--pc`  | `#FBE9E9` | Accent tint — selected chips, soft highlight bg |
| `--opc` | `#8A0A0A` | Text on accent tint |
| `--s`   | `#FFFFFF` | Page surface (white) |
| `--sv`  | `#F5F5F7` | Surface variant — grey sections, input fills |
| `--os`  | `#1D1D1F` | Primary text (near-black) |
| `--osv` | `#6E6E73` | Secondary text (grey) |
| `--ol`  | `#86868B` | Outline / placeholder |
| `--olv` | `#D2D2D7` | Hairline borders / dividers |
| `--card`| `#FFFFFF` | Card & elevated surfaces |
| `--nav` | `rgba(255,255,255,.72)` | Frosted nav bar (blur behind) |
| `--panel` | `linear-gradient(165deg,#D11414,#A80E0E)` | Full-bleed header/CTA panels |
| `--thead` | `#1D1D1F` | Price-table header row |

### Dark (`[data-theme="dark"]`)
| Token | Value |
|---|---|
| `--p`   | `#FF453A` |
| `--pd`  | `#FF6961` |
| `--pc`  | `rgba(255,69,58,.16)` |
| `--opc` | `#FF8A80` |
| `--s`   | `#000000` |
| `--sv`  | `#141416` |
| `--os`  | `#F5F5F7` |
| `--osv` | `#A1A1A6` |
| `--ol`  | `#8E8E93` |
| `--olv` | `#38383B` |
| `--card`| `#1C1C1E` |
| `--nav` | `rgba(22,22,23,.72)` |
| `--panel` | `linear-gradient(180deg,#241417,#0C0709)` (deep oxblood → black) |
| `--thead` | `#2C2C2E` |

**Semantic colours** (kept in both themes): "Men's" tag `#E8F0FE` bg / `#1A4899`
text; WhatsApp green `#25D366`; note callout amber `#FFFDE7`/`#F9A825`.

## 4. Typography

- **Font:** `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
  "Helvetica Neue", Arial, sans-serif`. (No web-font download.)
- **Display/headings:** weight **600**, letter-spacing **-0.022em**, `text-wrap: balance`.
- **Accent word** in headings is set in the brand red (`--p`), same weight.
- **Body:** weight 400, line-height ~1.7, secondary text in `--osv`.
- **Eyebrows / labels:** 11px, weight 700, uppercase, letter-spacing ~1.5–2.5px, red.

**Scale (fluid):**
| Role | Size |
|---|---|
| Hero H1 | `clamp(2.2rem, 6vw, 4.5rem)` |
| Section title | `clamp(1.8rem, 3.5vw, 2.8rem)` |
| Panel H1 (booking/menu) | `clamp(1.8rem, 4vw, 2.6rem)` |
| Card title | ~1.1rem / 600 |
| Body | 0.9–1.1rem |
| Caption / label | 0.7–0.82rem |

## 5. Shape, spacing, elevation

- **Radii:** `--r: 18px` (cards), `--rsm: 12px` (inputs, small), `--rf: 980px` (pills).
- **Section padding:** ~88px vertical desktop, ~64px mobile; content `max-width: 1200px`.
- **Shadows (neutral, soft):**
  - `--e1: 0 1px 2px rgba(0,0,0,.04), 0 1px 3px rgba(0,0,0,.05)`
  - `--e2: 0 4px 14px rgba(0,0,0,.06), 0 2px 6px rgba(0,0,0,.04)`
  - `--e3: 0 12px 34px rgba(0,0,0,.10), 0 4px 12px rgba(0,0,0,.06)`
- **Motion:** gentle fade-up on scroll (opacity + 24px rise, .6s ease); hover lifts of
  1–2px; respect `prefers-reduced-motion`.

## 6. Components

- **Nav:** fixed, 68px, frosted (`backdrop-filter: blur`) `--nav` bg, hairline bottom
  border. Left: logo mark + wordmark. Center: text links (active = red pill). Right:
  circular **theme toggle** (☾ light / ☀ dark) + red **"Book Now"** pill. Mobile:
  hamburger → slide-down drawer.
- **Buttons / pills** (all `--rf` radius):
  - *Filled:* `--p` bg, white text — primary CTA.
  - *Tonal:* `--pc` bg, `--opc` text.
  - *Outlined:* transparent, `--olv` border, red text.
  - On red panels, filled buttons invert to white bg + red text.
- **Cards:** `--card` bg, `--olv` 1px border, `--r` radius, `--e1` shadow; hover →
  `--e3` + 5px lift + red border. Icon, title (600), muted description, red price.
- **Chips / filters:** pill, `--olv` border; active = `--p` bg + white.
- **Inputs:** `--sv` fill, `--olv` border, `--rsm` radius; focus = red border + soft
  red ring (`0 0 0 3px rgba(204,17,17,.1)`).
- **Booking stepper:** 4 steps (Details → Branch → Services → Confirm); active step red
  underline + red numbered circle; done = red check.
- **Price tables:** dark header row (`--thead`, white caps labels); white rows,
  hover tint; prices in red, right/centre aligned.
- **Full-bleed panels** (booking header, menu header, home CTA): `--panel` background,
  white text — brand red in light, deep dark in dark mode.
- **Footer:** near-black (`#1A0F0F`), red brand name + section headings, muted links.
- **Floating WhatsApp button:** green (`#25D366`) rounded square, bottom-right, gentle float.

## 7. Pages

1. **Home:** hero (eyebrow badge → big headline with red accent word → sub → 3 CTAs →
   4-stat bar) · About (stat grid + feature checklist) · Services (filter chips + card
   grid + L'Oréal banner) · Locations (type filter + branch cards with Directions/Call/
   Book) · red CTA panel · footer.
2. **Booking:** red/dark panel header → white form card with 4-step stepper; branch
   picker, date + time-slot grid, searchable service list with live running total,
   summary + confirm (→ WhatsApp confirmation).
3. **Menu:** Unisex ⇄ Men's toggle; categorised price tables, price cards, package
   cards with S/M/L pricing.

## 8. Real content (use verbatim, don't invent prices)

- **15 branches** across Bangalore (Akshayanagar, Hulimavu, Arekere, JP Nagar,
  Banashankari, Yelahanka, Harlur, Marathahalli, DLF, HSR Layout, Jayanagar, …),
  tagged **Unisex** (5) or **Men's** (10). Timings 8–9:30 / 9–9. Phone 9836577807.
- **Services** span Hair (cut/colour/keratin/spa), Skin (facials/waxing/threading),
  Nails, Men's grooming, and Bridal makeup. Examples: Gents haircut ₹150, Ladies
  ₹400; Balayage ₹2,999; Keratin from ₹3,499; Korean Glass Skin Facial ₹1,000;
  Bridal Makeup ₹10,000+.
- Brands referenced: L'Oréal Professionnel (INOA, Masirel), Schwarzkopf, O3+, VLCC,
  Lotus, Shahnaz Husain.

---

*Everything above is token-driven — change a token, the whole site (both themes)
follows. Feed this spec to Stitch to generate on-brand screens; keep the accent as
the only saturated colour and let white space carry the layout.*
