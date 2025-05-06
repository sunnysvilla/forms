const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const Admin = require("../models/Admin");

const newAdmin = asyncHandler(async (req, res) => {
    const newAdmin = new Admin({
        email: "booking@sunnysvilla.com",
        password: "test",
        name: "Sunnys",
        role: "super-admin",
        permissions: ["read", "write", "delete"]
    })
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newAdmin.password, salt);
    newAdmin.password = hashedPassword;
    await newAdmin.save();
    return res.status(200).json({ message: "Admin created successfully" });
})


// Utility function to generate JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Login Handler
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const adminData = await Admin.findOne({ email: email });

    if (!adminData) {
        return res.status(404).json({ error: "Admin Account doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, adminData.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Password incorrect" });
    }

    const payload = { email: adminData.email, tokenVersion: adminData.tokenVersion };
    const token = generateToken(payload);

    res.status(200).json({ message: "Login successful", token: "Bearer " + token });
});

// Change Password Handler
const changePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminData = await Admin.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { password: hashedPassword, tokenVersion: req.user.tokenVersion + 1 } },
        { new: true }
    );

    if (!adminData) {
        return res.status(404).json({ error: "Admin account doesn't exist!" });
    }

    const payload = { email: adminData.email, tokenVersion: adminData.tokenVersion };
    const token = generateToken(payload);

    res.status(200).json({ message: "Password changed successfully", token: "Bearer " + token });
});

module.exports = { newAdmin, login, changePassword };
