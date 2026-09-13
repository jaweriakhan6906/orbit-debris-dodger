# Orbit Debris Dodger

A 3D, browser-based visualization of satellites and debris around Earth,
with a small backend that persists what you do in it.

## Run it

**1. Start the backend**
```bash
cd backend
npm install
npm start
```
Runs at http://localhost:5001

**2. Open the frontend**
Open `frontend/index.html` directly in your browser (Chrome recommended
for full Web Audio support). It talks to the backend at
`http://localhost:5001/api` — if the backend isn't running, everything
still works, it just won't persist your launches or show the mission log.

## What the backend adds

Without a backend, every satellite you launch and every simulated
collision disappears the moment you refresh the page. This backend fixes
that:

- **Launches persist.** Every satellite you launch is saved. Reload the
  page and they're all still there, orbiting where you left them.
- **A real mission log.** The right-hand panel's "Mission log" tab shows
  every launch and incident ever recorded, oldest to newest.
- **Live stats.** The "Launches logged" counter in the top bar reflects
  the real, persisted total — not just what's happened since your last
  refresh.

## Project structure

```
orbit-debris-dodger/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── controllers/orbit.controller.js
│   │   ├── routes/orbit.routes.js
│   │   ├── middleware/{validate.js, errorHandler.js}
│   │   └── utils/store.js
│   ├── package.json
│   └── README.md
└── frontend/
    └── index.html
```

## What this satisfies (Project 2 checklist)

- API endpoints, GET and POST: `POST /api/launches`, `GET /api/launches`,
  `POST /api/incidents`, `GET /api/incidents`, `GET /api/stats`
  (plus `GET /api/launches/:id` and `DELETE /api/launches/:id`)
- Handles user input and responses: launching a satellite in the 3D view
  sends real data (name, orbital band, altitude, inclination) and gets
  back a structured, saved record
- Validates basic data: missing/invalid fields on either endpoint are
  rejected with `400` and a clear message; unknown launch ids return `404`
- RESTful naming and correct status codes throughout (`201` on create,
  `200` on fetch, `204` on delete, `400`/`404` on bad input)
