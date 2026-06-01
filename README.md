# ♻️ SmartWaste Platform (EcoSync) — Smart Waste Management & Gamified Circular Economy

> An advanced, production-ready, full-stack Smart Waste Management and gamified Recycling platform built to streamline Urban Local Body (ULB) sanitation processes, optimize garbage truck routing with interactive spatial maps, incentivize citizens through an ecosystem reward economy, and facilitate waste education and community-driven cleanups.

---

## 🌟 Key Pillars of the Platform

```
                       ┌─────────────────────────────────────────┐
                       │           SMART WASTE PLATFORM          │
                       └────────────────────┬────────────────────┘
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         ▼                                  ▼                                  ▼
┌─────────────────┐                ┌─────────────────┐                ┌─────────────────┐
│  ULB OPERATIONS │                │  GAMIFIED REWARDS│                │CITIZEN ACTION & │
│  & VEHICLES     │                │  & CIRCULAR ECON│                │EDUCATION        │
├─────────────────┤                ├─────────────────┤                ├─────────────────┤
│ • Real-time GPS │                │ • Eco-points    │                │ • Report Dump   │
│ • Route mapping │                │ • Recycle shops │                │   (Leaflet Heat)│
│ • Landfills/    │                │ • Local scrap   │                │ • Interactive   │
│   Processing    │                │   shop coupons  │                │   Quizzes & LMS │
│ • Admin Panel   │                │ • Point-redeem  │                │ • PDF Certs     │
└─────────────────┘                └─────────────────┘                └─────────────────┘
```

---

## 🚀 Key Features & Modules

### 1. Multi-Role Ecosystem Workflows
The platform provides custom-tailored dashboards and distinct authorization gates for five different roles:
*   **Super Admin:** High-level dashboard to manage multiple municipalities, national-scale analytics, and globally configurations.
*   **ULB Admin (Urban Local Body):** The management command center. Allows municipal admins to onboard drivers/workers, map and assign waste routes, track landfill capacities, authorize rewards/penalties, and manage training materials.
*   **Citizens / Users:** The core participants. Can locate nearby recycling centers, request dry/wet waste pickups, report illegal dump sites (with photo uploads), complete certified environmental courses, earn "Eco-Points," and redeem them in the store.
*   **Field Workers / Drivers:** Field operations app. View scheduled route waypoints on an interactive map, report route progress, update truck capacity, and submit completed routes.
*   **Green Champions:** Elite citizens with verified records of community action. Access specialized forms to run local collection camps, verify community segregation, and log grassroots environmental progress.

### 2. Interactive Spatial Mapping (Leaflet-Powered)
*   **Route Builder & Vehicle Tracking:** Admins can visually trace and save active garbage truck routes using interactive Leaflet-maps.
*   **Waste Heatmaps:** Generates interactive geospatial maps plotting reported dump sites and community garbage issues to identify hot spots needing municipal attention.
*   **Scrap & Processing Network:** Citizens can visually explore recycling plants, biomethanization units, and registered scrap yards close to their geolocations.

### 3. Gamification, Wallets & Reward Economy
*   **Eco-Point Wallets:** Citizens automatically accumulate Points in a secure wallet upon:
    *   Completing verified training courses.
    *   Reporting genuine illegal dump sites (once validated by ULB admins).
    *   Logging verified bulk recyclable sales.
*   **Digital Redemption Store:** Integrated e-commerce portal where users can spend their points to buy physical tools (e.g., compost kits, home segregation bins) or redeem points for partner discount coupons.

### 4. Certified Environmental Academy (LMS)
*   **Training Modules:** Custom environmental courses built into the citizen dashboard complete with video materials and lesson cards.
*   **Interactive Quizzes:** Passing scores unlock automated certifications.
*   **Dynamic Certificate Engine:** On completion, the backend dynamically generates a custom PDF certificate with the user's name, course title, and unique verification hash, viewable directly inside the browser using an integrated PDF reader.

---

## 🛠️ Technology Stack

### Frontend Architecture
*   **Core Framework:** React 18 & Vite (Blazing fast development server & production builder)
*   **Styling Engine:** TailwindCSS v4 (Modern CSS framework with rich utility support)
*   **Interactive Graphics & Maps:** Leaflet & React-Leaflet (Geospatial coordinate drawing & maps)
*   **Data Visualization:** Chart.js & React-Chartjs-2 (Dashboards, weight tracking, and point metrics)
*   **Animations:** Framer Motion & GSAP (Premium micro-interactions, smooth hover states, and card transitions)
*   **State Management & Networking:** Axios (Custom interceptors for Bearer JWT token handling), React Router Dom (Declarative routing)

### Backend Architecture
*   **Runtime Environment:** Node.js (V8 JavaScript runtime)
*   **Web Framework:** Express.js (High performance, minimalist router)
*   **Database ORM:** MongoDB & Mongoose (Flexible, document-based schema system)
*   **File Uploads:** Multer (Local storage pipelines for user-submitted dump photos)
*   **Email System:** Nodemailer (Automatic transactional emails, alerts, and registration notifications)
*   **Document Generation:** PDFKit (Direct server-side compilation of PDF training certificates)
*   **Security & Safety:**
    *   `bcrypt` (Secure cryptographic password hashing)
    *   `jsonwebtoken` (JWT implementation for auth and state-less session validation)
    *   `express-rate-limit` (API rate-limiting against DDoS and brute-force)

---

## 📂 Repository Directory Structure

```text
Waste MS/
├── backend/
│   ├── src/
│   │   ├── controllers/      # API Business Logic (Auth, Analytics, Routes, etc.)
│   │   ├── models/           # Mongoose schemas (User, WasteRecord, Vehicle, Reward, etc.)
│   │   ├── routes/           # Express API endpoints grouped by component
│   │   ├── middlewares/      # JWT, Role verification, and Error-handling
│   │   ├── services/         # Third-party utilities (Emailer, PDF generator)
│   │   ├── certificates/     # Directory for generated PDF certificates
│   │   ├── uploads/          # Directory for citizen-uploaded dump photos
│   │   ├── seed.js           # Database seeder script
│   │   └── app.js            # Express application entry point
│   ├── .env                  # Server-side environment configuration
│   └── package.json          # Node dependencies and scripts
│
├── frontend/
│   ├── src/
│   │   ├── assets/           # Global design assets and icons
│   │   ├── components/       # Reusable UI widgets (Navbar, Modals, Cards)
│   │   ├── context/          # Global React state (AuthContext)
│   │   ├── pages/            # View components (Dashboards, Academy, Shop, Map, etc.)
│   │   │   ├── Analytics/    # Charts, Leaderboards, Heatmaps
│   │   │   ├── Dashboard/    # Role-based dashboards (Admin, Citizen, Worker, Champion)
│   │   │   ├── Shop/         # Reward Store & Order logs
│   │   │   ├── Training/     # Course LMS, Quiz, and Certificate viewer
│   │   │   └── Reports/      # Citizen issue forms and lists
│   │   ├── index.css         # Tailwind styles & premium glassmorphic variables
│   │   └── main.jsx          # React app DOM mounting point
│   ├── .env                  # Client API endpoints and keys
│   └── package.json          # React package dependencies and script runner
```

---

## ⚙️ Quick Start & Installation

### Prerequisites
*   Node.js (v18.x or above recommended)
*   MongoDB Instance (Local Community Server or Atlas Cluster)

### 1. Database Setup & Seeding
First, ensure you have a MongoDB connection string. Let's start the Backend.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
```

Create a `.env` file in the `backend/` folder and populate it:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_REFRESH_SECRET=your_super_secure_refresh_key
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
NODE_ENV=development
```

Now seed the database with mock users, facilities, training models, and shop items:
```bash
# Run the database seeder
npm run seed
```

Start the backend server:
```bash
# For development (with Nodemon auto-reload)
npm run dev

# For production
npm start
```
The backend server will run on `http://localhost:5000`.

---

### 2. Frontend Configuration & Running
```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install
```

Create a `.env` file in the `frontend/` folder and link your backend API URL:
```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 👥 Default Demo Credentials (Seed Accounts)

After running `npm run seed` in your backend, you can log in to the system immediately using any of these roles:

| Role | Username / Email | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@example.com` | `SuperPass123!` | Global administration access |
| **ULB Admin** | `ulbadmin@city.com` | `Pass123!` | Local Municipal Admin panel |
| **Citizen** | `citizen1@demo.com` | `User123!` | Reporting issues, buying kits, LMS |
| **Field Worker** | `worker1@demo.com` | `User123!` | View active routes, update truck coordinates |
| **Green Champion**| `champion1@demo.com`| `User123!` | Run campaigns and log community metrics |

---

## 📡 Essential REST API Reference

Here is a summary of the backend REST endpoints configured in Express:

### 🔑 Authentication (`/auth`)
*   `POST /auth/register` — Register a new user (with role selections)
*   `POST /auth/login` — Sign in and receive secure Access & Refresh JWT tokens
*   `GET /auth/profile` — Fetch details and token validation for active user sessions

### 📖 Green Academy / LMS (`/training`)
*   `GET /training` — Fetch list of environmental training modules
*   `POST /training/quiz-submit` — Score evaluation for a quiz; triggers certificate printing
*   `GET /training/certificate/:hash` — Stream generated PDF certificate in full resolution

### 📍 Route Management & GPS (`/routes` & `/vehicles`)
*   `GET /routes` — List all registered waste pickup lines and coordinate tracks
*   `POST /routes/create` — Plan a spatial collection route on the map
*   `GET /vehicles/tracking` — Live coordinates of running municipal trucks

### 🛒 Reward Economy & Scrap Shop (`/shop` & `/coupon`)
*   `GET /shop/items` — Load products (dustbins, scrap toolkits, eco-friendly merch)
*   `POST /shop/order` — Deduct Eco-points and place a kit order
*   `POST /coupon/redeem` — Generate local scrap store discount coupons using points

---

## 🎨 Premium Visual Elements (UI Showcase)

The frontend features a customized **Glassmorphic Theme** featuring dark mode backdrops, neon HSL borders, interactive spatial gauges, responsive sidebars, and customizable dashboard widgets.

*To add your personal UI screenshots to GitHub, upload them to a `/screenshots` folder at the root of the repository and link them below:*

```markdown
🖼️ App UI Gallery:
- [Landfill Analytics Dashboard](./screenshots/admin_dashboard.png)
- [Interactive Spatial Route Planner](./screenshots/route_planner.png)
- [Citizen Reward Wallet & Shop](./screenshots/rewards_store.png)
- [Academy LMS and PDF Certificate](./screenshots/training_certificate.png)
```

---

## 📜 Development License
This project is open-source and available under the **MIT License**. Created with ❤️ to build cleaner, smarter, and greener cities.
