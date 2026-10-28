import mongoose from "mongoose";

const categoryschema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    },

    category_image: {
        type: String
    },

    description: {
        type: String
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Category", categoryschema);