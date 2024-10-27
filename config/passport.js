const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');

// Passport JWT Strategy for authenticating users
module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Extract the JWT from the header
    opts.secretOrKey = process.env.JWT_SECRET || 'secret'; // Use the secret key from the .env file

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => { 
        try {
            const user = await User.findById(jwt_payload.id);  // Find the user by the ID from the JWT payload
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));
};
