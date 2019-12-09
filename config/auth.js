const jwt = require("jsonwebtoken");
const keys = require("./jwtSecret");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("access denied");
  else {
    try {
      const verified = jwt.verify(token, keys.JWT_SECRET);
      req.use = verified;
      next();
    } catch (err) {
      return res.status(400).send("invalid token");
    }
  }
};
