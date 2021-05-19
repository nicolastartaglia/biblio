const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Aucun jeton fourni!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Accès non authorisé!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};