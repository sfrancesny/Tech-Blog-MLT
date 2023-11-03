// utils\helperFunctions.js

import { format } from 'date-fns';
import bcrypt from 'bcrypt';

export const formatTime = (date) => {
  return format(new Date(date), 'MMMM dd, yyyy h:mm aa');
};

export const truncateText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/login');
};

