const jwt = require("jsonwebtoken");

const validateUser = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    // Check for Bearer token
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "User not authorized"
      });
    }

    // Correct split by space
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Attach user to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = validateUser;
