# 🗓️ Interactive Wall Calendar

A polished, feature-rich interactive wall calendar component built with **Next.js 14** and **Vanilla CSS Modules**. Inspired by the aesthetic of physical wall calendars, this component blends stunning visuals with powerful scheduling functionality.

---

## ✨ Features

### Core
- **Wall Calendar Aesthetic** — Physical wall calendar design with metal ring-binding visuals at the top, a prominent hero image panel (left on desktop, top on mobile), and a clean date grid
- **Day Range Selector** — Click to set a start date, click again to set an end date. Clear visual states: start (green circle), end (yellow circle), in-between (colored band), today (accent ring), and hover
- **Integrated Notes** — Tabbed notes panel with **Month Notes** (freeform memo per month) and **Range Notes** (linked to your selected date range). All notes auto-saved to `localStorage`
- **Fully Responsive** — Side-by-side layout on desktop (≥ 768px), gracefully stacked vertically on mobile with full touch usability

### Creative Extras ✨
- **Page-flip Animation** — Smooth slide transition when navigating between months
- **Per-Month Themes** — Each month has a unique color palette that recolors the entire UI (primary, accent, range colors)
- **12 AI-Generated Hero Images** — Unique cinematic landscape photography for every month
- **Parallax Hero Image** — Subtle mouse-tracking parallax effect on the hero image
- **Holiday Markers** — US public holidays (2024–2027) marked with accent dots on day cells, with tooltip on hover/focus
- **Keyboard Navigation** — Full arrow-key navigation within the calendar grid (↑ ↓ ← →)
- **Accessibility** — ARIA roles, labels, aria-pressed, aria-selected, live regions for save state

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Running Locally

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Architecture

```
wall-calendar/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Entry point
│   └── globals.css         # Design tokens, CSS variables, animations
│
├── components/
│   ├── CalendarApp/        # Root orchestrator — all state lives here
│   ├── CalendarHeader/     # Month/year display + prev/next navigation
│   ├── CalendarGrid/       # 7x6 day grid + range state computation
│   │   └── DayCell.tsx     # Individual day cell with all visual states
│   ├── HeroImage/          # Month hero image with parallax
│   └── NotesPanel/         # Tabbed notes: monthly + range
│
├── data/
│   ├── holidays.ts         # US public holidays 2024-2027 (static)
│   └── monthThemes.ts      # Per-month color palettes + image paths
│
└── public/
    ├── month-01.png        # January hero image
    └── ... (12 total)
```

---

## 🎨 Design Decisions

| Decision | Rationale |
|---|---|
| CSS Modules + CSS Variables | Maximum control, scoped styles, dynamic theming without runtime cost |
| No external UI library | Demonstrates raw CSS mastery as requested |
| localStorage persistence | Strictly frontend — no backend needed |
| Per-month themes | Enhances the "wall calendar" feel; each month feels distinct |
| Static holiday data | No API dependency, works offline, easy to extend |
| useMemo for grid cells | Avoids recomputing the 42-cell grid on every keystroke |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS Modules + CSS Custom Properties
- **Fonts**: Playfair Display (serif), Inter (sans-serif), DM Mono
- **Persistence**: localStorage
- **Images**: Next.js Image with WebP/AVIF optimization
