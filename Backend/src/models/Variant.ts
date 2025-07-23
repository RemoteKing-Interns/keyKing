import mongoose, { Schema, Types, Document } from 'mongoose';

interface IVariant extends Document {
    _id: Types.ObjectId;
    name: string;
    modelId: Types.ObjectId;
    vehicleInfo: {
        country: string;
        series: string;
        body: string;
        engine: string;
        drive: string;
        dateRange: string;
        keyType: string;
        silcaKeyProfile: string;
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
            category: 'car' | 'key' | 'remote' | 'obd' | 'tool' | 'interior' | 'exterior' | 'dashboard' | 'other';
        }>;
    };
    emergencyStart: string;
    obdPortLocation: string;
    tools: Array<{
        name: string;
        models: string[];
    }>;
    programmingInfo: {
        remoteOptions: Array<{
            name: string;
            models: string[];
        }>;
        keyBladeOptions: Array<{
            name: string;
            models: string[];
        }>;
        cloningOptions: Array<{
            name: string;
            models: string[];
        }>;
        allKeysLost: Array<{
            name: string;
            models: string[];
        }>;
        addSpareKey: Array<{
            name: string;
            models: string[];
        }>;
        addRemote: Array<{
            name: string;
            models: string[];
        }>;
        pinRequired: Array<{
            name: string;
            models: string[];
        }>;
        pinReading: Array<{
            name: string;
            models: string[];
        }>;
    };
    pathways: Array<{
        name: string;
        path: string;
        version: string;
        notes: string;
    }>;
    resources: {
        quickReference: {
            emergencyStart: string;
            obdPortLocation: string;
            additionalNotes: Array<{
                title: string;
                content: string;
            }>;
        };
        videos: Array<{
            title: string;
            url: string;
            type: 'youtube' | 'native' | 'vimeo' | 'dailymotion' | 'other';
            embedId: string;
            description: string;
            duration: string;
            thumbnail: string;
            category: 'programming' | 'troubleshooting' | 'installation' | 'obd-guide' | 'general';
        }>;
        documents: Array<{
            title: string;
            url: string;
            category: 'programming-guide' | 'tool-manual' | 'specs' | 'troubleshooting' | 'installation' | 'other';
            fileType: 'pdf' | 'doc' | 'docx' | 'txt' | 'other';
            fileSize: string;
            description: string;
            toolBrand: string;
        }>;
        photos: Array<{
            src: string;
            alt: string;
            category: 'car' | 'key' | 'remote' | 'obd' | 'tool' | 'interior' | 'exterior' | 'dashboard' | 'other';
            description: string;
            isExpandable: boolean;
        }>;
        additionalTips: Array<{
            title: string;
            content: string;
            category: 'battery-tips' | 'obd-guide' | 'emergency-start' | 'troubleshooting' | 'general';
            priority: 'low' | 'medium' | 'high';
            icon: string;
        }>;
    };
    createdAt: Date;
    updatedAt: Date;
}

const variantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    modelId: {
        type: Schema.Types.ObjectId,
        ref: 'Model',
        required: true
    },
    vehicleInfo: {
        country: { type: String, trim: true },
        series: { type: String, trim: true },
        body: { type: String, trim: true },
        engine: { type: String, trim: true },
        drive: { type: String, trim: true },
        dateRange: { type: String, trim: true },
        keyType: { type: String, trim: true },
        // silcaKeyProfile: { type: String, trim: true },
        transponderChips: [{
            chip: { type: String, trim: true },
            link: { type: String, trim: true }
          }],   
        remoteFrequency: { type: String, trim: true },
       remoteKingParts: [{
            part: { type: String, trim: true },
            link: { type: String, trim: true }
          }],   
          Lishi: {
            name: { type: String, trim: true },
            link: { type: String, trim: true }
          },
          keyBladeProfile: { type: String, trim: true }, 
          keyBladeReferences: [{
            brand: { type: String, trim: true },  // e.g., "KD", "JMA", "Silica"
            refNo: { type: String, trim: true },
            link: { type: String, trim: true }
          }]
    },
    images: {
        car: {
            type: String,
            trim: true,
            default: "https://cdn.abacus.ai/images/75623b27-9642-41be-b8d7-74c062b4e41b.png"
        },
        key: {
            type: String,
            trim: true,
            default: "public/images/key1.png"
        },
        // referencePhotos: [{
        //     src: { type: String, required: true, trim: true },
        //     alt: { type: String, required: true, trim: true },
        //     category: {
        //         type: String,
        //         enum: ['car', 'key', 'remote', 'obd', 'tool', 'interior', 'exterior', 'dashboard', 'other'],
        //         default: 'other'
        //     },
        //     _id: false
        // }]
    },
    programmingInfo: {
        remoteOptions: [{
            name: { type: String, required: true, trim: true },
            models: [{ type: String, trim: true }]
        }],
        keyBladeOptions: [{
            name: { type: String, required: true, trim: true },
            models: [{ type: String, trim: true }]
        }],
        cloningOptions: [{
            name: { type: String, required: true, trim: true },
            models: [{ type: String, trim: true }]
        }],
        allKeysLost: [{
            name: { type: String, required: true, trim: true },
            models: [{ type: String, trim: true }]
        }],
        addSpareKey: [{
            name: { type: String, required: true, trim: true },
            models: [{ type: String, trim: true }]
        }],
        addRemote: [{
            name: { type: String, required: true, trim: true },
            models: [{ type: String, trim: true }]
        }],
        pinRequired: [{
            name: { type: String, required: true, trim: true },
            models: [{ type: String, trim: true }]
        }],
        pinReading: [{
            name: { type: String, required: true, trim: true },
            models: [{ type: String, trim: true }]
        }]
    },
    pathways: [{
        name: {
            type: String,
            trim: true
        },
        path: {
            type: String,
            trim: true
        },
        _id: false
    }],
    resources: {
        quickReference: {
            emergencyStart: { type: String, trim: true },
            obdPortLocation: { type: String, trim: true },
            additionalNotes: [{
                title: { type: String, trim: true },
                content: { type: String, trim: true },
                _id: false
            }]
        },
        videos: [{
            title: {
                type: String,
                required: true,
                trim: true
            },
            url: {
                type: String,
                required: true,
                trim: true
            },
            _id: false
        }],
        documents: [{
            title: {
                type: String,
                trim: true
            },
            url: {
                type: String,
                trim: true
            },
            _id: false
        }],
        photos: [{
            src: {
                type: String,
                trim: true
            },
            _id: false
        }],
        additionalTips: [{
            title: {
                type: String,
                required: true,
                trim: true
            },
            content: {
                type: String,
                required: true,
                trim: true
            },
            _id: false
        }]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Variant = mongoose.model<IVariant>('Variant', variantSchema);

export { Variant, IVariant };
