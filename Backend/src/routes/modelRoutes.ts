import express, { Request, Response, Router, NextFunction } from 'express';
import mongoose from 'mongoose';
import Model from '../models/Model';
import { CreateModelRequest, GetModelRequest, UpdateModelRequest, DeleteModelRequest } from '@/types/routes';

const router: Router = express.Router();

// Middleware to validate model ID
const validateModelId = async (req: GetModelRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Model ID is required'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid model ID'
            });
        }
        next();
    } catch (error: unknown) {
        console.error('Validate model ID error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Server error';
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
};

// Create a new model
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, brandId, imageUrl, description } = req.body;
        if (!name || !brandId) {
            return res.status(400).json({
                success: false,
                message: 'Name and brandId are required'
            });
        }

        // Check if brand exists
        const Brand = mongoose.model('Brand');
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(400).json({
                success: false,
                message: 'Brand not found'
            });
        }

        // Check if model name already exists for this brand
        const existingModel = await Model.findOne({ name, brandId });
        if (existingModel) {
            return res.status(400).json({
                success: false,
                message: 'Model with this name already exists for this brand'
            });
        }

        // Create new model
        const model = new Model({
            name,
            brandId,
            imageUrl,
            description
        });

        await model.save();
        res.status(201).json({
            success: true,
            message: 'Model created successfully',
            data: model
        });
    } catch (error: unknown) {
        console.error('Create model error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Server error';
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

// Get all models
router.get('/', async (req: Request, res: Response) => {
    try {
        const models = await Model.find()
            .populate('brandId', 'name')
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            data: models
        });
    } catch (error: unknown) {
        console.error('Error fetching models:', error);
        const errorMessage = error instanceof Error ? error.message : 'Server error';
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

// Get a single model
router.get('/:id', validateModelId, async (req: GetModelRequest, res: Response) => {
    try {
        const model = await Model.findById(req.params.id)
            .populate('brandId', 'name')
            .populate('variants');
        
        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Model not found'
            });
        }

        res.json({
            success: true,
            data: model
        });
    } catch (error: unknown) {
        console.error('Error fetching model:', error);
        const errorMessage = error instanceof Error ? error.message : 'Server error';
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

// Update a model
router.put('/:id', validateModelId, async (req: express.Request<{ id: string }, any, { name?: string; description?: string; price?: number; stock?: number; rating?: number; content?: string; userId?: string; brandId?: string; imageUrl?: string; }>, res: Response) => {
    try {
        const { name, brandId, imageUrl, description } = req.body;
        const model = await Model.findById(req.params.id);
        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Model not found'
            });
        }

        if (name) model.name = name;
        if (brandId) model.brandId = new mongoose.Types.ObjectId(brandId);
        if (imageUrl) model.imageUrl = imageUrl;
        if (description) model.description = description;

        await model.save();
        res.json({
            success: true,
            message: 'Model updated successfully',
            data: model
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'Error updating model',
            error: errorMessage
        });
    }
});

// Delete a model
router.delete('/:id', validateModelId, async (req: DeleteModelRequest, res: Response) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Model not found'
            });
        }

        await model.deleteOne();
        res.json({
            success: true,
            message: 'Model deleted successfully'
        });
    } catch (error: unknown) {
        console.error('Error deleting model:', error);
        const errorMessage = error instanceof Error ? error.message : 'Server error';
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

// Search models
router.get('/search', async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const models = await Model.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).populate('brandId', 'name');

        res.json({
            success: true,
            data: models
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'Error searching models',
            error: errorMessage
        });
    }
});

// Get models by brand
router.get('/brand/:brandId', async (req: Request, res: Response) => {
    try {
        const brandId = req.params.brandId;
        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid brand ID'
            });
        }

        const models = await Model.find({ brandId })
            .populate('brandId', 'name')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: models
        });
    } catch (error: unknown) {
        console.error('Error fetching models:', error);
        const errorMessage = error instanceof Error ? error.message : 'Server error';
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, brandId, imageUrl } = req.body;
        
        if (!name || !brandId) {
            return res.status(400).json({ 
                success: false,
                message: 'Name and brandId are required' 
            });
        }
        
        // Check if brand exists
        const Brand = mongoose.model('Brand');
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(400).json({ 
                success: false,
                message: 'Brand not found' 
            });
        }

        // Check if model name already exists for this brand
        const existingModel = await Model.findOne({ name, brandId });
        if (existingModel) {
            return res.status(400).json({
                success: false,
                message: 'Model with this name already exists for this brand'
            });
        }

        // Create new model
        const model = new Model({
            name,
            brandId,
            imageUrl
        });

        await model.save();
        res.status(201).json({ 
            success: true,
            message: 'Model created successfully',
            data: model
        });
    } catch (error: unknown) {
        console.error('Create model error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Server error';
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

// Get all models
router.get('/', async (req: Request, res: Response) => {
    try {
        const models = await Model.find()
            .populate('brandId', 'name')
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            data: models
        });
    } catch (error: unknown) {
        console.error('Get models error:', error);
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

// Get all models for a specific brand
router.get('/brand/:brandId', async (req: Request, res: Response) => {
    try {
        const brandId = req.params.brandId;
        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid brand ID'
            });
        }

        const models = await Model.find({ brandId })
            .populate('brandId')
            .sort({ name: 1 });

        if (!models || models.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No models found for this brand'
            });
        }

        res.json({
            success: true,
            data: models
        });
    } catch (error: unknown) {
        console.error('Get models by brand error:', error);
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

// Get model by ID
router.get('/:id', validateModelId, async (req: GetModelRequest, res: Response) => {
    try {
        const model = await Model.findById(req.params.id).populate('brandId');
        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Model not found'
            });
        }
        res.json({
            success: true,
            data: model
        });
    } catch (error: unknown) {
        console.error('Get model error:', error);
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

// Update model
router.put('/:id', validateModelId, async (req: express.Request<{ id: string }, any, { name?: string; description?: string; price?: number; stock?: number; rating?: number; content?: string; userId?: string; brandId?: string; imageUrl?: string; }>, res: Response) => {
    try {
        const { name, brandId, imageUrl, description } = req.body;
        const model = await Model.findById(req.params.id);
        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Model not found'
            });
        }

        // If changing brand, validate new brand
        if (brandId && model.brandId.toString() !== brandId) {
            const brand = await mongoose.model('Brand').findById(brandId);
            if (!brand) {
                return res.status(400).json({
                    success: false,
                    message: 'Brand not found'
                });
            }
            
            // Check if model name already exists for new brand
            const existingModel = await Model.findOne({
                name: model.name,
                brandId
            });
            if (existingModel) {
                return res.status(400).json({
                    success: false,
                    message: 'Model with this name already exists for the new brand'
                });
            }
        }

        if (brandId) {
            model.brandId = new mongoose.Types.ObjectId(brandId);
        }

        if (name) {
            // Check if new name already exists for current brand
            const existingModel = await Model.findOne({
                name,
                brandId: model.brandId
            });
            if (existingModel && existingModel._id.toString() !== req.params.id) {
                return res.status(400).json({
                    success: false,
                    message: 'Model with this name already exists for this brand'
                });
            }
            model.name = name;
        }

        if (imageUrl) model.imageUrl = imageUrl;
        if (description) model.description = description;

        await model.save();
        res.json({
            success: true,
            message: 'Model updated successfully',
            data: model
        });
    } catch (error: unknown) {
        console.error('Update model error:', error);
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

// Delete model
router.delete('/:id', validateModelId, async (req: DeleteModelRequest, res: Response) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Model not found'
            });
        }
        await Model.deleteOne({ _id: model._id });
        return res.status(200).json({
            success: true,
            message: 'Model deleted successfully'
        });
    } catch (error: unknown) {
        console.error('Delete model error:', error);
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

export default router
