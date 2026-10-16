const passport = require("../Passport/passport.strategy");

const authenticateJwt = passport.authenticate("jwt", { session: false });

module.exports = authenticateJwt;
