# Knowledge Graph - Sunday School Website

## Core Entities

### Pages
- **Home**: Main landing page.
- **Events**: Public events listing page.
- **Admin**: Protected administration panel for managing events, resources, and emails.
- **Resources**: Page for sermons and educational materials.
- **Newcomer**: Information for new visitors.

### Hooks
- **useData**: Reads and writes shared events, resources, and the private email directory through Firebase Firestore.
- **useSignups**: Maintains the weekly shared sign-up board through Firebase Firestore.

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
- `useData.ts` -> Firebase Firestore (shared events, resources, and contacts)
- `useSignups.ts` -> Firebase Authentication + Firestore (weekly sign-ups)
- `useData.ts` -> `mockData.ts` (Initial state)

## Architectural Decisions

- **Persistence**: Firebase Firestore provides real-time shared data without an application server.
- **Auth**: Firebase Email/Password authentication protects the Admin panel; visitors use anonymous Firebase authentication for public data and their own sign-ups.
- **Notifications**: EmailJS sends sign-up notifications from the browser to a fixed recipient configured in the EmailJS template.
- **Invites**: Generates Google Calendar URLs with member emails as guests.
