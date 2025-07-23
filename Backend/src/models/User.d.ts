import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

declare module '../models/User' {
    const User: mongoose.Model<IUser>;
    export default User;
}
