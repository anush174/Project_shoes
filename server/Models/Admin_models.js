import mongoose from "mongoose";

const adminschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Admin", adminschema);