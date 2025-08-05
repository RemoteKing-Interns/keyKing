require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const { Variant } = require('../dist/models/Variant');

// BMW X1 variant data
const bmwX1Variant = {
  rkid: 'BMWX1-001',
  name: 'BMW X1 (2010-2015) E84 & E84 LCI',
  modelId: new mongoose.Types.ObjectId('688700ab01ee774f0fd6ddd7'),
  vehicleInfo: {
    make: 'BMW',
    model: 'X1',
    series: 'E84, E84 LCI',
    yearRange: '2010-2015',
    keyType: 'Proximity, Slot Key',
    transponderChip: ['46-PHILIPS CRYPTO 2'],
    transponderChipLinks: ['https://www.remoteking.com.au/products/t-044'],
    remoteFrequency: '315 MHz',
    KingParts: ['SK-BMW-118'],
    KingPartsLinks: ['https://www.remoteking.com.au/products/sk-bmw-118'],
    Lishi: 'RK-LISHI-HU92',
    LishiLink: 'https://www.remoteking.com.au/products/rk-lishi-hu92'
  },
  keyBladeProfiles: {
    KD: { refNo: 'KD-BM6KD', link: 'https://www.remoteking.com.au/products/kd-bm6kd' },
    JMA: { refNo: 'NA', link: 'NA' },
    Silica: { refNo: 'NA', link: 'NA' }
  },
  images: {
    car: 'https://remoteking.s3.ap-southeast-2.amazonaws.com/models/x1.png',
    key: 'NA',
    referencePhotos: []
  },
  emergencyStart: 'Hold the key fob against the right side of the steering column and press the Start/Stop button with your foot on the brake.',
  obdPortLocation: "Driver's footwell, above the pedals, beneath a small cover near the hood release lever.",
  tools: [
    { name: 'Lishi HU92', models: ['BMW 1/3/X1 Series 2004-2013'] },
    { name: 'Autel IM608', models: ['IM608 Pro', 'IM608 Plus'] }
  ],
  programmingInfo: {
    method: 'OBD',
    steps: [
      'Connect diagnostic tool to OBD port',
      'Select BMW > X1 > Key Programming',
      'Follow on-screen instructions',
      'Enter security code if required'
    ]
  },
  pathways: [
    { name: 'Add Key', path: '/bmw/x1/add-key', version: '1.0', notes: 'Requires working master key' },
    { name: 'All Keys Lost', path: '/bmw/x1/akl', version: '1.0', notes: 'Requires security code' }
  ],
  resources: {
    quickReference: {
      emergencyStart: 'Hold key fob against steering column and press Start/Stop',
      obdPortLocation: 'Driver\'s footwell, above pedals'
    },
    videos: [
      { title: 'BMW X1 Key Programming', embedId: 'bmwx1-key-programming' }
    ]
  }
};

const sampleVariants = [bmwX1Variant];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Drop the variants collection
    console.log('Dropping existing variants collection...');
    try {
      await mongoose.connection.db.dropCollection('variants');
      console.log('✅ Dropped variants collection');
    } catch (err) {
      console.log('ℹ️ Variants collection does not exist, creating a new one...');
    }
    
    // Insert sample data
    console.log('Seeding variants...');
    const createdVariants = await Variant.insertMany(sampleVariants);
    console.log(`✅ Seeded ${createdVariants.length} variants`);
    
    // Verify the data was inserted
    const count = await Variant.countDocuments();
    console.log(`✅ Total variants in database: ${count}`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding database:');
    console.error(error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
