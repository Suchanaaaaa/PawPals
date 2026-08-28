const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    console.log("No Authorization header received");
    return res.status(401).json({
      message: 'No token provided'
    });
  }

  try {
    const parts = authHeader.split(' ');

    console.log("Header parts:", parts);

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.log("Invalid Authorization format");
      return res.status(400).json({
        message: 'Invalid Authorization format'
      });
    }

    const token = parts[1];

    console.log("Token received:", token.substring(0, 20) + "...");

    const verified = jwt.verify(token, 'secretkey');

    console.log("Token verified:", verified);

    req.user = verified;
    next();

  } catch (err) {
    console.error("JWT ERROR:", err.name, err.message);

    return res.status(400).json({
      message: 'Invalid Token',
      error: err.message
    });
  }
};