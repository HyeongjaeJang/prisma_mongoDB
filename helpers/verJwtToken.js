const jwt = require("jsonwebtoken");
const isJwt = require("validator/lib/isJWT");

const verJwtToken = (tk) => {
  if (!isJwt(tk)) return null;

  return jwt.verify(tk, process.env.JWT_SECRET);
};

module.exports = verJwtToken;
