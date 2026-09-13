# Orbit Debris Dodger — API

Persists what happens in the Orbit Debris Dodger frontend: satellites you
launch, and simulated collision incidents — so a page refresh doesn't wipe
your session.

Built for DecodeLabs Full Stack Project 2 (Backend API Development).

## Setup

```bash
npm install
npm start        # or: npm run dev (requires nodemon)
```

Runs at `http://localhost:5001`. The frontend expects it on this exact port.

## Endpoints

| Method | Path                  | Description                                   |
|--------|-----------------------|------------------------------------------------|
| GET    | `/`                   | Health check + endpoint list                   |
| POST   | `/api/launches`       | Record a satellite launch                      |
| GET    | `/api/launches`       | List every launch, most recent first           |
| GET    | `/api/launches/:id`   | Get one launch by id                           |
| DELETE | `/api/launches/:id`   | Remove a launch                                |
| POST   | `/api/incidents`      | Record a simulated collision incident          |
| GET    | `/api/incidents`      | List every incident, most recent first         |
| GET    | `/api/stats`          | Aggregate counts (total launches, busiest band)|

### Example: POST /api/launches

```json
{
  "name": "YOUR-SAT-1",
  "band": "LEO",
  "altKm": 550,
  "inclDeg": 51.6,
  "raanDeg": 120.4,
  "launchSite": { "x": 12.1, "y": 3.4, "z": -8.9 }
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": "b1e2...",
    "name": "YOUR-SAT-1",
    "band": "LEO",
    "altKm": 550,
    "inclDeg": 51.6,
    "raanDeg": 120.4,
    "launchSite": { "x": 12.1, "y": 3.4, "z": -8.9 },
    "createdAt": "2026-09-13T10:00:00.000Z"
  }
}
```

### Validation rules

- `name` required, non-empty, ≤60 characters → `400`
- `band` must be `LEO`, `MEO`, or `GEO` → `400`
- `altKm`, `inclDeg`, `raanDeg` must be numbers in sane ranges → `400`
- `description` on an incident required, non-empty, ≤300 characters → `400`
- Unknown launch id on GET/DELETE → `404`

## Notes

- Storage is in-memory, same pattern as CarbonLint's backend — resets on
  server restart. The frontend re-loads your launches from here on every
  page load, so as long as the server stays running, your satellites persist
  across refreshes.
- `busiestBand` in `/api/stats` is a simple tally of which orbital band
  (LEO/MEO/GEO) has the most launches recorded — illustrative, not a claim
  about real-world orbital congestion.
