const jwt = require('jsonwebtoken'); // Import jsonwebtoken

module.exports = function (req, res, next) {
    // Get the token from the request headers
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user data to the request object
        req.user = decoded;
        next(); // Call the next middleware or route handler
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};
