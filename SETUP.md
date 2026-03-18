# Quick Setup Guide

Follow these steps to get your Agroveda Exports website up and running:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Environment File

Create a `.env` file in the root directory with the following content:

```env
MONGODB_URI="mongodb://127.0.0.1:27017/agroveda"
MONGODB_DB="agroveda"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
WHATSAPP_NUMBER=+91XXXXXXXXXX
```

**To generate a secure NEXTAUTH_SECRET**, run:
```bash
openssl rand -base64 32
```

Copy the output and paste it as your `NEXTAUTH_SECRET` value.

## Step 3: Set Up Database

```bash
# Seed database (creates admin user and products)
npm run seed
```

## Step 4: Seed Database

This will create:
- An admin user (email: `admin@agrovedaexports.com`, password: `admin123`)
- 4 products (Turmeric, Ashwagandha, Moringa, Chia Seeds)

```bash
npm run seed
```

**⚠️ IMPORTANT**: Change the admin password after first login!

## Step 5: Start Development Server

```bash
npm run dev
```

## Step 6: Open in Browser

Navigate to: [http://localhost:3000](http://localhost:3000)

## Access Admin Dashboard

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. You'll be redirected to sign in
3. Use credentials:
   - Email: `admin@agrovedaexports.com`
   - Password: `admin123`

## Next Steps

- Update contact information in Footer and CTA components
- Change WhatsApp number in EnquiryForm component
- Customize colors in `tailwind.config.js`
- Add your product images (update imageUrl in admin dashboard)

## Troubleshooting

### Database Issues
If you encounter database errors:
```bash
# Reset database
mongo agroveda --eval "db.dropDatabase()"  # or use MongoDB Compass
npm run seed
```

### Port Already in Use
If port 3000 is busy, Next.js will automatically use the next available port (3001, 3002, etc.)

### Module Not Found Errors
Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

Happy coding! 🚀
