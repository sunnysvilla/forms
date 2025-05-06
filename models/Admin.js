const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin'],
        required: true
    },
    permissions: {
        type: [String],
        default: ['read', 'write', 'delete'],
    },
    tokenVersion: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Admin = mongoose.model("admins", adminSchema);