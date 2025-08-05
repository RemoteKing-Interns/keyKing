import mongoose, { Types, Document } from 'mongoose';
interface IVariant extends Document {
    _id: Types.ObjectId;
    rkid: string;
    name: string;
    modelId: Types.ObjectId;
    vehicleInfo: {
        make: string;
        model: string;
        series: string;
        yearRange: string;
        keyType: string;
        transponderChip: string[];
        transponderChipLinks: string[];
        remoteFrequency: string;
        KingParts: string[];
        KingPartsLinks: string[];
        Lishi: string;
        LishiLink: string;
    };
    keyBladeProfiles: {
        KD: {
            refNo: string;
            link: string;
        };
        JMA: {
            refNo: string;
            link: string;
        };
        Silica: {
            refNo: string;
            link: string;
        };
    };
    images: {
        car: string;
        key: string;
        referencePhotos: Array<{
            src: string;
            alt: string;
            category: string;
        }>;
    };
    emergencyStart: string;
    obdPortLocation: string;
    tools: Array<{
        name: string;
        models: string[];
    }>;
    programmingInfo: any;
    pathways: Array<{
        name: string;
        path: string;
        version: string;
        notes: string;
    }>;
    resources: any;
    createdAt: Date;
    updatedAt: Date;
}
declare const Variant: mongoose.Model<IVariant, {}, {}, {}, mongoose.Document<unknown, {}, IVariant> & IVariant & Required<{
    _id: Types.ObjectId;
}>, any>;
export { Variant, IVariant };
