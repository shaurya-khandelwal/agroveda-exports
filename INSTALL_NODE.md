# Node.js Installation Required

To run this website, you need to install Node.js first.

## Quick Installation Options:

### Option 1: Using Homebrew (Recommended for macOS)
```bash
brew install node
```

### Option 2: Download from Official Website
1. Visit: https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Restart your terminal

### Option 3: Using nvm (Node Version Manager)
```bash
# Install nvm first
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Then install Node.js
nvm install --lts
nvm use --lts
```

## After Installing Node.js:

Once Node.js is installed, verify the installation:
```bash
node --version
npm --version
```

Then run the setup script:
```bash
cd "/Users/shauryakhandelwal/Documents/Agriveda exports"
./start.sh
```

Or manually:
```bash
npm install
npm run seed
npm run dev
```
