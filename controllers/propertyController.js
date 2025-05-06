const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

//Models
const Property = require("../models/Property");

const addProperty = asyncHandler(async (req, res) => {

    const newProperty = new Property({
        name: req.body.name
    });
    await newProperty.save();
    res.status(200).json({ message: "Property created successfully" });

})


const getAllProperty = asyncHandler(async (req, res) => {

    const propertyData = await Property.find({})
    res.status(200).json({ data: propertyData });
})

const editProperty = asyncHandler(async (req, res) => {

    const existingProperty = await Property.findOne({ _id: req.body.propertyId });;

    if (!existingProperty) {
        throw Object.assign(new Error("Property doesn't exist!"), { statusCode: 404 });
    }

    existingProperty.name = req.body.propertyName;

    await existingProperty.save();
    res.status(200).json({ message: "Property updated successfully" });

})

module.exports = { addProperty, getAllProperty, editProperty };