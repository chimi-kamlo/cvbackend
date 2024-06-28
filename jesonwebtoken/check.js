
const jwt = require("jsonwebtoken");
const extractBearer = (authorization) => {
  if (typeof authorization != "string") {
    return false;
  }
  const matches = authorization.match(/(bearer)\s+(\S+)/i);

  return matches && matches[2];
};
const checktokenmaddleware = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, tokendecoded) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expiré" });
      }
      if (error.name === "JsonWebTokenError") {
        console.log(error)
        return res.status(401).json({ message: "Token invalide" });
      }
      return res.status(401).json({ message: "Erreur lors de la vérification du token" });
    }
    
    req.id = tokendecoded.id;

    // console.log(JSON.stringify(tokendecoded, null, 2));
    // console.log(req.user)
    next();
  });
};


module.exports = checktokenmaddleware;
