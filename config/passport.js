const JwtStartegy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

//Models
const Admin = require("../models/Admin");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use('admin', new JwtStartegy(opts, (jwt_payload, done) => {
        Admin.findOne({ email: jwt_payload.email })
            .then(data => {
                if (!data) {
                    return done(null, false);
                }
                if (data.tokenVersion !== jwt_payload.tokenVersion) {
                    return done(null, false, { error: 'Token is no longer valid due to password change' });
                }
                return done(null, data);
            })
            .catch(err => console.log(err));
    }));
};