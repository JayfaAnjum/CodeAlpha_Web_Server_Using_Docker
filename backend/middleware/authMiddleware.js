import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Middleware to protect routes by verifying JWT authentication token.
const protect = async (req, res, next) => {
  try {
    let token;

    // Check cookie first
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // Optional: check Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Token not provided.' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
    }

    req.user = await User.findById(decodedToken.userId).select('-password');

    if (!req.user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authentication failed: Token expired.' });
    }
    next(error);
  }
};

// Middleware to check if the user is an admin.
const admin = (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Authorization failed: Not authorized as an admin.' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { protect, admin };
