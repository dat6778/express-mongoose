import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const customerSchema = new Schema({
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
    phone: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 150
    },
    street: {
        type: String,
        required: true,
        maxLength: 255
    },
    city: {
        type: String,
        required: true,
        maxLength: 50
    },
    state: {
        type: String,
        required: true,
        maxLength: 50
    },
    zipCode: {
        type: String,
        maxLength: 5
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

customerSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default model("Customer", customerSchema);