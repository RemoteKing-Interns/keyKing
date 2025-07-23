import express, { Request, Response, NextFunction, Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import brandRoutes from './routes/brandRoutes';
import modelRoutes from './routes/modelRoutes';
import variantRoutes from './routes/variantRoutes';
import commentRoutes from './routes/commentRoutes';
import { ErrorResponse } from './types/routes';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error: Error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/variants', variantRoutes);
app.use('/api/comments', commentRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
    const response: ErrorResponse = {
        success: false,
        message: 'Route not found'
    };
    res.status(404).json(response);
});

// Error handling middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const response: ErrorResponse = {
        success: false,
        message: err instanceof Error ? err.message : 'Something went wrong!'
    };
    res.status(500).json(response);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
