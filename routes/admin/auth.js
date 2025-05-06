const express = require("express");
const router = express.Router();
const passport = require("passport");

//controllers
const authController = require("../../controllers/authController");


router.post("/login", authController.login);
router.post("/changePassword", passport.authenticate('admin', { session: false }), authController.changePassword);
router.post("/newAdmin", authController.newAdmin); // need to delete on production

module.exports = router