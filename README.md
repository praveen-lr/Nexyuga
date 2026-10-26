# Nexyuga Innovations — Website Redesign

A high-performance, accessible, and visually stunning web redesign for **Nexyuga Innovations**, styled directly following the **[Adorbit Framer Template](https://adorbit.framer.website/)** architecture and visual language.

---

## 🎨 Design System & Brand Identity

### 1. Brand Color Tokens (Clean White Theme)
| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--color-brand-blue` | `#0197B2` | Primary brand cyan/blue; glowing accents, links, and borders |
| `--color-brand-green` | `#5ACB2A` | Secondary tech green; high-contrast CTA buttons, active Braille dots |
| `--color-bg-page` | `#ffffff` | Crisp pure white canvas throughout the experience |
| `--color-bg-page-alt` | `#f6fafd` | Soft azure-tinted alternate surface for gentle visual pacing |
| `--color-bg-card` | `#ffffff` | Pure white card surfaces with subtle cyan elevation shadows |
| `--color-text-primary` | `#06191e` | Deep teal-black body typography with high WCAG AAA contrast |
| `--color-text-secondary` | `#0a2d36` | Headings and bold titles |
| `--color-border` | `rgba(1, 151, 178, 0.14)` | Subtle brand border lines |

### 2. Typography
- **Headings & Display**: `'Poppins', sans-serif` (`font-weight: 400` regular weight, tight letter-spacing `-0.03em`, line-height `1.15` as per exact Adorbit editorial spec)
- **Body & UI**: `'Inter', sans-serif` (Weights: `400`, `500`, `600`)

### 3. Signature Components & Micro-interactions
- **Framer-style Rolling Text Buttons (`.btn-rolling`)**: Dual-stacked text that rolls upwards smoothly on hover.
- **Adorbit Signature App Bar (`.site-appbar`)**: Full-width top bar featuring the brand logo on the left, an independent floating white pill capsule in the center holding navigation links, and a language selector pill (`🇬🇧 EN ⌵`) and pill CTA button on the right.
- **Interactive 6-Dot Braille Synthesizer**: Clickable Braille dots that detect letters in real time and speak phonetics via the Web Speech & Audio API.
- **Impact Performance Bar Chart**: Animated multi-tier bar chart showing projected Braille literacy and adoption.
- **Bento Services Grid**: Asymmetric layout showcasing **Vithara** and **Knotnex**.
- **Visual Gallery**: High-resolution showcases using the provided photography:
  - `gallery_buddybook_presentation.png` (BuddyBook / Vithara demonstration)
  - `gallery_prototype_testing.png` (Tactile prototyping & audio module testing)
  - `gallery_iic_meet_2025_team.png` (Nexyuga Team at IIC Regional Meet 2025)
  - `gallery_iic_meet_2025_founder.png` (Founder Keynote at IIC Regional Meet 2025)
  - `logo-dark.png` & `logo-light.png` (Dual theme brand logos)

---

## 📁 Project Directory Structure

```
NexYugaa/
├── index.html               # Main production-ready landing page
├── css/
│   ├── tokens.css           # Brand color tokens, typography scales, shadows
│   ├── base.css             # CSS reset, font loader, section wrappers
│   ├── components.css       # Reusable components (buttons, badges, bento cards, Braille cell)
│   └── main.css             # Section layouts, bento grids, responsive breakpoints
├── js/
│   └── main.js              # Navbar scroll elevation, Braille audio engine, chart, drawer
├── assets/
│   ├── icons/               # 12 clean SVG icons
│   └── images/              # Provided field photography and brand logos
└── README.md                # Project documentation
```

---

## 🚀 Running the Project Locally

No build step required. Run using any static web server:

```bash
# Option 1: npx serve
npx -y serve .

# Option 2: Python HTTP Server
python -m http.server 3000
```
Open `http://localhost:3000` in your browser.
