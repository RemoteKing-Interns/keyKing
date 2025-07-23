import mongoose, { Schema } from 'mongoose';

interface IComment extends mongoose.Document {
    content: string;
    userId: mongoose.Types.ObjectId;
    variantId: mongoose.Types.ObjectId;
    rating: number;
    createdAt: Date;
}

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    variantId: {
        type: Schema.Types.ObjectId,
        ref: 'Variant',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: {
            validator: (v: number) => Number.isInteger(v),
            message: 'Rating must be an integer'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IComment>('Comment', commentSchema);
