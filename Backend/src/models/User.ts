import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
            message: 'Please enter a valid email'
        }
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6,
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            next(error);
        } else {
            next(new Error('Password hashing failed'));
        }
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for user URL
userSchema.virtual('url').get(function() {
    return `/api/users/${this.id}`;
});

export default mongoose.model<IUser>('User', userSchema);

// Export the interface for type declarations
export { IUser };
