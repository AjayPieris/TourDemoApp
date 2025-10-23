// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path if needed

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: 'Authentication token required' }); // No token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

        // Find user and attach to request (excluding password)
        req.user = await User.findById(decoded.userId).select('-password');
        if (!req.user) {
            return res.status(403).json({ message: 'User not found' }); // User might have been deleted
        }
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification error:', err.message);
        if (err.name === 'TokenExpiredError') {
             return res.status(401).json({ message: 'Token expired' });
        }
         if (err.name === 'JsonWebTokenError') {
             return res.status(403).json({ message: 'Invalid token' });
         }
         return res.status(403).json({ message: 'Token is not valid' }); // Other errors
    }
};

// Middleware to check if the user is a guide
exports.isGuide = (req, res, next) => {
    if (req.user && req.user.role === 'guide') {
        next(); // User is a guide, proceed
    } else {
        res.status(403).json({ message: 'Access denied. Requires guide role.' }); // Forbidden
    }
};