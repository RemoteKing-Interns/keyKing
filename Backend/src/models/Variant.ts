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
    KD?: { refNo: string; link: string };
    JMA?: { refNo: string; link: string };
    Silica?: { refNo: string; link: string };
  };
  images: {
    car: string;
    key?: string;
    referencePhotos?: Array<{
      src: string;
      alt: string;
      category: string;
    }>;
  };
  programmingInfo: {
    remoteOptions: Array<{
      name: string;
      models: string[];
      Color: string;
    }>;
    keyBladeOptions: Array<{
      name: string;
      models: string[];
      Color: string;
    }>;
    cloningOptions: Array<{
      name: string;
      models: string[];
      Color: string;
    }>;
    allKeysLost: Array<{
      name: string;
      models: string[];
      Color: string;
    }>;
    addSpareKey: Array<{
      name: string;
      models: string[];
      Color: string;
    }>;
    addRemote: Array<{
      name: string;
      models: string[];
      Color: string;
    }>;
    pinRequired: Array<{
      name: string;
      models: string[];
      Color: string;
    }>;
    pinReading: Array<{
      name: string;
      models: string[];
      Color: string;
    }>;
  };
  pathways: Array<{
    name: string;
    path: string;
    version?: string;
    notes?: string;
  }>;
  emergencyStart: string;
  obdPortLocation: string;
  resources: {
    quickReference: {
      emergencyStart: string;
      obdPortLocation: string;
    };
    videos: Array<{
      title: string;
      embedId: string;
    }>;
    documents: Array<{
      title: string;
      link: string;
    }>;
  };
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
    programmingInfo: {
      remoteOptions: [
        {
          name: String,
          models: [String],
          Color: String,
        },
      ],
      keyBladeOptions: [
        {
          name: String,
          models: [String],
          Color: String,
        },
      ],
      cloningOptions: [
        {
          name: String,
          models: [String],
          Color: String,
        },
      ],
      allKeysLost: [
        {
          name: String,
          models: [String],
          Color: String,
        },
      ],
      addSpareKey: [
        {
          name: String,
          models: [String],
          Color: String,
        },
      ],
      addRemote: [
        {
          name: String,
          models: [String],
          Color: String,
        },
      ],
      pinRequired: [
        {
          name: String,
          models: [String],
          Color: String,
        },
      ],
      pinReading: [
        {
          name: String,
          models: [String],
          Color: String,
        },
      ],
    },
    pathways: [
      {
        name: String,
        path: String,
        version: String,
        notes: String,
      },
    ],
    emergencyStart: String,
    obdPortLocation: String,
    resources: {
      quickReference: {
        emergencyStart: String,
        obdPortLocation: String,
      },
      videos: [
        {
          title: String,
          embedId: String,
        },
      ],
      documents: [
        {
          title: String,
          link: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Variant = mongoose.model<IVariant>('Variant', variantSchema);

export { Variant, IVariant };
