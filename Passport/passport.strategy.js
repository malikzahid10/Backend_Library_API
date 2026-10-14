const passport = require("passport");

const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("../models");
require("dotenv").config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({
          where: { id: payload.id, isActive: true },
        });
        if (!user) {
          return done(null, false);
        }
        return done(null, payload);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

module.exports = passport;
