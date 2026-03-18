# Quick Deployment Guide - Deploy in 5 Minutes! 🚀

## Fastest Way to Deploy

### Step 1: Get Free Database (2 minutes)

**Option A: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/atlas
2. Create a free cluster
3. Create a database user + password
4. Network Access → allow your IP (and Vercel if needed)
5. Copy the **MongoDB connection string** (`mongodb+srv://...`)

### Step 2: Push to GitHub (1 minute)

```bash
# In your project folder
git init
git add .
git commit -m "Ready for deployment"
git branch -M main

# Create repo at github.com/new, then:
git remote add origin https://github.com/YOUR_USERNAME/agroveda-exports.git
git push -u origin main
```

### Step 3: Deploy to Vercel (2 minutes)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB connection string (`mongodb://...` or `mongodb+srv://...`)
   - `MONGODB_DB` = Your database name (optional)
   - `NEXTAUTH_URL` = `https://your-app-name.vercel.app` (Vercel will show this)
   - `NEXTAUTH_SECRET` = Run: `openssl rand -base64 32`
5. Click "Deploy"

### Step 4: Set Up Database

After deployment, run these commands locally:

```bash
# Pull environment variables
vercel env pull .env.local

# Seed database
npm run seed
```

**OR** use Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
# Then run migrations and seed
```

## That's It! 🎉

Your website is now live at: `https://your-app-name.vercel.app`

**Admin Login:**
- Email: `admin@agrovedaexports.com`
- Password: `admin123`

**Don't forget to change the admin password after first login!**

## Need Help?

Check `DEPLOYMENT.md` for detailed instructions.
