# NeoTrade - Project Adoption

## Original Problem Statement
Adopt a complete NeoTrade trading platform ZIP (Domain: neotrade.live) as-is into the Emergent workspace without modifying any code, structure, dependencies, configurations, UI, logic, or assets. Mode: READ-ONLY PROJECT ADOPTION.

## Architecture
- **Frontend**: React 18 (CRA / react-scripts 5.0.1) — pages: Landing, Auth, Dashboard, Profile, Deposit, Withdraw, Admin, Tournaments, Affiliate, Legal, AccountSetup; services for api/socket/push; framer-motion, lightweight-charts, socket.io-client, react-hot-toast, react-fast-marquee, lucide-react
- **Backend**: FastAPI + python-socketio (ASGI) on port 8001 — motor (MongoDB async), passlib/bcrypt, JWT (python-jose), pyotp/qrcode (2FA), stripe, emergentintegrations 0.1.0, httpx, live currency feed
- **Database**: MongoDB (local, env: MONGO_URL / DB_NAME)
- **Auth**: JWT + optional TOTP 2FA (preserved as in ZIP)
- **Realtime**: Socket.IO for live prices (forex, crypto, gold/silver via fawazahmed0/currency-api)

## Adoption Status (Jan 2026)
- [x] ZIP extracted from customer-assets URL
- [x] All source files copied to /app exactly as-is (backend/server.py 112KB, frontend/src pages, components, services, App.js, index.css, App.css, tailwind.config.js, postcss.config.js, public/)
- [x] Protected env vars preserved: MONGO_URL, DB_NAME (backend); REACT_APP_BACKEND_URL (frontend)
- [x] Backend deps installed via requirements.txt (130+ packages including emergentintegrations 0.1.0, stripe 14.4.0, motor 3.3.1, fastapi 0.110.1, socket.io 5.16.1)
- [x] Frontend deps installed via yarn (react 18, framer-motion 11, lightweight-charts 4.1, socket.io-client 4.7)
- [x] Both services running under supervisor — backend on :8001, frontend on :3000
- [x] Live market feeds operational (crypto, forex, gold $4080.82, silver $58.91)
- [x] Seeded admin accounts: admin@neotrade.live, masteruser@gmail.com
- [x] Landing page renders correctly with NEOTRADE branding, ticker, hero CTAs

## Seeded Accounts (from server.py boot logs)
- admin@neotrade.live
- masteruser@gmail.com
(Passwords not modified — refer to original ZIP server.py seed logic.)

## Backlog / Next Tasks
- Awaiting user's explicit incremental instructions. Project is in READ-ONLY ADOPTION MODE until further notice.
