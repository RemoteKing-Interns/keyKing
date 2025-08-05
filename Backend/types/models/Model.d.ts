import mongoose from 'mongoose';
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
declare const _default: mongoose.Model<IModel, {}, {}, {}, mongoose.Document<unknown, {}, IModel> & IModel & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>;
export default _default;
