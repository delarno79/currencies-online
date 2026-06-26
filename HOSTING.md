# Hostinger Deployment Guide

This guide details the step-by-step process of deploying the **Currencies.global** Next.js application on Hostinger (either Hostinger VPS or Hostinger Node.js hosting).

---

## SSH Connection Details
To connect to the Hostinger server, use the following credentials:
- **IP / Host**: `31.97.97.32`
- **Port**: `65002`
- **Username**: `u522985374`
- **SSH Command**:
  ```bash
  ssh -p 65002 u522985374@31.97.97.32
  ```

---

## 1. Setup Environment Variables

In your Hostinger environment dashboard (or inside the `.env` file in the root of the `currencies-online` directory), define the following variables:

```ini
# Next.js Node Environment
NODE_ENV=production

# Database URI (SQLite points to local file path)
DATABASE_URL="file:./prisma/dev.db"

# API keys and security secrets
GOOGLE_PLACES_API_KEY="AIzaSyBIayY1QfuhjAsECppf6hfdJ-q4AUa_rtg"

# App URLs
NEXT_PUBLIC_APP_URL=https://currencies.global
```

---

## 2. Install Dependencies

Upload the code to your Hostinger file manager (excluding `node_modules` and `.next` folders), open the SSH console or Hostinger terminal, and run:

```bash
# Navigate to Next.js app directory
cd currencies-online

# Install project packages
pnpm install
# (Or use npm if pnpm is unavailable: npm install)
```

---

## 3. Database Migration & Seeding

Since the application runs on **SQLite** via **Prisma**, you must initialize the database and create the default admin user:

```bash
# Push database schemas
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Create the default admin credentials (admin / adminpassword123)
npx tsx prisma/seed.ts
```

---

## 4. Compile the Production Build

Generate the optimized Next.js build:

```bash
pnpm run build
# (Or: npm run build)
```

---

## 5. Launch the Web Application

### Option A: Via Hostinger Node.js Dashboard panel
1. Set the **Application Startup File** to: `node_modules/next/dist/bin/next`
2. Set the **Run Script** or parameters command to: `start`
3. Click **Start** / **Restart**.

### Option B: Via Hostinger VPS (using PM2 Process Manager)
If you are deploying on a Hostinger VPS server, run the process persistently using `pm2`:

```bash
# Install PM2 globally
npm install -g pm2

# Launch Next.js using PM2
pm2 start npm --name "currency-exchange" -- run start

# Save PM2 state to launch automatically on server restarts
pm2 save
pm2 startup
```
