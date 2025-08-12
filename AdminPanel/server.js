const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Initialize dotenv
dotenv.config();

// Initialize Express app
const app = express();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: process.env.AWS_S3_BUCKET
  }
});

// Configure multer for file uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      try {
        const ext = path.extname(file.originalname).toLowerCase();
        const brandName = (req.body?.name || 'brand').toString();
        const safeName = brandName
          .replace(/[^a-z0-9]/gi, '-')
          .toLowerCase();
        const filename = `${Date.now()}-${safeName}${ext}`;
        console.log('Generating S3 key:', `logos/${filename}`);
        cb(null, `logos/${filename}`);
      } catch (error) {
        console.error('Error generating S3 key:', error);
        cb(error);
      }
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/keyking';
const DB_NAME = 'keyking';
const COLLECTION_NAME = 'brands';

let db;
let client;

async function connectMongo() {
  try {
    client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
}

// API Routes
app.post('/api/brands', (req, res, next) => {
  console.log('=== New Brand Request ===');
  console.log('Headers:', req.headers);

  // Log raw body for debugging
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    console.log('Raw request body (first 200 chars):', body.substring(0, 200));
    next();
  });
}, upload.single('logo'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    // Validate request
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ success: false, message: 'Please upload a logo' });
    }

    const brandName = req.body?.name?.trim();
    if (!brandName) {
      console.error('No brand name provided in request body');
      console.log('Available body fields:', Object.keys(req.body));
      return res.status(400).json({ success: false, message: 'Brand name is required' });
    }

    const brandData = {
      name: brandName,
      logoUrl: req.file.location,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Creating brand with:', brandData);

    // Insert into MongoDB
    const collection = db.collection(COLLECTION_NAME);
    const result = await collection.insertOne(brandData);

    console.log('Brand created successfully:', result.insertedId);

    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: {
        _id: result.insertedId,
        ...brandData
      }
    });

  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create brand',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all brands
app.get('/api/brands', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const brands = await collection.find({}).toArray();
    res.json({ success: true, data: brands });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch brands' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 3001;
connectMongo().then(connected => {
  if (connected) {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`MongoDB connected: ${MONGODB_URI}`);
      console.log(`S3 Bucket: ${process.env.AWS_S3_BUCKET}`);
    });
  } else {
    console.error('Failed to connect to MongoDB. Server not started.');
  }
});
