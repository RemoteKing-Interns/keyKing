import mongoose from 'mongoose';
interface IBrand extends mongoose.Document {
    name: string;
    logoUrl: string;
    createdAt: Date;
}
export declare const brandSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    createdAt: Date;
    logoUrl?: string | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    createdAt: Date;
    logoUrl?: string | undefined;
}>> & mongoose.FlatRecord<{
    name: string;
    createdAt: Date;
    logoUrl?: string | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const _default: mongoose.Model<IBrand, {}, {}, {}, mongoose.Document<unknown, {}, IBrand> & IBrand & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
