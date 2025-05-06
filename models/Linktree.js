const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linktreeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = linktree = mongoose.model("Linktree", linktreeSchema);