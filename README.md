# Agroveda Exports Website

A modern, production-ready website for agricultural exports built with Next.js, TypeScript, MongoDB, and NextAuth.

## 🚀 Quick Deploy

**Want to deploy immediately?** Check out [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for a 5-minute deployment guide!

## Features

- 🏠 **Homepage** - Beautiful landing page with hero section, core values, product showcase, and services
- 📦 **Product Catalog** - Display all products (Turmeric, Ashwagandha, Moringa, Chia Seeds)
- 🔍 **Product Details** - Individual product pages with detailed descriptions
- 📧 **Enquiry System** - Contact form with email and WhatsApp integration
- 👤 **User Authentication** - Admin and customer roles
- 🛠️ **Admin Dashboard** - Manage products (Create, Read, Update, Delete)
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean, professional design inspired by agrowique.com
- ✅ **Production Ready** - Optimized for deployment with error handling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Hosting**: Vercel (free tier)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI="mongodb://127.0.0.1:27017/agroveda"
   MONGODB_DB="agroveda"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   WHATSAPP_NUMBER=+91XXXXXXXXXX
   ```

   Generate a secure `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

3. **Seed the database** (creates admin user and products):
   ```bash
   npm run seed
   ```

4. **Seed the database** (creates admin user and products):
   ```bash
   npm run seed
   ```

   Default admin credentials:
   - Email: `admin@agrovedaexports.com`
   - Password: `admin123`

   **⚠️ Important**: Change the admin password after first login!

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── products/     # Product CRUD endpoints
│   │   └── enquiries/    # Enquiry submission
│   ├── admin/            # Admin dashboard
│   ├── products/         # Product listing and detail pages
│   ├── auth/             # Sign in page
│   ├── error.tsx         # Error page
│   ├── not-found.tsx     # 404 page
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── EnquiryForm.tsx
│   ├── AdminDashboard.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── mongodb.ts        # MongoDB client/db
│   └── auth.ts           # Auth configuration
└── scripts/
    └── seed.ts           # Database seeding script
```

## Default Products

The seed script creates 4 products:
1. **Turmeric** - Premium turmeric powder
2. **Ashwagandha** - High-quality Ashwagandha root powder
3. **Moringa** - Nutrient-dense Moringa leaf powder
4. **Chia Seeds** - Premium quality Chia seeds

## Admin Features

- Access the admin dashboard at `/admin`
- Sign in with admin credentials
- Add new products
- Edit existing products
- Delete products
- View all products in a table format

## Enquiry System

- Users can submit enquiries for any product
- Enquiries are stored in the database
- WhatsApp link is generated for direct contact
- Email integration via Gmail compose

## Production Deployment

### Quick Deploy (5 minutes)

See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for fastest deployment.

### Detailed Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

### Free Hosting Options

1. **Vercel** (Recommended) - Best for Next.js
   - Free tier: Unlimited deployments, 100GB bandwidth
   - Automatic SSL, custom domains
   - [Deploy Now](https://vercel.com)

2. **Netlify** - Alternative option
   - Free tier available
   - Good for static sites

3. **Railway** - Full-stack hosting
   - Free tier with $5 credit/month

### Database Options (Free)

1. **MongoDB Atlas** (Recommended)
   - Free tier available
   - [Get Started](https://www.mongodb.com/atlas)

## Customization

### Update Contact Information

Edit the following files:
- `components/Footer.tsx` - Footer contact details
- `components/CTA.tsx` - Contact section
- `components/EnquiryForm.tsx` - WhatsApp number

### Change Colors

Modify `tailwind.config.js` to customize the color scheme.

### Add More Products

Use the admin dashboard or add them directly to the database.

## Security Notes

- ✅ Change default admin password immediately
- ✅ Use strong `NEXTAUTH_SECRET` in production
- ✅ Use environment variables for sensitive data
- ✅ Restrict DB network access (IP allowlist / VPC)
- ✅ Enable HTTPS (automatic with Vercel)
- ✅ Regular security updates

## Support

For issues or questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for quick setup
- Check Vercel/Next.js documentation

---

Built with ❤️ for Agroveda Exports
