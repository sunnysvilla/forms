const express = require("express");
const router = express.Router();
const passport = require("passport");

//controllers
const propertyController = require("../../controllers/propertyController");


router.post("/addProperty", passport.authenticate('admin', { session: false }), propertyController.addProperty);
router.post("/editProperty", passport.authenticate('admin', { session: false }), propertyController.editProperty);
router.get("/getAllProperty", passport.authenticate('admin', { session: false }), propertyController.getAllProperty);

module.exports = router;