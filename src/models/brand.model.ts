import { Schema, model } from "mongoose";
import slugify from "slugify";

const brandSchema = new Schema({
    brandName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 100
    },
    description: {
        type: String,
        maxLength: 500,
        required: false
    },
    slug: {
        type: String,
        unique: true,
        maxLength: 100,
        lowercase: true
    }
}, {
    timestamps: true,
    versionKey: false
});

brandSchema.pre('save', function(next) {
    if (!this.slug) {
        this.slug = slugify(this.brandName, { lower: true });
    }
    next();
});

export default model("Brand", brandSchema);