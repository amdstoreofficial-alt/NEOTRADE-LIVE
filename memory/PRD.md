# NEOTRADE Production over NEXTTRADE Engine

## Original Problem Statement
Use the ORIGINAL NeoTrade frontend source files (not a recreation) for the public website (landing, hero, navigation, auth pages, features, stats, testimonials, FAQ, CTA, footer, colors, gradients, animations, typography). All trading infrastructure (engine, OTC, live candles, charts, user/admin dashboards, APIs, database, auth, wallet, deposits, withdrawals) remains NEXTTRADE — untouched.

## Architecture
- **Master codebase**: NEXTTRADE (Next.js 14 App Router + FastAPI proxy on :8001 + MongoDB via mongodb native driver).
- **Public website**: ORIGINAL NeoTrade JSX, CSS, color palette, gradients, animations — ported file-by-file from `NEOTRADE-main/frontend/src` into the Next.js framework.
- **Trading**: 100% NEXTTRADE (`lib/priceEngine.js`, `lib/tradeResolver.js`, `lib/liveFeed.js`, `app/api/[[...path]]/route.js`, `app/trade/page.js`, `app/admin/page.js`, `app/account/page.js`, etc. — not touched in this iteration).

## Public Pages (ported verbatim from NeoTrade)
- **`/`** (`app/page.js`) — Landing.js port: hex-N logo, animated tricolor gradient `NEOTRADE` wordmark, "Trade Smarter with NEOTRADE" hero, live price ticker (fetches from NEXTTRADE `/api/assets`, reshaped to BTC/ETH/EUR/XAU/GBP/SOL symbols), trust badges, animated counters (50k+ Active Traders / 95% Max Payout / 24/7 Support / 150+ Assets), feature grid with violet brand glow, "Start Trading in Minutes" 3-step section, testimonial cards, CTA section, NeoTrade footer.
- **`/login`** (`app/login/page.js` → `<NeotradeAuth initialMode="login"/>`) — Original Auth.js: Sign In/Sign Up tab switcher, glass panel, animated violet+cyan floating backdrops, Email/Password inputs, Forgot link, SlideToVerify drag/double-click verifier, "Access Platform" electric-to-neon gradient button. Wired to NEXTTRADE `/api/auth/login` (existing JWT flow, original NEXTTRADE seed users intact).
- **`/signup`** (`app/signup/page.js` → `<NeotradeAuth initialMode="register"/>`) — Same Auth.js component in register mode: Full Name + Email + Password + Confirm Password fields, Terms checkbox with neon check, SlideToVerify, "Create Account" button. Wired to NEXTTRADE `/api/auth/signup`.
- **`/reset-password`** (`app/reset-password/page.js` → `<NeotradeAuth initialMode="forgot"/>`) — Original Forgot + Reset flows. Wired to NEXTTRADE `/api/auth/password/request` and `/api/auth/password/reset`.

## Ported Components
- **`components/NeotradeNavbar.jsx`** — Original Navbar.js (logo, wordmark, sticky scroll, Login + Get Started buttons, mobile hamburger) adapted from `react-router-dom` → `next/navigation`. Includes exported `NeotradeLogo`, `NeotradeWordmark`.
- **`components/PageBackground.jsx`** — Original PageBackground.js, verbatim (ambient violet/buy blurs).
- **`components/NeotradeAuth.jsx`** — Original Auth.js (login/register/forgot/reset modes + SlideToVerify) adapted to `next/navigation` and wired to NEXTTRADE auth APIs via `@/lib/api`.

## CSS & Tailwind (additive merge)
- **`tailwind.config.js`** — Added NeoTrade color tokens (`app`, `panel`, `elevated`, `brand`, `buy`, `sell`, `space`, `electric`, `neon`, `vibrant`, `amber`), `Outfit`/`IBM Plex Sans`/`IBM Plex Mono` font families, `brand-gradient` / `hero-radial` background images, NeoTrade keyframes & animations (`float`, `pulse-glow`, `gradient-shift`, `glow-pulse`, etc.). All additive — NEXTTRADE dashboards untouched (they use hex literals).
- **`app/globals.css`** — Imported NeoTrade Google Fonts (Outfit, IBM Plex Sans, IBM Plex Mono) and appended NeoTrade @layer components (glass-panel, btn-primary, btn-buy, btn-sell, input-field, feature-card, hero-gradient, badges) and @layer utilities (text-gradient-brand, bg-gradient-brand, glow-brand, ambient-bg, custom-scrollbar, perspective-1000, marquee animation). Scoped via `.neo-page` wrapper class on the public pages so dashboard typography stays as-is.

## Assets (copied verbatim from NeoTrade `public/`)
- `favicon.ico`, `favicon.svg`, `favicon-16/32/48.png`, `icon-192x192.png`, `icon-512x512.png`, `apple-touch-icon.png`, `og-image.png` → `/app/frontend/public/`
- `favicon.svg` also written as `/app/frontend/app/icon.svg` so Next.js uses NeoTrade favicon in browser tabs.

## Untouched (NEXTTRADE — 100% preserved)
- `lib/priceEngine.js`, `lib/tradeResolver.js`, `lib/liveFeed.js`, `lib/liveAssetsConfig.js`, `lib/api.js` (client helpers), `lib/auth.js` (bcryptjs + jsonwebtoken), `lib/db.js` (mongodb), `lib/utils.js`
- `lib/email.js`, `lib/emailTemplates.js` (only brand strings updated in earlier iteration)
- `app/api/[[...path]]/route.js` (1,045 lines of trading + auth + admin APIs)
- `app/trade/page.js`, `app/transactions/page.js`, `app/trades-history/page.js`, `app/account/page.js`, `app/admin/page.js`, `app/support/page.js`
- `components/AccountSwitcher.jsx`, `AssetList.jsx`, `DepositModal.jsx`, `WithdrawalModal.jsx`, `Leaderboard.jsx`, `OTCChart.jsx`, `InAppBrowserBanner.jsx`, `TradingLiteLogo.jsx`, `QuotexLogo.jsx`, all `components/ui/*` (shadcn/Radix)
- `backend/server.py` (FastAPI proxy), `backend/requirements.txt`
- `next.config.js`, `postcss.config.js`, `app/layout.js`, `app/manifest.js`

## Verification (manual end-to-end)
- **Landing** https://neotrade-deploy.preview.emergentagent.com/ → 200. Renders NeoTrade hex-N logo + tricolor "NEOTRADE" wordmark, hero "Trade Smarter with NEOTRADE", animated price ticker pulling live data from `/api/assets` (EUR/USD 1.1403, XAU/USD 4067.50, GBP/USD 1.3212), trust badges, stats counters, features grid with violet glow on hover, testimonials, footer. Indistinguishable from the original NeoTrade reference.
- **Login** /login → original NeoTrade glass-panel Auth UI with Sign In/Sign Up tab switcher, animated violet+cyan backdrops, SlideToVerify, "Access Platform" gradient button.
- **End-to-end auth + dashboard** → Logged in as `masteruser@trading.com / password` via the original NeoTrade Auth UI, was redirected to `/trade` showing the **100% original NEXTTRADE trading dashboard**: XAU/USD OTC live candlestick chart with RESISTANCE marker and real-time 1s ticks at price 4065.817, NEXTTRADE sidebar (Trade/Leaderboard/Indicators/History/Deposit/Withdraw/My Account/Support/Settings), NEXTTRADE trade panel (5s/15s/30s/1m/3m/5m timeframes, $10 default investment, $1/$10/$50/$100/$500 chips, 85% payout = $18.50, Up/Down buttons), Top Traders panel, $10,000 demo balance, Deposit + Withdrawal CTAs — fully operational.

## Existing Credentials (NEXTTRADE seed — unchanged)
- Admin: `admin@trading.com` / `password`
- User: `masteruser@trading.com` / `password`

## Backlog / Future
- Awaiting your further iteration requests. Mode: **NEOTRADE public site over NEXTTRADE engine**.
