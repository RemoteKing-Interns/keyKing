const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    // Basic Vehicle Information
    make: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    model: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    variant: {
        type: String,
        required: true,
        trim: true
    },

    // Vehicle Technical Information (from vehicleInfo)
    vehicleInfo: {
        country: { type: String, trim: true },
        series: { type: String, trim: true },
        body: { type: String, trim: true },
        engine: { type: String, trim: true },
        drive: { type: String, trim: true },
        dateRange: { type: String, trim: true },
        keyType: { type: String, trim: true },
        silcaKeyProfile: { type: String, trim: true },
        transponderChip: [{ type: String, trim: true }],
        transponderChipLinks: [{ type: String, trim: true }],
        remoteFrequency: { type: String, trim: true },
        KingParts: [{ type: String, trim: true }],
        KingPartsLinks: [{ type: String, trim: true }],
        Lishi: { type: String, trim: true },
        LishiLink: { type: String, trim: true }
    },

    // Key Blade Profile References (from the component)
    keyBladeProfiles: {
        KD: {
            refNo: { type: String, trim: true },
            link: { type: String, trim: true }
        },
        JMA: {
            refNo: { type: String, trim: true },
            link: { type: String, trim: true }
        },
        Silica: {
            refNo: { type: String, trim: true },
            link: { type: String, trim: true }
        }
    },

    // Vehicle Images
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
        referencePhotos: [{
            src: { type: String, required: true, trim: true },
            alt: { type: String, required: true, trim: true },
            category: {
                type: String,
                enum: ['car', 'key', 'remote', 'obd', 'tool', 'interior', 'exterior', 'dashboard', 'other'],
                default: 'other'
            },
            _id: false
        }]
    },

    // Emergency Start and OBD Information
    emergencyStart: {
        type: String,
        default: "There is an emergency key position in the vehicle for starting when the remote battery is flat. The key is inserted near the gear lever and the remote buttons are pressed once when prompted.",
        trim: true
    },
    obdPortLocation: {
        type: String,
        default: "Under the dashboard, near pedals.",
        trim: true
    },

    // Programming Information (from programmingRows)
    programmingInfo: [{
        feature: {
            type: String,
            required: true,
            trim: true
        }, // e.g. "Remote Options", "Key Blade Options", "Cloning Options", etc.
        brands: [{
            name: {
                type: String,
                required: true,
                trim: true
            }, // e.g. "KD", "XH", "OEM", "Autel", "Lonsdor"
            color: {
                type: String,
                required: true,
                match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
            }, // Hex color code
            image: {
                src: { type: String, trim: true },
                alt: { type: String, trim: true }
            }, // Optional brand image for clickable badges
            models: [{
                type: String,
                trim: true
            }], // Supported models for this brand
            isSupported: {
                type: Boolean,
                default: true
            },
            notes: { type: String, trim: true },
            _id: false
        }],
        _id: false
    }],

    // Programming Tool Pathways
    pathways: [{
        name: {
            type: String,
            required: true,
            trim: true
        }, // e.g. "Autel", "Xhorse"
        path: {
            type: String,
            required: true,
            trim: true
        }, // e.g. "Alfa Romeo > ALL Remotes > Giulia"
        version: { type: String, trim: true },
        notes: { type: String, trim: true },
        _id: false
    }],

    // Resources Section (comprehensive)
    resources: {
        // Quick Reference Guide
        quickReference: {
            emergencyStart: { type: String, trim: true },
            obdPortLocation: { type: String, trim: true },
            additionalNotes: [{
                title: { type: String, trim: true },
                content: { type: String, trim: true },
                _id: false
            }]
        },

        // Training Videos
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
            type: {
                type: String,
                enum: ['youtube', 'native', 'vimeo', 'dailymotion', 'other'],
                default: 'youtube'
            },
            embedId: { type: String, trim: true }, // YouTube video ID for embedding
            description: { type: String, trim: true },
            duration: { type: String, trim: true }, // e.g. "5:30"
            thumbnail: { type: String, trim: true },
            category: {
                type: String,
                enum: ['programming', 'troubleshooting', 'installation', 'obd-guide', 'general'],
                default: 'programming'
            },
            _id: false
        }],

        // Documentation & Manuals
        documents: [{
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
            category: {
                type: String,
                enum: ['programming-guide', 'tool-manual', 'specs', 'troubleshooting', 'installation', 'other'],
                default: 'other'
            },
            fileType: {
                type: String,
                enum: ['pdf', 'doc', 'docx', 'txt', 'other'],
                default: 'pdf'
            },
            fileSize: { type: String, trim: true }, // e.g. "2.5MB"
            description: { type: String, trim: true },
            toolBrand: { type: String, trim: true }, // e.g. "Autel", "Xhorse", "Lonsdor"
            _id: false
        }],

        // Reference Photos (expandable)
        photos: [{
            src: {
                type: String,
                required: true,
                trim: true
            },
            alt: {
                type: String,
                required: true,
                trim: true
            },
            category: {
                type: String,
                enum: ['car', 'key', 'remote', 'obd', 'tool', 'interior', 'exterior', 'dashboard', 'other'],
                default: 'other'
            },
            description: { type: String, trim: true },
            isExpandable: { type: Boolean, default: true },
            _id: false
        }],

        // Additional Tips & Information (dropdown content)
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
            category: {
                type: String,
                enum: ['battery-tips', 'obd-guide', 'emergency-start', 'troubleshooting', 'general'],
                default: 'general'
            },
            priority: {
                type: String,
                enum: ['low', 'medium', 'high'],
                default: 'medium'
            },
            icon: { type: String, trim: true }, // e.g. "🔑", "🔌", "🚗"
            _id: false
        }]
    },

    // Customer Comments with Admin Approval
    comments: [{
        user: {
            type: String,
            required: true,
            default: 'Customer',
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        }, // Optional email for follow-up
        comment: {
            type: String,
            required: true,
            maxlength: 1000,
            trim: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }, // Optional rating 1-5 stars
        visibility: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
            index: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            index: true
        },
        approvedBy: { type: String, trim: true }, // Admin who approved/rejected
        approvedAt: { type: Date }, // When it was approved/rejected
        rejectionReason: { type: String, trim: true }, // Why it was rejected
        isHelpful: { type: Number, default: 0 }, // Helpful votes from other users
        _id: false
    }],

    // UI State and Display Options
    displayOptions: {
        showResourcesDropdown: { type: Boolean, default: true },
        showTextDropdown: { type: Boolean, default: true },
        defaultBrandFilter: { type: String, trim: true }, // Default brand to show
        featuredBrands: [{ type: String, trim: true }], // Brands to highlight
        hideEmptyFeatures: { type: Boolean, default: false }
    },

    // SEO and Search
    seoTitle: {
        type: String,
        trim: true,
        maxlength: 60
    },
    seoDescription: {
        type: String,
        trim: true,
        maxlength: 160
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }], // For search and categorization

    // Status and Visibility
    status: {
        type: String,
        enum: ['draft', 'published', 'archived', 'under-review'],
        default: 'published',
        index: true
    },

    // Priority and Featured
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },

    // Analytics and Usage
    viewCount: { type: Number, default: 0 },
    lastViewed: { type: Date },
    commentCount: { type: Number, default: 0 },

    // Metadata
    createdBy: { type: String, trim: true },
    updatedBy: { type: String, trim: true },
    version: { type: Number, default: 1 },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true,
    collection: 'vehicles',
    versionKey: false
});

// Compound Indexes for performance
VehicleSchema.index({ make: 1, model: 1, variant: 1 }, { unique: true });
VehicleSchema.index({ status: 1, isFeatured: -1 });
VehicleSchema.index({ tags: 1 });
VehicleSchema.index({ 'comments.visibility': 1, 'comments.createdAt': -1 });
VehicleSchema.index({ viewCount: -1 });
VehicleSchema.index({ createdAt: -1 });

// Text index for search functionality
VehicleSchema.index({
    make: 'text',
    model: 'text',
    variant: 'text',
    'vehicleInfo.series': 'text',
    'vehicleInfo.body': 'text',
    tags: 'text'
});

// Virtual for full vehicle name
VehicleSchema.virtual('fullName').get(function () {
    return `${this.make} ${this.model} ${this.variant}`;
});

// Virtual for approved comments count
VehicleSchema.virtual('approvedCommentsCount').get(function () {
    return this.comments.filter(comment => comment.visibility === 'approved').length;
});

// Virtual for unique brands in programming info
VehicleSchema.virtual('uniqueBrands').get(function () {
    const brands = new Set();
    this.programmingInfo.forEach(info => {
        info.brands.forEach(brand => brands.add(brand.name));
    });
    return Array.from(brands);
});

// Ensure virtual fields are serialized
VehicleSchema.set('toJSON', { virtuals: true });
VehicleSchema.set('toObject', { virtuals: true });

// Pre-save middleware
VehicleSchema.pre('save', function (next) {
    if (this.isModified() && !this.isNew) {
        this.updatedAt = new Date();
        this.version += 1;
    }
    // Update comment count
    this.commentCount = this.comments.filter(c => c.visibility === 'approved').length;
    next();
});

// Instance methods
VehicleSchema.methods.addComment = function (user, comment, email = null, rating = null) {
    this.comments.push({
        user: user,
        comment: comment,
        email: email,
        rating: rating,
        visibility: 'pending'
    });
    return this.save();
};

VehicleSchema.methods.moderateComment = function (commentIndex, visibility, approvedBy, rejectionReason = null) {
    if (this.comments[commentIndex]) {
        this.comments[commentIndex].visibility = visibility;
        this.comments[commentIndex].approvedBy = approvedBy;
        this.comments[commentIndex].approvedAt = new Date();
        if (rejectionReason) {
            this.comments[commentIndex].rejectionReason = rejectionReason;
        }
    }
    return this.save();
};

VehicleSchema.methods.incrementViewCount = function () {
    this.viewCount += 1;
    this.lastViewed = new Date();
    return this.save();
};

VehicleSchema.methods.getApprovedComments = function () {
    return this.comments.filter(comment => comment.visibility === 'approved');
};

VehicleSchema.methods.getBrandsByFeature = function (feature) {
    const info = this.programmingInfo.find(p => p.feature === feature);
    return info ? info.brands : [];
};

module.exports = mongoose.model('Vehicle', VehicleSchema);