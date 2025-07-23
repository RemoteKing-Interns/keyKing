import express, { Request, Response, Router, NextFunction } from 'express';
import mongoose from 'mongoose';
import Comment from '../models/Comment';
import { CreateCommentRequest, GetCommentRequest, UpdateCommentRequest, DeleteCommentRequest } from '@/types/routes';

const router: Router = express.Router();

// Middleware to validate comment ID
const validateCommentId = async (req: express.Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Comment ID is required'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid comment ID'
            });
        }
        next();
    } catch (error) {
        next(error as Error);
    }
};

// Create a new comment
router.post('/', async (req: CreateCommentRequest, res: Response) => {
    try {
        const { content, userId, variantId, rating } = req.body;
        if (!content || !userId || !variantId || rating === undefined) {
            return res.status(400).json({ 
                success: false,
                message: 'Content, userId, variantId, and rating are required' 
            });
        }
        
        // Check if variant exists
        const variant = await mongoose.model('Variant').findById(variantId);
        if (!variant) {
            return res.status(400).json({ 
                success: false,
                message: 'Variant not found' 
            });
        }

        // Check if user exists
        const user = await mongoose.model('User').findById(userId);
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        // Create new comment
        const comment = new Comment({
            content,
            userId: new mongoose.Types.ObjectId(userId),
            variantId: new mongoose.Types.ObjectId(variantId),
            rating
        });

        await comment.save();
        res.status(201).json({ 
            success: true,
            message: 'Comment created successfully',
            data: comment
        });
    } catch (error: unknown) {
        console.error('Create comment error:', error);
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

// Get all comments
router.get('/', async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find()
            .populate('userId', 'name')
            .populate('variantId');
        res.json({
            success: true,
            data: comments
        });
    } catch (error: unknown) {
        console.error('Get comments error:', error);
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

// Get comments by variant
router.get('/variant/:variantId', async (req: Request, res: Response) => {
    try {
        const variantId = req.params.variantId;
        if (!variantId) {
            return res.status(400).json({
                success: false,
                message: 'Variant ID is required'
            });
        }

        const comments = await Comment.find({ variantId })
            .populate('userId', 'name')
            .populate('variantId');
        res.json({
            success: true,
            data: comments
        });
    } catch (error: unknown) {
        console.error('Get comments by variant error:', error);
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

// Get comment by ID
router.get('/:id', validateCommentId, async (req: GetCommentRequest, res: Response) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('userId', 'name')
            .populate('variantId');
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }
        res.json({
            success: true,
            data: comment
        });
    } catch (error: unknown) {
        console.error('Get comment error:', error);
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

// Update comment
router.put('/:id', validateCommentId, async (req: express.Request<UpdateCommentRequest['params']>, res: Response) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        if (req.body?.content) comment.content = req.body.content;
        if (req.body?.rating !== undefined) comment.rating = req.body.rating;

        await comment.save();
        res.json({
            success: true,
            message: 'Comment updated successfully',
            data: comment
        });
    } catch (error: unknown) {
        console.error('Update comment error:', error);
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

// Delete comment
router.delete('/:id', validateCommentId, async (req: DeleteCommentRequest, res: Response) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }
        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error: unknown) {
        console.error('Delete comment error:', error);
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
