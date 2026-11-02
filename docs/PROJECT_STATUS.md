# Project status

## Completed (tested developer)
- Phase 1: JavaScript conversion, theme, five tabs (user reported "it works")

## Completed (tested)
- Phase 3: Places directory, search, categories, detail screen, sourced unverified data

## Pending
- Data template (CSV) and a script that converts it into places.js
- Collect room numbers, offices, and entrance GPS for each building
- Confirm "ITB" full name and verify every record on campus
- Phase 4 onward: map, routing, AI backend (Express), favorites, feedback, build

## Known issues
- All places are unverified and have no coordinates
- Phase 1 commit and TypeScript cleanup (npm uninstall typescript) results not yet confirmed
- Log showed "iOS" while testing on Android; unexplained
- No full room list is published by USTP (searched Oct 2026)


- Phase 8 step 1: Express server skeleton (/health and 404 reply tested on the computer)

- /api/ask returns at most 3 matches, so a question like "library" hides the 4th match
- /api/ask answers are floor-info lines only; for some buildings (e.g. gymnasium) this does not say where the building itself is
- server/src/data/places.js is a manual copy of src/data/places.js and can drift




- Phase 8: Express server with /health and /api/ask (plain search, no AI), tested from PowerShell
- Phase 9: Ask AI screen, place links, "show on map", error message when the server is down


- Ask AI works only on home Wi-Fi with the server running (address in src/constants/api.js changes with the network)
- A real build needs the server hosted online with HTTPS
- /api/ask returns at most 3 matches, and answers are floor-info lines only
- server/src/data/places.js is a manual copy of src/data/places.js and can drift
- Rate limit is per address, not per user