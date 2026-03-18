# Production Deployment Guide

This guide will help you deploy Agroveda Exports to Vercel (free hosting platform).

## Prerequisites

1. **GitHub Account** - Free account at [github.com](https://github.com)
2. **Vercel Account** - Free account at [vercel.com](https://vercel.com)
3. **Database Account** - MongoDB database (MongoDB Atlas recommended)

## Step 1: Set Up MongoDB Database

### Option A: MongoDB Atlas (Recommended)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user + password
4. Network Access → allow your IP (and Vercel if needed)
5. Copy the **MongoDB connection string** (`mongodb+srv://...`)

## Step 3: Push Your Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Agroveda Exports"
   ```

2. **Create a GitHub repository**:
   - Go to [github.com/new](https://github.com/new)
   - Name it `agroveda-exports` (or any name you prefer)
   - Don't initialize with README
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/agroveda-exports.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**:
   Add these in Vercel's environment variables section:
   
   ```
   DATABASE_URL=your-mongodb-connection-string
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=generate-a-random-secret-here
   ```
   
   To generate NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

4. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

## Step 5: Set Up Database

After deployment, you need to seed the database:

1. **Seed the Database**:
   ```bash
   npm run seed
   ```

   **Note**: You can run this command locally with production `MONGODB_URI`, or use Vercel's CLI.

## Step 6: Access Your Website

Once deployed, Vercel will provide you with:
- **Production URL**: `https://your-app-name.vercel.app`
- **Admin Dashboard**: `https://your-app-name.vercel.app/admin`

## Step 7: Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster/db?retryWrites=true&w=majority` |
| `MONGODB_DB` | Database name (optional) | `agroveda` |
| `NEXTAUTH_URL` | Your app URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Secret for NextAuth | Random 32+ character string |
| `WHATSAPP_NUMBER` | WhatsApp number (optional) | `919876543210` |

## Post-Deployment Checklist

- [ ] Database schema synced successfully
- [ ] Database seeded with admin user and products
- [ ] Admin login works
- [ ] Products display correctly
- [ ] Enquiry forms work
- [ ] Email and WhatsApp links work
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)

## Troubleshooting

### Database Connection Issues
- Verify MONGODB_URI is correct
- Check if database allows connections from Vercel's IPs
- Ensure your network allowlist includes Vercel (or allow all, not recommended)

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all environment variables are set

### Authentication Issues
- Verify NEXTAUTH_URL matches your deployment URL
- Check NEXTAUTH_SECRET is set correctly
- Ensure cookies are enabled in browser

## Free Tier Limits

### Vercel Free Tier:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL
- ✅ Custom domains
- ⚠️ Serverless functions: 100GB-hours/month

### MongoDB Atlas Free Tier:
- ✅ Free shared cluster available (limits apply)

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

---

**Your website is now live! 🎉**
