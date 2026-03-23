# AGF-Gastro System

A modular restaurant and hospitality management system built with Node.js/Express (backend) and Next.js (frontend), both in TypeScript. It provides a clean foundation for managing a restaurant's **Speisekarte** (menu), **Bestellungen** (orders), and **Tische** (tables), and is designed to be easy to extend with new modules.

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Backend   | Node.js · Express · TypeScript · ts-node-dev    |
| Frontend  | Next.js 15 · React 18 · TypeScript              |
| Monorepo  | npm Workspaces                                  |

---

## Project Structure

```
gastro-system/
├── package.json              ← root workspace config & shared scripts
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example          ← copy to .env and adjust
│   └── src/
│       ├── index.ts          ← entry point (starts HTTP server)
│       ├── app.ts            ← Express app setup, middleware, route mounting
│       ├── modules/          ← one sub-folder per business domain
│       │   ├── menu/
│       │   │   ├── menu.types.ts
│       │   │   ├── menu.controller.ts
│       │   │   └── menu.router.ts
│       │   ├── orders/
│       │   │   ├── orders.types.ts
│       │   │   ├── orders.controller.ts
│       │   │   └── orders.router.ts
│       │   └── tables/
│       │       ├── tables.types.ts
│       │       ├── tables.controller.ts
│       │       └── tables.router.ts
│       └── shared/
│           └── types.ts      ← shared ApiResponse<T> wrapper
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    └── src/
        ├── app/              ← Next.js App Router pages
        │   ├── layout.tsx    ← root layout with nav bar
        │   ├── page.tsx      ← home page
        │   ├── menu/page.tsx
        │   ├── orders/page.tsx
        │   └── tables/page.tsx
        ├── modules/          ← React components per business domain
        │   ├── menu/MenuList.tsx
        │   ├── orders/OrderList.tsx
        │   └── tables/TableGrid.tsx
        └── shared/
            ├── api.ts        ← fetch helpers (fetchApi, postApi, patchApi)
            └── types.ts      ← shared TypeScript interfaces
```

---

## Prerequisites

- **Node.js ≥ 18** (includes npm ≥ 9 with workspace support)

---

## Getting Started

### 1. Install all dependencies

From the **repository root**, a single install resolves both workspaces:

```bash
npm install
```

### 2. Configure environment variables (backend)

```bash
cp backend/.env.example backend/.env
# Edit backend/.env if needed (default port: 4000)
```

### 3. Run the backend

```bash
# From the repo root:
npm run dev:backend

# Or directly:
cd backend && npm run dev
```

The API will be available at `http://localhost:4000`.

### 4. Run the frontend

```bash
# From the repo root:
npm run dev:frontend

# Or directly:
cd frontend && npm run dev
```

The UI will be available at `http://localhost:3000`.

---

## Available Scripts (root)

| Script              | Description                              |
|---------------------|------------------------------------------|
| `npm run dev:backend`  | Start backend in watch mode           |
| `npm run dev:frontend` | Start frontend dev server             |
| `npm run build`        | Build both backend and frontend       |
| `npm run build:backend`| Compile TypeScript → `backend/dist/` |
| `npm run build:frontend`| Next.js production build            |
| `npm run lint`         | Lint both workspaces                  |

---

## API Endpoints

| Method | Path                      | Description              |
|--------|---------------------------|--------------------------|
| GET    | `/health`                 | Health check             |
| GET    | `/api/menu`               | List all menu items      |
| GET    | `/api/menu/:id`           | Get a single menu item   |
| POST   | `/api/menu`               | Create a menu item       |
| GET    | `/api/orders`             | List all orders          |
| GET    | `/api/orders/:id`         | Get a single order       |
| POST   | `/api/orders`             | Create an order          |
| PATCH  | `/api/orders/:id/status`  | Update order status      |
| GET    | `/api/tables`             | List all tables          |
| GET    | `/api/tables/:id`         | Get a single table       |
| PATCH  | `/api/tables/:id/status`  | Update table status      |

All responses follow the `ApiResponse<T>` envelope:

```json
{ "success": true, "data": { ... } }
{ "success": false, "error": "Not found" }
```

---

## Module System

Both the backend and the frontend are organized around **business domain modules**. Each module is self-contained and lives in its own sub-folder:

```
backend/src/modules/<module>/
  <module>.types.ts       ← TypeScript interfaces / types
  <module>.controller.ts  ← request handlers (business logic)
  <module>.router.ts      ← Express Router wiring

frontend/src/modules/<module>/
  <ModuleName>.tsx        ← React component(s) for that domain
```

The frontend's `src/app/` directory holds thin Next.js page files that simply import and render the components from `src/modules/`.

---

## How to Add a New Module

Use `reservations` as an example.

### Backend

1. **Create the module folder and files:**

   ```bash
   mkdir backend/src/modules/reservations
   touch backend/src/modules/reservations/reservations.types.ts
   touch backend/src/modules/reservations/reservations.controller.ts
   touch backend/src/modules/reservations/reservations.router.ts
   ```

2. **Define your types** in `reservations.types.ts`:

   ```typescript
   export interface Reservation {
     id: string;
     tableId: string;
     guestName: string;
     date: string;       // ISO 8601
     partySize: number;
   }
   ```

3. **Implement your controller** in `reservations.controller.ts`:

   ```typescript
   import { Request, Response } from 'express';
   import { ApiResponse } from '../../shared/types';
   import { Reservation } from './reservations.types';

   const reservations: Reservation[] = [];

   export const getAllReservations = (_req: Request, res: Response): void => {
     res.json({ success: true, data: reservations } satisfies ApiResponse<Reservation[]>);
   };
   ```

4. **Wire the router** in `reservations.router.ts`:

   ```typescript
   import { Router } from 'express';
   import { getAllReservations } from './reservations.controller';

   const router = Router();
   router.get('/', getAllReservations);
   export default router;
   ```

5. **Mount the router** in `backend/src/app.ts`:

   ```typescript
   import reservationsRouter from './modules/reservations/reservations.router';
   // ...
   app.use('/api/reservations', reservationsRouter);
   ```

### Frontend

1. **Create the component** in `frontend/src/modules/reservations/ReservationList.tsx`:

   ```tsx
   'use client';
   import { useEffect, useState } from 'react';
   import { fetchApi } from '@/shared/api';
   import { ApiResponse } from '@/shared/types';

   interface Reservation { id: string; guestName: string; date: string; partySize: number; }

   export default function ReservationList() {
     const [items, setItems] = useState<Reservation[]>([]);
     useEffect(() => {
       fetchApi<ApiResponse<Reservation[]>>('/api/reservations')
         .then((res) => { if (res.success && res.data) setItems(res.data); });
     }, []);
     return <ul>{items.map((r) => <li key={r.id}>{r.guestName} – {r.date}</li>)}</ul>;
   }
   ```

2. **Add the page** at `frontend/src/app/reservations/page.tsx`:

   ```tsx
   import ReservationList from '@/modules/reservations/ReservationList';

   export default function ReservationsPage() {
     return (
       <div>
         <h1>Reservierungen</h1>
         <ReservationList />
       </div>
     );
   }
   ```

3. **Add a nav link** in `frontend/src/app/layout.tsx`:

   ```tsx
   <a href="/reservations" style={{ color: 'white', textDecoration: 'none' }}>Reservierungen</a>
   ```

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and adjust as needed:

| Variable    | Default       | Description                        |
|-------------|---------------|------------------------------------|
| `PORT`      | `4000`        | Port the Express server listens on |
| `NODE_ENV`  | `development` | Runtime environment                |

For the frontend, create `frontend/.env.local` to override:

| Variable               | Default                   | Description              |
|------------------------|---------------------------|--------------------------|
| `NEXT_PUBLIC_API_URL`  | `http://localhost:4000`   | Backend API base URL     |

---

## License

MIT © AGF-Gastro System contributors. See [LICENSE](./LICENSE) for details.
