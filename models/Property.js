const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = property = mongoose.model("Property", propertySchema);