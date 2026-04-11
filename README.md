# Reset Klinika — Funnel

Vanilla HTML/CSS/JS funnel with Stripe Checkout integration.

## Project Structure

```
reset-klinika/
├── index.html      ← The funnel (all 9 screens + long scroll offer page)
├── success.html    ← Post-payment confirmation page
├── images/         ← Drop your images here (lukas.jpg, og.jpg, etc.)
└── README.md
```

---

## SETUP CHECKLIST

### 1. Stripe Payment Link

1. Go to [stripe.com](https://stripe.com) → create account (or log in)
2. Dashboard → **Products** → **+ Add product**
   - Name: `Diagnostinė sesija`
   - Price: `€57.00` (one-time)
3. Go to the product → click the price → **Create payment link**
4. In payment link settings:
   - **After payment** → redirect to: `https://yourdomain.com/success.html`
   - Enable **Collect email address**
   - Optional: **Collect phone number**
5. Copy the payment link URL (looks like `https://buy.stripe.com/abc123xyz`)
6. In `index.html`, find all 3 instances of:
   ```
   https://buy.stripe.com/YOUR_PAYMENT_LINK
   ```
   Replace with your real Stripe link.

### 2. Meta Pixel

1. In [Meta Events Manager](https://business.facebook.com/events_manager), get your Pixel ID
2. In **both** `index.html` and `success.html`, replace:
   ```
   YOUR_PIXEL_ID
   ```
   with your actual Pixel ID (it's a number like `123456789012345`)

**Events fired automatically:**
- `PageView` — on every page load
- `ViewContent` — when user reaches screen 5 (midpoint) and screen 9 (offer)
- `InitiateCheckout` — when user clicks any "Rezervuoti laiką" button
- `Purchase` — on `success.html` load (after Stripe redirects back)

### 3. Images

Drop your images into the `/images/` folder. Then in `index.html`:
- Find the placeholder `<div>` with "Photo" text in Screen 08
- Replace it with: `<img src="images/lukas.jpg" ...>`
- Add OG image: uncomment the og:image meta tag and point to your image

### 4. Deploy to GitHub + Vercel

```bash
# In your project folder:
git init
git add .
git commit -m "initial funnel"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/reset-klinika.git
git branch -M main
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"** → Import `reset-klinika`
3. Framework: **Other** (it's static HTML, no build step)
4. Click **Deploy** → done. Live at `reset-klinika.vercel.app`

### 5. Custom Domain

1. Buy domain (e.g. `resetklinika.lt`) from any registrar
2. In Vercel → your project → **Settings** → **Domains** → add domain
3. Vercel shows you DNS records → add them at your registrar
4. Wait ~5 min for propagation
5. Update your Stripe payment link success URL to use the real domain

### 6. Update & Redeploy

Every `git push` to `main` auto-deploys on Vercel:
```bash
git add .
git commit -m "update copy"
git push
```

---

## CONVERSION TRACKING BONUS

For better attribution, also set up **Stripe → Meta Conversions API**:
1. Stripe Dashboard → **Settings** → **Integrations** → search "Meta"
2. Connect your Meta Business account
3. This sends server-side purchase events (more reliable than pixel alone)

---

## QUICK REFERENCE

| What | Where to change |
|---|---|
| Stripe link | `index.html` — search `YOUR_PAYMENT_LINK` (3 places) |
| Meta Pixel ID | `index.html` + `success.html` — search `YOUR_PIXEL_ID` |
| Price | Search `€57` in `index.html` |
| Lukas photo | Screen 08 in `index.html` — replace placeholder div |
| Copy/text | Edit directly in `index.html` |
| Colors | CSS `:root` variables at top of `index.html` |
