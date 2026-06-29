# NEOTRADE - Brand Migration over NEXTTRADE Master

## Original Problem Statement
Adopt **NEXTTRADE** as the permanent production master codebase and **re-brand only the public-facing surface** to **NeoTrade**. All trading engine, OTC/live candle engine, market feed, dashboards (user + admin), APIs, MongoDB collections, authentication, wallet, deposits, withdrawals, trade resolver, risk management — must remain 100% NEXTTRADE, untouched.

## Architecture (NEXTTRADE master, preserved)
- **Frontend**: Next.js 14 App Router + Radix UI / shadcn + Tailwind + framer-motion 12 + lightweight-charts 5 + sonner toasts. Pages under `app/` (landing `/`, `/login`, `/signup`, `/reset-password`, `/support`, `/trade`, `/account`, `/transactions`, `/trades-history`, `/admin`). All trading APIs live in `app/api/[[...path]]/route.js` (1,045 lines).
- **Backend**: FastAPI proxy (`backend/server.py`, 100 lines) — forwards `/api/*` from ingress port 8001 to Next.js on port 3000. No business logic in Python.
- **Engine (Next.js lib/)**: `priceEngine.js` (OTC + live candle generator), `tradeResolver.js` (trade execution + payout), `liveFeed.js`, `liveAssetsConfig.js`, `api.js`, `auth.js` (bcryptjs + jsonwebtoken), `db.js` (MongoDB native driver), `email.js` + `emailTemplates.js` (Resend).
- **Database**: MongoDB native driver. Collections seeded on startup: `users` (admin@trading.com / masteruser@trading.com, password `password`), `settings` (winRatio 0.2, payoutRate 1.8). DB selectable via `DB_NAME` env.

## Brand Migration (only files touched)
1. `frontend/components/TradingLiteLogo.jsx` — wordmark changed `NEXT|TRADX` → `NEO|TRADE` (SVG mark + colors kept so dashboards remain visually identical).
2. `frontend/app/icon.svg` — kept (favicon shape is brand-neutral candlestick mark used across all pages).
3. `frontend/app/layout.js` — metadata: title/description/keywords/og/twitter all set to NEOTRADE. applicationName added.
4. `frontend/app/manifest.js` — name/short_name → NEOTRADE.
5. `frontend/app/page.js` — full landing page rebuilt with NeoTrade hero ("Trade Smarter with NEOTRADE", cyan→green brand-text gradient), stats counters, features grid, "how it works", testimonials, FAQ, CTA, footer. Routes preserved (`/login`, `/signup`, `/trade`, `/support`).
6. `frontend/app/login/page.js`, `frontend/app/signup/page.js`, `frontend/app/reset-password/page.js`, `frontend/app/account/page.js` — copyright footer string → NEOTRADE.
7. `frontend/app/admin/page.js` — version label → `NEOTRADE v1.0`.
8. `frontend/components/DepositModal.jsx` — Binance Pay recipient name + warning string → NEOTRADE.
9. `frontend/lib/emailTemplates.js` — `BRAND` constant + header wordmark + comment → NEOTRADE.
10. `frontend/lib/email.js` — header comment + default `EMAIL_FROM` → NEOTRADE.
11. `frontend/scripts/render-email-previews.js` — preview-only dev brand strings → NEOTRADE.
12. `frontend/.env` — added `MONGO_URL`, `DB_NAME` (required by Next.js MongoDB driver), `JWT_SECRET`, `APP_BRAND_URL=https://neotrade.live`, `NEXT_PUBLIC_APP_URL=https://neotrade.live`. Protected `REACT_APP_BACKEND_URL` preserved.

## Untouched (NEXTTRADE — exactly as shipped)
- `lib/priceEngine.js`, `lib/tradeResolver.js`, `lib/liveFeed.js`, `lib/liveAssetsConfig.js`, `lib/api.js`, `lib/auth.js`, `lib/db.js`, `lib/utils.js`
- `app/api/[[...path]]/route.js` (all 1,045 lines of trading APIs)
- `app/trade/page.js`, `app/transactions/page.js`, `app/trades-history/page.js`, `app/account/page.js` (only copyright string in account changed), `app/admin/page.js` (only version label changed), `app/support/page.js`
- `components/AccountSwitcher.jsx`, `AssetList.jsx`, `WithdrawalModal.jsx`, `Leaderboard.jsx`, `OTCChart.jsx`, `InAppBrowserBanner.jsx`, all of `components/ui/*`
- `backend/server.py` (FastAPI proxy), `backend/requirements.txt`
- `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `globals.css`

## Verification (manual checks performed)
- Landing https://neotrade-deploy.preview.emergentagent.com/ → 200, renders "Trade Smarter with NEOTRADE" hero, NEO|TRADE logo, cyan/green gradient brand text, NeoTrade feature copy, NeoTrade footer.
- Login https://neotrade-deploy.preview.emergentagent.com/login → 200, NeoTrade-branded, original NEXTTRADE login flow.
- `/api/assets` → live OTC + forex feed working (XAUUSD, USDPHP, etc returning live prices).
- Admin login (admin@trading.com / password) → original NEXTTRADE Admin Dashboard fully functional: "Live System Control Center", "Trade Pattern Management", Win/Loss controls, House edge 80%, Payout Multiplier 1.80x, Big Win Injection, Daily Profit Target — all preserved with NEOTRADE branding only on logo + footer.
- Trade login (masteruser@trading.com / password) → original NEXTTRADE trading dashboard: XAU/USD OTC live candles (5s, 15s, 1m, 3m, 5m, 10m), 85% payout, Up/Down execution, $10,000 demo balance, Trades/History/Leaderboard sidebar — engine fully operational, NEOTRADE branding only on logo.

## Existing Credentials (NEXTTRADE seed — unchanged)
- Admin: `admin@trading.com` / `password`
- Demo user: `masteruser@trading.com` / `password`

## Backlog / Future
- Awaiting your incremental requests. Mode is now: **NEOTRADE production over NEXTTRADE engine — no architectural changes without explicit instruction.**
EOF