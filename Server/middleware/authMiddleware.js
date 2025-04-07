const jwt = require('jsonwebtoken');

module.exports = function (roles = []) {
  return function (req, res, next) {
    // Get the token from the headers
    const token = req.header('x-auth-token');
    if (!token) {
      console.log('Authorization denied: No token provided');
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(`Token verified for user: ${decoded.id}, role: ${decoded.role}`);

      // Check if user role matches the required roles
      if (roles.length && !roles.includes(decoded.role)) {
        console.log(`Forbidden: User role '${decoded.role}' does not match required roles: ${roles}`);
        return res.status(403).json({ msg: 'Forbidden: You do not have the required role' });
      }

      next();
    } catch (error) {
      console.log('Invalid token:', error.message);
      res.status(400).json({ msg: 'Token is not valid' });
    }
  };
};
