import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const staffSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 150
    },
    phone: {
        type: String,
        required: true,
        maxLength: 50
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true,
        maxLength: 255
    }
}, {
    timestamps: true,
    versionKey: false
});

staffSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default model("Staff", staffSchema);