import AWS from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

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

// Test file path
const testFilePath = `./test-${uuidv4()}.png`;
const fileName = `test-upload-${Date.now()}.png`;

async function testS3Upload() {
    try {
        // 1. Create a test image file
        console.log('🖼️  Creating test image file...');
        const testImage = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
            'base64'
        );

        await writeFile(testFilePath, testImage);
        console.log(`✅ Created test file: ${testFilePath}`);

        // 2. Read the file
        console.log('📖 Reading test file...');
        const data = await readFile(testFilePath);

        // 3. Upload to S3
        console.log('☁️  Uploading to S3...');
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `logos/${fileName}`,
            Body: data,
            ContentType: 'image/png',
            // Removed ACL as the bucket blocks public access
            // Files will be private by default
        };

        console.log('📤 Upload parameters:', {
            Bucket: params.Bucket,
            Key: params.Key,
            ContentType: params.ContentType,
            'Body size': data.length + ' bytes'
        });

        const uploadResult = await s3.upload(params).promise();
        console.log('✅ Successfully uploaded to S3:', uploadResult.Location);

        // 4. Verify the file exists in S3
        console.log('🔍 Verifying upload...');
        const headParams = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `logos/${fileName}`
        };

        const headResult = await s3.headObject(headParams).promise();
        console.log('✅ Verified: File exists in S3 with metadata:', {
            ContentLength: headResult.ContentLength,
            ContentType: headResult.ContentType,
            LastModified: headResult.LastModified
        });

        return uploadResult.Location;
    } catch (error) {
        console.error('❌ Error during S3 upload test:', {
            name: error.name,
            message: error.message,
            code: error.code,
            region: process.env.AWS_REGION,
            bucket: process.env.AWS_S3_BUCKET
        });
        throw error;
    } finally {
        // Clean up: Delete the test file
        try {
            if (fs.existsSync(testFilePath)) {
                await unlink(testFilePath);
                console.log('🧹 Cleaned up test file');
            }
        } catch (cleanupError) {
            console.error('⚠️  Error cleaning up test file:', cleanupError);
        }
    }
}

// Run the test
console.log('🚀 Starting S3 upload test...');
console.log('🌍 AWS Region:', process.env.AWS_REGION);
console.log('📦 S3 Bucket:', process.env.AWS_S3_BUCKET);

// Add a small delay to ensure all logs are shown
setTimeout(() => {
    testS3Upload()
        .then(url => console.log('✅ Test completed successfully! File URL:', url))
        .catch(() => process.exit(1))
        .finally(() => process.exit(0));
}, 100);
