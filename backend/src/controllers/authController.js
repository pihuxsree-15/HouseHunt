import User from '../models/User.js';
import { createToken } from '../utils/token.js';

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email, and password are required.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error('An account with this email already exists.');
    }

    const user = await User.create({ name, email, password, phone });
    res.status(201).json({ user: sanitizeUser(user), token: createToken(user) });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password.');
    }

    res.json({ user: sanitizeUser(user), token: createToken(user) });
  } catch (error) {
    next(error);
  }
};

export const me = (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};
