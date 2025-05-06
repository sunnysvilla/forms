const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

//Models
const Kyc = require("../models/Kyc");

const addKyc = asyncHandler(async (req, res) => {

    const newKyc = new Kyc({
        name: req.body.name,
        phone: req.body.phone,
        guests: req.body.guests,
        ids: req.body.ids,
        arrival: req.body.arrival
    });
    await newKyc.save();
    res.status(200).json({ message: "Form submitted succesfully" });

})


// const getAllProperty = asyncHandler(async (req, res) => {

//     const propertyData = await Property.find({})
//     res.status(200).json({ data: propertyData });
// })


module.exports = { addKyc };