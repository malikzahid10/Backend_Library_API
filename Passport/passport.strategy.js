const passport = require("passport");

const { Strategy, ExtractJwt } = require("passport-jwt");
const { User, Roles, Permission } = require("../models");

require("dotenv").config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      const user = await User.findOne({
        where: { id: payload.id, isActive: true },
        include: [{ model: Roles, include: [Permission] }],
      });

      if (!user) {
        return done(null, false);
      }

      const roles = [];

      const permissions = [];

      for (const role of user.Roles) {
        roles.push(role.name);

        for (const permission of role.Permissions) {
          permissions.push(permission.permissions);
        }
      }

      return done(null, {
        id: user.id,
        email: user.email,
        roles: roles,
        permissions: [...new Set(permissions)],
      });
    },
  ),
);

module.exports = passport;
