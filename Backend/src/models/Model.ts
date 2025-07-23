import mongoose, { Schema } from 'mongoose';

interface IModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    brandId: mongoose.Types.ObjectId;
    name: string;
    imageUrl: string;
    description: string;
    createdAt: Date;
    url: string;
    brandUrl: string;
    variants: mongoose.Types.ObjectId[];
}

const modelSchema = new Schema({
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    imageUrl: {
        type: String,
        trim: true,
        validate: {
            validator: (v: string) => /^https?:\/\/.+/.test(v),
            message: 'Image URL must be a valid HTTP or HTTPS URL'
        }
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual for model URL
modelSchema.virtual('url').get(function() {
    return `/api/models/${this.id}`;
});

// Virtual for brand URL
modelSchema.virtual('brandUrl').get(function() {
    return `/api/brands/${this.brandId}`;
});

// Virtual for variants
modelSchema.virtual('variants', {
    ref: 'Variant',
    localField: '_id',
    foreignField: 'modelId'
});

export default mongoose.model<IModel>('Model', modelSchema);
