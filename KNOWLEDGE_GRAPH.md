# Knowledge Graph - Sunday School Website

## Core Entities

### Pages
- **Home**: Main landing page.
- **Events**: Public events listing page.
- **Admin**: Protected administration panel for managing events, resources, and emails.
- **Resources**: Page for sermons and educational materials.
- **Newcomer**: Information for new visitors.

### Hooks
- **useData**: Manages state and persistence (localStorage) for events, resources, and emails.

### Components
- **Navigation**: Site header and menu.
- **Footer**: Site footer.
- **Calendar**: Reusable interactive calendar for events.

## Edges & Dependencies

- `App.tsx` -> `Home`, `Events`, `Admin`, `Resources`, `Newcomer` (Routing)
- `Events.tsx` -> `useEvents` (Data fetching)
- `Events.tsx` -> `Calendar` (View toggle)
- `Admin.tsx` -> `useEvents`, `useResources`, `useEmails` (Data management)
- `Admin.tsx` -> `Calendar` (Interactive scheduling)
- `useData.ts` -> `localStorage` (Persistence)
- `useData.ts` -> `mockData.ts` (Initial state)

## Architectural Decisions

- **Persistence**: Using `localStorage` with a prefix `ss_` for simple client-side data management.
- **Auth**: Simple password-based local authentication for the Admin panel.
- **Invites**: Generates Google Calendar URLs with member emails as guests.
