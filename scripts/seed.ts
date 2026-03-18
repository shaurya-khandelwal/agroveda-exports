import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

function getMongoUri() {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL
  if (!uri) {
    throw new Error('Missing MONGODB_URI (or DATABASE_URL) environment variable')
  }
  return uri
}

function getMongoDbName(uri: string) {
  const fromEnv = process.env.MONGODB_DB
  if (fromEnv) return fromEnv

  try {
    const url = new URL(uri)
    const pathname = url.pathname.replace(/^\//, '')
    if (pathname) return pathname
  } catch {
    // ignore
  }

  return 'agroveda'
}

async function main() {
  const uri = getMongoUri()
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(getMongoDbName(uri))

  const users = db.collection('users')
  const productsCol = db.collection('products')
  const enquiries = db.collection('enquiries')

  await users.createIndex({ email: 1 }, { unique: true })
  await productsCol.createIndex({ slug: 1 }, { unique: true })
  await enquiries.createIndex({ productId: 1 })

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const now = new Date()

  await users.updateOne(
    { email: 'admin@agrovedaexports.com' },
    {
      $setOnInsert: {
        email: 'admin@agrovedaexports.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
        createdAt: now,
      },
      $set: { updatedAt: now },
    },
    { upsert: true }
  )

  console.log('Admin user ensured: admin@agrovedaexports.com')

  // Default products — can be edited later via the Admin dashboard
  const products = [
    {
      name: 'Turmeric',
      slug: 'turmeric',
      description: `Premium quality turmeric (Curcuma longa) sourced directly from the fertile farms of Erode and Nizamabad — India's largest turmeric-growing belts. Our turmeric is carefully harvested, sun-dried, and cold-ground to preserve its natural colour, aroma, and potency.

Why Choose Our Turmeric:
- Curcumin content: 3–5% (well above the industry average of 2%)
- Vibrant deep-orange colour with no artificial dyes or fillers
- Available as whole fingers, sliced, or fine powder
- APEDA-certified and compliant with EU, USA, and Gulf food-safety standards
- Packaged in moisture-barrier, food-grade materials (25 kg / 50 kg bulk bags or custom retail packs)

Applications:
Food manufacturing (curry pastes, spice blends, sauces), nutraceuticals & dietary supplements, natural cosmetics and skincare, Ayurvedic and herbal medicine formulations, and beverage industry (golden milk, health drinks).

Minimum Order Quantity: 500 kg | Lead Time: 7–14 business days`,
      price: 2.8,
      unit: '/kg',
      inStock: true,
      imageUrl: null,
    },
    {
      name: 'Ashwagandha',
      slug: 'ashwagandha',
      description: `Pure Ashwagandha (Withania somnifera) root and root powder sourced from organic-certified farms in Rajasthan and Madhya Pradesh — the heartland of Indian Ashwagandha cultivation. Known as the "King of Ayurvedic Herbs," our Ashwagandha undergoes rigorous quality control to deliver consistent withanolide potency.

Why Choose Our Ashwagandha:
- Withanolide content: ≥ 1.5% (KSM-66® equivalent available on request)
- Available as dried whole root, coarse powder, or fine powder
- Organic-certified (USDA & India Organic), non-GMO, and pesticide-screened
- Heavy-metal tested and microbiologically safe — compliant with US Pharmacopeia guidelines
- Packaged in food-grade kraft paper bags with moisture barriers (5 kg, 25 kg, 50 kg)

Applications:
Dietary supplements and adaptogens, pharmaceutical APIs, sports nutrition products, stress & sleep wellness brands, and Ayurvedic formulations.

Minimum Order Quantity: 100 kg | Lead Time: 7–10 business days`,
      price: 6.5,
      unit: '/kg',
      inStock: true,
      imageUrl: null,
    },
    {
      name: 'Moringa',
      slug: 'moringa',
      description: `Nutrient-dense Moringa (Moringa oleifera) leaf powder harvested from our partner farms in Tamil Nadu and Andhra Pradesh. Picked at peak maturity and gently shade-dried at low temperatures to retain maximum vitamins, minerals, and antioxidants — giving you a product that truly earns the title "Miracle Tree."

Why Choose Our Moringa:
- 25× more iron than spinach, 17× more calcium than milk, 15× more potassium than bananas
- 46 antioxidants and all 9 essential amino acids
- Bright green colour — a natural indicator of minimal heat exposure during processing
- Shade-dried and stone-ground; no bleaching, no additives
- Available as leaf powder, dried leaves (whole/crushed), or moringa seed powder
- Certified organic, HACCP-compliant, EU/NOP organic on request

Applications:
Health food and superfood products, dietary supplements and capsules, green smoothie powders and blends, infant nutrition, and nutraceutical manufacturing.

Minimum Order Quantity: 200 kg | Lead Time: 7–14 business days`,
      price: 4.2,
      unit: '/kg',
      inStock: true,
      imageUrl: null,
    },
    {
      name: 'Cumin',
      slug: 'cumin',
      description: `Premium Cumin (Cuminum cyminum) seeds and powder sourced from the sun-drenched fields of Rajasthan and Gujarat — accounting for over 70% of India's cumin output and renowned worldwide for their bold aroma and flavour. Our cumin is machine-cleaned, hand-sorted, and packed to guarantee purity and consistency in every batch.

Why Choose Our Cumin:
- Bold, warm aroma with high volatile oil content (≥ 2.5 ml/100g)
- Available as whole seeds (bold / medium grade), ground powder, and steam-sterilised varieties
- Purity: 99.5%+ (machine-cleaned and hand-picked, free from extraneous matter)
- Meets ASTA, ESA, and ISO 6465 quality specifications
- Ideal for Halal and Kosher-certified supply chains
- Packaged in food-safe woven PP bags or vacuum-sealed foil bags (10 kg, 25 kg, 50 kg)

Applications:
Spice blending and seasoning manufacturers, food service and restaurant supply chains, ready-meal and sauce producers, essential oil extraction, and retail consumer spice brands.

Minimum Order Quantity: 500 kg | Lead Time: 5–10 business days`,
      price: 3.5,
      unit: '/kg',
      inStock: true,
      imageUrl: null,
    },
  ]

  for (const product of products) {
    await productsCol.updateOne(
      { slug: product.slug },
      {
        $set: {
          ...product,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    )
    console.log(`Product ensured: ${product.name}`)
  }

  console.log('Database seeded successfully!')

  await client.close()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
