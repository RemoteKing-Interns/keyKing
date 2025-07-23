import mongoose from 'mongoose';
import express from 'express';

// User types
export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Brand types
export interface IBrand extends mongoose.Document {
    name: string;
    logoUrl: string;
    createdAt: Date;
}

// Model types
export interface IModel extends mongoose.Document {
    brandId: mongoose.Types.ObjectId;
    name: string;
    imageUrl: string;
    createdAt: Date;
}

// Variant types
export interface IVariant extends mongoose.Document {
    modelId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    stock: number;
    createdAt: Date;
}

// Comment types
export interface IComment extends mongoose.Document {
    variantId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
    rating: number;
    createdAt: Date;
}

// Request types
export interface AuthenticatedRequest extends express.Request {
    user?: {
        userId: string;
    };
}

export interface UserRequest extends express.Request {
    body: {
        name?: string;
        email?: string;
        password?: string;
    };
}

// Response types
export interface SuccessResponse {
    success: true;
    data?: any;
    message?: string;
}

export interface ErrorResponse {
    success: false;
    message: string;
    error?: any;
}
