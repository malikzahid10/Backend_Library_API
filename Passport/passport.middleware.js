const passport = require("../Passport/passport.strategy");

const authenticateJwt = passport.authenticate("Jwt", { session: false });

module.exports = authenticateJwt;
