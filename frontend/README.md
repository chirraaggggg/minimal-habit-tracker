# Habit Tracker Frontend

A polished GitHub-style habit tracker built with React + Vite. Talks to the
existing Express/PostgreSQL backend at `http://localhost:3000` through a Vite
dev-server proxy (no CORS issues, no backend changes needed).

## Run

```bash
# 1. Make sure the backend is running on http://localhost:3000

# 2. Install and start the dev server
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`).

## Features

- Sidebar of habits with completion counts (select, edit, delete)
- GitHub-style contribution graph for the last year, with month/weekday labels,
  green intensity scale, legend, and hover tooltips
- Click an empty day to mark it complete; click again to undo (optimistic UI)
- Add/edit habits via a modal (name + emoji)
- Loading, error, and empty states

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint