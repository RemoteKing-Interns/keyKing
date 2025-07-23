import express from 'express';
import { IUser } from './index';

// Base request type with common properties
interface BaseRequest extends express.Request {
    params?: {
        id?: string;
        modelId?: string;
        variantId?: string;
    };
    body?: {
        name?: string;
        description?: string;
        price?: number;
        stock?: number;
        rating?: number;
        content?: string;
        userId?: string;
        brandId?: string;
        imageUrl?: string;
    };
}

// User-specific request type
interface UserRequest extends BaseRequest {
    body?: {
        name?: string;
        email?: string;
        password?: string;
        isAdmin?: boolean;
    };
}

// Authenticated request type
export interface AuthenticatedRequest extends BaseRequest {
    user?: {
        userId: string;
        isAdmin: boolean;
    };
}

// User routes
export interface RegisterRequest extends BaseRequest {
    body: {
        name: string;
        email: string;
        password: string;
    };
}

export interface LoginRequest extends BaseRequest {
    body: {
        email: string;
        password: string;
    };
}

export interface ProfileRequest extends AuthenticatedRequest {}

export interface DeleteUserRequest extends BaseRequest {
    params: {
        id: string;
    };
    user?: {
        userId: string;
    };
}

// Brand routes
export interface CreateBrandRequest extends BaseRequest {
    body: {
        name: string;
        description?: string;
    };
}

export interface GetBrandRequest extends BaseRequest {
    params: {
        id: string;
    };
}

export interface UpdateBrandRequest extends BaseRequest {
    params: {
        id: string;
    };
    body: {
        name?: string;
        description?: string;
    };
}

export interface DeleteBrandRequest extends BaseRequest {
    params: {
        id: string;
    };
}

// Model routes
export interface CreateModelRequest extends BaseRequest {
    body: {
        brandId: string;
        name: string;
        imageUrl?: string;
        description?: string;
    };
}

export interface GetModelRequest extends BaseRequest {
    params: {
        id: string;
    };
}

export interface UpdateModelRequest extends BaseRequest {
    params: {
        id: string;
    };
    body: BaseRequest['body'] & {
        brandId?: string;
        name?: string;
        imageUrl?: string;
        description?: string;
    };
}

export interface DeleteModelRequest extends BaseRequest {
    params: {
        id: string;
    };
}

// Variant routes
export interface CreateVariantRequest extends BaseRequest {
    body: {
        modelId: string;
        name: string;
        price: number;
        stock: number;
    };
}

export interface GetVariantRequest extends BaseRequest {
    params: {
        id: string;
    };
}

export interface UpdateVariantRequest extends BaseRequest {
    params: {
        id: string;
    };
    body: {
        modelId?: string;
        name?: string;
        price?: number;
        stock?: number;
        description?: string;
        content?: string;
        userId?: string;
        brandId?: string;
        imageUrl?: string;
    };
}

export interface DeleteVariantRequest extends BaseRequest {
    params: {
        id: string;
    };
}

// Comment routes
export interface CreateCommentRequest extends BaseRequest {
    body: {
        variantId: string;
        content: string;
        rating: number;
        userId: string;
    };
}

export interface GetCommentRequest extends BaseRequest {
    params: {
        id: string;
    };
}

export interface UpdateCommentRequest extends BaseRequest {
    params: {
        id: string;
    };
    body: {
        content?: string;
        rating?: number;
    };
}

export interface DeleteCommentRequest extends BaseRequest {
    params: {
        id: string;
    };
}

// Response types
export interface SuccessResponse {
    success: true;
    message?: string;
    data?: any;
}

export interface ErrorResponse {
    success: false;
    message: string;
    data?: any;
}

// Brand Routes
export interface BrandRoutes {
    create(req: CreateBrandRequest, res: express.Response): Promise<void>;
    getAll(req: express.Request, res: express.Response): Promise<void>;
    getOne(req: GetBrandRequest, res: express.Response): Promise<void>;
    update(req: UpdateBrandRequest, res: express.Response): Promise<void>;
    delete(req: DeleteBrandRequest, res: express.Response): Promise<void>;
}

// Model Routes
export interface ModelRoutes {
    create(req: CreateModelRequest, res: express.Response): Promise<void>;
    getAll(req: express.Request, res: express.Response): Promise<void>;
    getOne(req: GetModelRequest, res: express.Response): Promise<void>;
    update(req: UpdateModelRequest, res: express.Response): Promise<void>;
    delete(req: DeleteModelRequest, res: express.Response): Promise<void>;
}

interface CreateModelRequest extends express.Request {
    body: {
        brandId: string;
        name: string;
        imageUrl: string;
    };
}

interface GetModelRequest extends express.Request {
    params: {
        id: string;
    };
}

interface UpdateModelRequest extends express.Request {
    params: {
        id: string;
    };
    body: {
        brandId: string;
        name: string;
        imageUrl: string;
    };
}

interface DeleteModelRequest extends express.Request {
    params: {
        id: string;
    };
}

// Variant Routes
export interface VariantRoutes {
    create(req: CreateVariantRequest, res: express.Response): Promise<void>;
    getAll(req: express.Request, res: express.Response): Promise<void>;
    getOne(req: GetVariantRequest, res: express.Response): Promise<void>;
    update(req: UpdateVariantRequest, res: express.Response): Promise<void>;
    delete(req: DeleteVariantRequest, res: express.Response): Promise<void>;
}

interface CreateVariantRequest extends express.Request {
    body: {
        modelId: string;
        name: string;
        price: number;
        stock: number;
    };
}

interface GetVariantRequest extends express.Request {
    params: {
        id: string;
    };
}

interface UpdateVariantRequest extends express.Request {
    params: {
        id: string;
    };
    body: {
        modelId: string;
        name: string;
        price: number;
        stock: number;
    };
}

interface DeleteVariantRequest extends express.Request {
    params: {
        id: string;
    };
}

// Comment Routes
export interface CommentRoutes {
    create(req: CreateCommentRequest, res: express.Response): Promise<void>;
    getAll(req: express.Request, res: express.Response): Promise<void>;
    getOne(req: GetCommentRequest, res: express.Response): Promise<void>;
    update(req: UpdateCommentRequest, res: express.Response): Promise<void>;
    delete(req: DeleteCommentRequest, res: express.Response): Promise<void>;
}

interface CreateCommentRequest extends express.Request {
    body: {
        variantId: string;
        content: string;
        rating: number;
    };
}

interface GetCommentRequest extends express.Request {
    params: {
        id: string;
    };
}

interface UpdateCommentRequest extends BaseRequest {
    params: {
        id: string;
    };
    body: {
        content?: string;
        rating?: number;
    };
}

interface DeleteCommentRequest extends express.Request {
    params: {
        id: string;
    };
}
