const jwt = require('jsonwebtoken');

module.exports = function (roles = []) {
  return function (req, res, next) {
    // Get the token from the headers
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if user role matches the required roles
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: 'Forbidden: You do not have the required role' });
      }

      next();
    } catch (error) {
      res.status(400).json({ msg: 'Token is not valid' });
    }
  };
};
