import express, { Request, Response, Router, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Variant } from '../models/Variant';
import { CreateVariantRequest, GetVariantRequest, UpdateVariantRequest, DeleteVariantRequest } from '../types/routes';

const router: Router = express.Router();

// Middleware to validate variant ID
const validateVariantId = async (req: GetVariantRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Variant ID is required'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid variant ID'
            });
        }
        next();
    } catch (error) {
        next(error as Error);
    }
};

// Create a new variant
router.post('/', async (req: CreateVariantRequest, res: Response) => {
    try {
        const { name, modelId, price, stock } = req.body;
        if (!name || !modelId) {
            return res.status(400).json({ 
                success: false,
                message: 'Name and modelId are required' 
            });
        }
        
        // Check if model exists
        const model = await mongoose.model('Model').findById(modelId);
        if (!model) {
            return res.status(400).json({ 
                success: false,
                message: 'Model not found' 
            });
        }

        // Create new variant
        const variant = new Variant({
            name,
            modelId,
            price,
            stock
        });

        await variant.save();
        res.status(201).json({ 
            success: true,
            message: 'Variant created successfully',
            data: variant
        });
    } catch (error: unknown) {
        console.error('Create variant error:', error);
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

// Get variants by model ID
router.get('/model/:modelId', async (req: Request, res: Response) => {
    try {
        const { modelId } = req.params;
        
        // Validate model ID
        if (!mongoose.Types.ObjectId.isValid(modelId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid model ID' 
            });
        }
        
        // Check if model exists
        const model = await mongoose.model('Model').findById(modelId);
        if (!model) {
            return res.status(404).json({ 
                success: false, 
                message: 'Model not found' 
            });
        }
        
        // Find all variants for the model
        const variants = await Variant.find({ modelId });
        
        res.json({ 
            success: true, 
            data: variants 
        });
    } catch (error) {
        console.error('Error fetching variants by model ID:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching variants',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get all variants
router.get('/', async (req: Request, res: Response) => {
    try {
        const variants = await Variant.find().populate('modelId');
        res.json({
            success: true,
            data: variants
        });
    } catch (error: unknown) {
        console.error('Get variants error:', error);
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

// Get variant by ID
router.get('/:id', validateVariantId, async (req: GetVariantRequest, res: Response) => {
    try {
        const variant = await Variant.findById(req.params.id).populate('modelId');
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Variant not found'
            });
        }
        res.json({
            success: true,
            data: variant
        });
    } catch (error: unknown) {
        console.error('Get variant error:', error);
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

// Update variant
router.put('/:id', validateVariantId, async (req: express.Request, res: Response) => {
    const variantRequest = req as UpdateVariantRequest;
    try {
        const variant = await Variant.findById(req.params.id);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Variant not found'
            });
        }

        if (req.body?.modelId) {
            const model = await mongoose.model('Model').findById(req.body.modelId);
            if (!model) {
                return res.status(404).json({
                    success: false,
                    message: 'Model not found'
                });
            }
            variant.modelId = req.body.modelId;
        }

        if (req.body?.name) variant.name = req.body.name;

        await variant.save();
        res.json({
            success: true,
            data: variant
        });
    } catch (error: unknown) {
        console.error('Error updating variant:', error);
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

// Delete variant
router.delete('/:id', validateVariantId, async (req: DeleteVariantRequest, res: Response) => {
    try {
        const variant = await Variant.findByIdAndDelete(req.params.id);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Variant not found'
            });
        }
        res.json({
            success: true,
            message: 'Variant deleted successfully'
        });
    } catch (error: unknown) {
        console.error('Delete variant error:', error);
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
