# Frontend - Bus Ticket Booking System

React frontend for user booking, seat selection, payments flow, and admin management screens.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Zustand
- Axios
- React Router

## Getting Started

1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start dev server:
   ```bash
   pnpm dev
   ```
4. Open: `http://localhost:5173`

## Environment Variables

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
```

## Development / Coding

- Keep domain calls in `src/api/services/` and avoid direct API calls inside UI components.
- Keep shared state in Zustand stores under `src/store/` and expose actions through hooks.
- Use strong TypeScript contracts for API responses and store types; avoid `any`.
- Build UI with shadcn tokens from `src/index.css` (`primary`, `muted`, `foreground`, `border`) for theme consistency.
- Keep components focused and reusable (`components/`, `pages/`, `hooks/` separation).
- Run lint before commits and keep imports/unused variables clean.

## Available Scripts

```bash
pnpm dev
pnpm lint
pnpm build
pnpm preview
```

## Project Structure

- `src/components/` reusable UI and feature components
- `src/pages/` route-level pages
- `src/routes/` router configuration and guards
- `src/api/` axios client, endpoints, services
- `src/store/` Zustand state stores
- `src/hooks/` custom hooks

## Notes

- If TypeScript build fails, check `tsconfig.app.json` compatibility with the installed TypeScript version.
