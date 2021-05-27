const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(200).json({
      message: "Compte utilisateur non authentifié!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(200).json({
        message: "Accès non authorisé!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};