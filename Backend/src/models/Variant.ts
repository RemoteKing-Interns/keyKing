import mongoose, { Schema, Types, Document } from 'mongoose';

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
    KD: { refNo: string; link: string };
    JMA: { refNo: string; link: string };
    Silica: { refNo: string; link: string };
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

const variantSchema = new Schema<IVariant>(
  {
    rkid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelId: {
      type: Schema.Types.ObjectId,
      ref: 'Model',
      required: true,
    },
    vehicleInfo: {
      make: String,
      model: String,
      series: String,
      yearRange: String,
      keyType: String,
      transponderChip: [String],
      transponderChipLinks: [String],
      remoteFrequency: String,
      KingParts: [String],
      KingPartsLinks: [String],
      Lishi: String,
      LishiLink: String,
    },
    keyBladeProfiles: {
      KD: {
        refNo: String,
        link: String,
      },
      JMA: {
        refNo: String,
        link: String,
      },
      Silica: {
        refNo: String,
        link: String,
      },
    },
    images: {
      car: String,
      key: String,
      referencePhotos: [
        {
          src: String,
          alt: String,
          category: String,
        },
      ],
    },
    emergencyStart: String,
    obdPortLocation: String,
    tools: [
      {
        name: String,
        models: [String],
      },
    ],
    programmingInfo: Schema.Types.Mixed,
    pathways: [
      {
        name: String,
        path: String,
        version: String,
        notes: String,
      },
    ],
    resources: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

const Variant = mongoose.model<IVariant>('Variant', variantSchema);

export { Variant, IVariant };
