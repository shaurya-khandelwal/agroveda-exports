# Quick Start Guide

## To start the website, run these commands in your terminal:

### Option 1: Use the startup script (Recommended)

```bash
cd "/Users/shauryakhandelwal/Documents/Agriveda exports"
chmod +x start.sh
./start.sh
```

### Option 2: Manual setup

1. **Create .env file** (if it doesn't exist):
```bash
cd "/Users/shauryakhandelwal/Documents/Agriveda exports"
cat > .env << 'EOF'
MONGODB_URI="mongodb://127.0.0.1:27017/agroveda"
MONGODB_DB="agroveda"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=U/ENCzyJn7koaYU3LgEd5i9Gli0JdDK85R049sRG2Zo=
WHATSAPP_NUMBER=+919876543210
EOF
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up database**:
```bash
npm run seed
```

4. **Start the server**:
```bash
npm run dev
```

## Access the Website

Once the server is running, you can access:

- **Main Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Products Page**: http://localhost:3000/products

## Default Admin Credentials

- **Email**: admin@agrovedaexports.com
- **Password**: admin123

⚠️ **Important**: Change the admin password after first login!

## Troubleshooting

If you get port already in use error, the server will automatically use the next available port (3001, 3002, etc.)

If you encounter any issues, check the terminal output for error messages.
