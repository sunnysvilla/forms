const express = require("express");
const router = express.Router();
const passport = require("passport");

//controllers
const kycController = require("../../controllers/kycController");


router.post("/submit", kycController.addKyc);


module.exports = router;