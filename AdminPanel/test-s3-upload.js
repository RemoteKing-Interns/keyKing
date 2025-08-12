const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const express = require('express');
const multer = require('multer');
const cors = require('cors');

dotenv.config();

// Verify required environment variables
const requiredEnvVars = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_REGION',
    'AWS_S3_BUCKET'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`❌ Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

// Configure AWS
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Simple Express app with HTML form
const app = express();
app.use(cors());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const htmlPage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Test S3 Upload</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; padding: 24px; max-width: 720px; margin: 0 auto; }
      .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; }
      h1 { margin: 0 0 12px; }
      label { display:block; margin: 12px 0 6px; font-weight: 600; }
      input[type="text"], input[type="file"] { width: 100%; }
      button { background: #2563eb; color: #fff; border: 0; border-radius: 8px; padding: 10px 16px; margin-top: 16px; cursor: pointer; }
      .note { color: #6b7280; font-size: 14px; }
      .link { color: #2563eb; text-decoration: underline; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Upload image to S3</h1>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <label for="name">Brand name (optional)</label>
        <input id="name" name="name" type="text" placeholder="e.g. My Brand" />
        <label for="logo">Image</label>
        <input id="logo" name="logo" type="file" accept="image/*" required />
        <button type="submit">Upload</button>
      </form>
      <p class="note">Bucket: ${process.env.AWS_S3_BUCKET} | Region: ${process.env.AWS_REGION}</p>
    </div>
  </body>
</html>`;

app.get('/', (_req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlPage);
});

app.post('/upload', upload.single('logo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded. Ensure the field name is "logo".');
        }

        const key = `logos/${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        };

        const result = await s3.upload(params).promise();

        res.setHeader('Content-Type', 'text/html');
        res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Uploaded</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; padding: 24px; max-width: 720px; margin: 0 auto; }
      .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; }
      .link { color: #2563eb; text-decoration: underline; }
      img { max-width: 100%; height: auto; border: 1px solid #e5e7eb; border-radius: 8px; margin-top: 12px; }
      .meta { color: #6b7280; font-size: 14px; margin-top: 8px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Upload complete</h1>
      <p><strong>Key:</strong> ${result.Key}</p>
      <p><strong>Bucket:</strong> ${result.Bucket}</p>
      <p><strong>URL:</strong> <a class="link" href="${result.Location}" target="_blank" rel="noreferrer">${result.Location}</a></p>
      <div class="meta">Content-Type: ${req.file.mimetype} | Size: ${req.file.size} bytes</div>
      <p><a class="link" href="/">Upload another</a></p>
      <img src="data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}" alt="preview" />
    </div>
  </body>
</html>`);
    } catch (error) {
        console.error('❌ Error uploading:', error);
        res.status(500).send(`Upload failed: ${error.message}`);
    }
});

const PORT = process.env.FORM_PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 S3 upload form server running at http://localhost:${PORT}`);
    console.log('🌍 AWS Region:', process.env.AWS_REGION);
    console.log('📦 S3 Bucket:', process.env.AWS_S3_BUCKET);
});
