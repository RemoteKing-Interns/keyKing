import mongoose from 'mongoose';
interface IComment extends mongoose.Document {
    content: string;
    userId: mongoose.Types.ObjectId;
    variantId: mongoose.Types.ObjectId;
    rating: number;
    createdAt: Date;
}
declare const _default: mongoose.Model<IComment, {}, {}, {}, mongoose.Document<unknown, {}, IComment> & IComment & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
