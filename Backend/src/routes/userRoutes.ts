import express from 'express';
import { Request, Response, Router, NextFunction, RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { AuthenticatedRequest } from '../types/routes.d.ts';
import User from '../models/User';
import { IUser } from '../types';

interface DeleteUserRequest extends Request {
    params: {
        id: string;
    };
    user?: {
        userId: string;
    };
}

interface UserParams extends ParamsDictionary {
    id: string;
}

interface UserParamsRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
    params: UserParams;
    user?: {
        userId: string;
        email: string;
        name: string;
    };
}

const router: Router = express.Router();

// Middleware to validate user ID
const validateUserId = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = (req.params as { id: string }).id;
    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }
        next();
    } catch (error) {
        next(error as Error);
    }
};

// Middleware to authenticate user
const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
            // Get user from database to check admin status
            const user = await User.findById(decoded.userId) as IUser;
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }
            req.user = { 
                userId: decoded.userId,
                isAdmin: user.isAdmin
            };
            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
    } catch (error) {
        next(error as Error);
    }
};

interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
}

// Register new user
router.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Name, email, and password are required' 
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'Email already registered' 
            });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password
        });

        // Ensure password is set before saving
        if (!user.password) {
            return res.status(400).json({
                success: false,
                message: 'Password is required'
            });
        }

        // Save user with hashed password
        await user.save();
        res.status(201).json({ 
            success: true,
            message: 'User registered successfully' 
        });
    } catch (error: unknown) {
        console.error('Registration error:', error);
        if (error instanceof Error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        } else {
            res.status(500).json({ 
                success: false,
                message: 'Server error' 
            });
        }
    }
});

interface LoginRequestBody {
    email: string;
    password: string;
}

// Get all users (admin only)
router.get('/', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Only allow admins to access this endpoint
        if (!req.user?.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const users = await User.find({}, '-password'); // Exclude password field
        res.json({
            success: true,
            data: users
        });
    } catch (error: unknown) {
        console.error('Error fetching users:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }
    }
});

// Login user
router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // Validate request body
        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body format'
            });
        }

        console.log('Login attempt:', { email });
        
        if (!email.trim() || !password.trim()) {
            return res.status(400).json({ 
                success: false,
                message: 'Email and password are required' 
            });
        }

        // Explicitly select password field since it's set to select: false in schema
        const user = await User.findOne({ email }, '+password');
        console.log('Login attempt details:', {
            email,
            userExists: !!user,
            userId: user ? user.id : null
        });

        if (!user) {
            console.log('No user found with email:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Log password details before comparison
        console.log('Password details:', {
            passwordLength: password.length,
            storedPasswordLength: user.password ? user.password.length : 0,
            passwordHashed: !!user.password
        });

        const isMatch = await user.comparePassword(password);
        console.log('Password comparison result:', isMatch);

        if (!isMatch) {
            console.log('Password comparison failed');
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Ensure user has a password before comparing
        if (!user.password) {
            console.log('User has no password stored'); // Log if password is missing
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Log password comparison
        console.log('Comparing passwords:', { 
            passwordLength: password.length, // Don't log actual password for security
            storedPasswordLength: user.password.length
        });

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            console.log('Password comparison failed');
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error: unknown) {
        console.error('Login error:', error);
        if (error instanceof Error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        } else {
            res.status(500).json({ 
                success: false,
                message: 'Server error' 
            });
        }
    }
});

// Get user profile (protected route)
router.get('/profile', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized' 
            });
        }

        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error: unknown) {
        console.error('Profile error:', error);
        if (error instanceof Error) {
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        } else {
            res.status(500).json({ 
                success: false,
                message: 'Server error' 
            });
        }
    }
});

// Delete user (protected route)
router.delete('/:id', validateUserId, authenticateUser, async (req: AuthenticatedRequest & Request<{ id: string }>, res: Response) => {
    try {
        // Ensure user can only delete their own account
        if (!req.user || req.user.userId !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own account'
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error: unknown) {
        console.error('Error deleting user:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }
    }
});

export default router;
