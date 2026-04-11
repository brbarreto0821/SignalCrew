# Signal Crew — v3
## "Find trusted professionals nationwide."

---

## Quick start
```bash
npm install && npm run dev
# http://localhost:3000
```

## Deploy to Vercel
1. Push to GitHub repo
2. vercel.com → New Project → Import repo
3. Deploy — no env vars needed for prototype

## Activate real waitlist emails
See docs/formspree-setup.md — takes 5 minutes, free.

---

## What changed in v3

1. Review button added to all crew profiles (sidebar + reviews section)
2. Full internal analysis document: docs/platform-analysis.md
3. Pricing removed from landing page
4. Real Formspree waitlist form with interest questions (see docs/formspree-setup.md)
5. Back to Home button in demo banner on every app screen
6. "Find trusted professionals nationwide" tagline throughout

---

## Screens
| Screen | URL |
|--------|-----|
| Landing page + waitlist | /home |
| Dashboard | /dashboard |
| Find crews | /search |
| Crew profile + review + request | /profile/:slug |
| Connections + messaging | /connections |
| Project needs | /interest |
| Property search | /property/search |
| Property detail | /property/:id |
| Settings | /settings |

## Demo crews
- /profile/rodriguez-masonry (Concrete, 91 ClearScore)
- /profile/apex-electrical (Electrical, 84)
- /profile/stillwater-av (AV/Low-voltage, SAM.gov, Military)
- /profile/heartland-hvac (HVAC, Wichita KS, 88)
- /profile/clearpath-it (IT/Cabling, Dallas TX, 93, SAM.gov)
- /profile/lone-star-roofing (Roofing, Fort Worth TX, 87)

## Docs
- docs/platform-analysis.md — Honest analysis of the opportunity
- docs/formspree-setup.md — How to activate real email submissions
- docs/request-interest-strategy.md — Request Interest feature strategy
