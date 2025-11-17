import jwt from 'jsonwebtoken';

export const generateToken = (req, res, userId) => {
  const remember = req.body?.remember;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: remember ? 365 * 24 + 'h' : '24h'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true only in prod
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
    maxAge: remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
  });
};
