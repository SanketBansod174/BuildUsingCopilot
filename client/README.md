# Client (Angular) — BuildUsingCopilot

This client implements the Frontend Execution Plan:
- Angular + Angular Material
- Dexie (IndexedDB) local DB
- Mock data prefill on first run
- App layout with toolbar/sidenav and routing
- Services: Account, Category, Transaction using DbService abstraction

Quick start:
1. cd client
2. npm install
3. npm start

Notes:
- All code lives inside `client/src/app`.
- Prefill happens automatically on app startup: the DB is seeded from `src/app/core/mock-data/*` when the DB is empty.
- To "Reset to Demo Data", clear IndexedDB for the app domain (or add a button in UI that calls dbService.clearAndSeed()).
