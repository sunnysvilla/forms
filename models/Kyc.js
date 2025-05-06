const mongoose = require("mongoose");
const Property = require("./Property");
const Schema = mongoose.Schema;

const kycSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    ids: [{
        type: String,
        required: true
    }],
    arrival: {
        type: Date
    }
});

module.exports = kyc = mongoose.model("Kyc", kycSchema);