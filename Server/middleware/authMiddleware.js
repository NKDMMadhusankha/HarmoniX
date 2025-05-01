const jwt = require('jsonwebtoken');

module.exports = function (roles = []) {
  return function (req, res, next) {
    const token = req.header('x-auth-token');
    
    if (!token) {
      console.log('Authorization denied: No token provided');
      return res.status(401).json({ 
        success: false,
        message: 'Authorization denied: No token provided' 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check token expiration manually
      const now = Date.now().valueOf() / 1000;
      if (decoded.exp < now) {
        return res.status(401).json({
          success: false,
          message: 'Token expired',
          code: 'TOKEN_EXPIRED'
        });
      }

      req.user = decoded;
      console.log(`Token verified for user: ${decoded.id}, role: ${decoded.role}`);

      // Check if user role matches the required roles
      if (roles.length && !roles.includes(decoded.role)) {
        if (roles.includes('studio') && decoded.role !== 'studio') {
          console.log(`Forbidden: User role '${decoded.role}' does not match required role: studio`);
          return res.status(403).json({ 
            success: false,
            message: 'Forbidden: You do not have the required role for studio access' 
          });
        }

        console.log(`Forbidden: User role '${decoded.role}' does not match required roles: ${roles}`);
        return res.status(403).json({ 
          success: false,
          message: 'Forbidden: You do not have the required role' 
        });
      }

      next();
    } catch (error) {
      console.error('JWT Error:', error.name);
      
      const message = error.name === 'TokenExpiredError' 
        ? 'Token expired' 
        : 'Invalid token';
        
      res.status(401).json({ 
        success: false,
        message,
        code: error.name
      });
    }
  };
};