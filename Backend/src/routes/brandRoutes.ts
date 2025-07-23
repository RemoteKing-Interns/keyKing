import express, { Request, Response, Router, NextFunction } from 'express';
import mongoose from 'mongoose';
import Brand from '../models/Brand';

interface BrandRequest extends Request {
    params: {
        id?: string;
    };
    body: {
        name?: string;
        logoUrl?: string;
    };
}

const router: Router = express.Router();

// Middleware to validate brand ID
const validateBrandId = async (req: BrandRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Brand ID is required'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid brand ID'
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

// Create a new brand
router.post('/', async (req: BrandRequest, res: Response) => {
    try {
        const { name, logoUrl } = req.body;
        if (!name) {
            return res.status(400).json({ 
                success: false,
                message: 'Brand name is required' 
            });
        }

        // Check if brand already exists
        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return res.status(400).json({ 
                success: false,
                message: 'Brand with this name already exists' 
            });
        }

        const brand = new Brand({
            name,
            logoUrl: logoUrl || ''
        });

        await brand.save();
        res.status(201).json({
            success: true,
            message: 'Brand created successfully',
            data: brand
        });
    } catch (error: unknown) {
        console.error('Error creating brand:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create brand',
                error: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to create brand',
                error: 'An unexpected error occurred'
            });
        }
    }
});

// Get all brands
router.get('/', async (req: Request, res: Response) => {
    try {
        const brands = await Brand.find()
            .sort({ name: 1 });
        res.json({
            success: true,
            data: brands
        });
    } catch (error: unknown) {
        console.error('Error fetching brands:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch brands',
                error: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch brands',
                error: 'An unexpected error occurred'
            });
        }
    }
});

// Get a single brand by ID
router.get('/:id', validateBrandId, async (req: BrandRequest, res: Response) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Brand not found'
            });
        }
        res.json({
            success: true,
            data: brand
        });
    } catch (error: unknown) {
        console.error('Error fetching brand:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch brand',
                error: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch brand',
                error: 'An unexpected error occurred'
            });
        }
    }
});

// Update a brand
router.put('/:id', validateBrandId, async (req: BrandRequest, res: Response) => {
    try {
        const { name, logoUrl } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Brand name is required'
            });
        }
        
        const brand = await Brand.findByIdAndUpdate(
            req.params.id,
            { name, logoUrl },
            { new: true }
        );
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Brand not found'
            });
        }
        res.json({
            success: true,
            data: brand
        });
    } catch (error: unknown) {
        console.error('Error updating brand:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update brand',
                error: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to update brand',
                error: 'An unexpected error occurred'
            });
        }
    }
});

// Delete a brand
router.delete('/:id', validateBrandId, async (req: BrandRequest, res: Response) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Brand not found'
            });
        }
        res.json({
            success: true,
            message: 'Brand deleted successfully'
        });
    } catch (error: unknown) {
        console.error('Error deleting brand:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete brand',
                error: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to delete brand',
                error: 'An unexpected error occurred'
            });
        }
    }
});

export default router;
