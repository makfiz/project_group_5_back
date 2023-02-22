const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const { dbUsers } = require("../models/user");
const bcrypt = require("bcrypt"); 
const { v4 } = require("uuid");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL_LOCALHOST, BASE_URL } = process.env;

const googleParams = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL}/api/users/google/callback`,
    passReqToCallback: true,
};

const googleCallback = async (req, accessToken, refreshToken, profile, done) => {
    try {
        const { email, displayName } = profile;
        const user = await dbUsers.findOne({ email });

        if (user) {
            return done(null, user);
        }

        const password = await bcrypt.hash(v4(), 10);
        const newUser = await dbUsers.create({ email, password, name: displayName, verifyEmail: true, verificationToken: "" });
        done(null, newUser);
        


    } catch (error) {
        done(error, false);
    }
}

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
