import mongoose, { Schema } from 'mongoose';

interface IBrand extends mongoose.Document {
    name: string;
    logoUrl: string;
    createdAt: Date;
}

export const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    logoUrl: {
        type: String,
        trim: true,
        validate: {
            validator: (v: string) => /^https?:\/\/.+/.test(v),
            message: 'Logo URL must be a valid HTTP or HTTPS URL'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

brandSchema.pre('save', async function(this: IBrand, next) {
    if (this.isNew) {
        const existingBrand = await (this.constructor as mongoose.Model<IBrand>).findOne({ name: this.name });
        if (existingBrand) {
            throw new Error('Brand with this name already exists');
        }
    }
    next();
});

export default mongoose.model<IBrand>('Brand', brandSchema);
