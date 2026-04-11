# Project Memory (CLAUDE.md)

> Keep this file **short**. Update as the project evolves.

## Project Goal
Diagnostic coaching session funnel for Lithuanian market. Quiz-style funnel with psychological narrative, leading to Stripe checkout for a 1:1 video session booking.

## Production
- **Domain:** TBD (currently `reset-klinika.vercel.app`)
- **Future domain:** Something like `resetklinika.lt`
- **Target market:** Lithuania only (Lithuanian language, EUR pricing)

## Repo Structure
```
reset-klinika/
├── index.html      ← The funnel (9 screens + long scroll offer page)
├── success.html    ← Post-payment confirmation page
├── images/         ← Drop images here (lukas.jpg, og.jpg, etc.)
├── README.md       ← Setup instructions
└── CLAUDE.md       ← This file
```

## Dev Tools (remove for production)
The funnel includes development helpers:
- **Screen number badge** — green badge in top-right (S01, S02, etc.)
- **Dev toolbar** — bottom bar with buttons 1-9 for quick screen navigation
- **Keyboard shortcuts** — press 1-9 or arrow keys to navigate

To remove for production, delete:
1. CSS block: `/* ═══ DEV TOOLBAR */` through `.screen-number {...}`
2. HTML: `<div class="dev-toolbar">...</div>` and `<div class="screen-number">...</div>`
3. JS: `updateDevUI()` function and `/* ═══ DEV: KEYBOARD NAVIGATION */` block

## Key Constraints
- **Copy is LOCKED.** Do not modify Lithuanian text without explicit approval.
- **Mobile-first:** 480px max-width container. Assume 90%+ traffic from phones. Desktop shows mobile version.
- **Design:** Dark theme (#0a0f0a) + neon green (#00ff6a). Follow the set tone until told otherwise.
- **Price:** €57 one-time (may change before launch).

## Integrations (current & planned)
| Integration | Status |
|-------------|--------|
| Stripe Payment Link | Setup needed (placeholder URLs) |
| Meta Pixel | Setup needed (placeholder ID) |
| Calendly | Planned |
| Resend (email) | Planned |

## Commands
```bash
# Deployment (Vercel auto-deploys on push)
git add .
git commit -m "message"
git push origin main

# Local preview (optional)
npx live-server
```

## Git Workflow
- Use **feature branches** for changes
- Merge to `main` via PR when ready
- Every push to `main` auto-deploys to Vercel

## Placeholders to Replace Before Launch
| Placeholder | Location | Replace with |
|-------------|----------|--------------|
| `YOUR_PAYMENT_LINK` | index.html (3 places) | Stripe Payment Link URL |
| `YOUR_PIXEL_ID` | index.html + success.html | Meta Pixel ID |
| Photo placeholder | Screen 08 in index.html | Real photo (`images/lukas.jpg`) |

## Assets Status
- [ ] Lukas photo — coming soon
- [ ] OG image — coming soon
- [ ] Other images — TBD

## Guardrails
- **NEVER perform external actions** (Stripe changes, emails, deployments) without explicit approval. Ask first.
- **NEVER read `.env` files** — secrets could leak. Use placeholders.
- **NEVER modify funnel copy** without explicit approval.
- **NEVER git push** — only commit locally. Wait for user to explicitly say "push" before pushing.
- Always test on mobile viewport before suggesting deployment.

## Contributors
- Lukas (owner)
- Claude Code (AI assistant)
- Possibly 1 colleague (TBD)

## Future Additions
As the project grows, may add:
- Lead collection (email capture before paywall)
- Calendly integration for session booking
- Transactional emails via Resend
- Additional documentation files
