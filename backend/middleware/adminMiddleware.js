const auth = require('./authMiddleware');

// Admin-only middleware
module.exports = [
  auth,
  (req, res, next) => {
    // Check if logged-in user is an admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access required'
      });
    }

    next();
  }
];
