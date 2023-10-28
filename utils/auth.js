// utils\auth.js

import { hashPassword, verifyPassword } from './utils/helperFunctions';
import User from './models/userModel';

const registerUser = async (username, password) => {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ username, password: hashedPassword });
    // Handle newUser (e.g., generate session, token, etc.)
  } catch (error) {
    console.error('Error registering user:', error);
    // Handle error (e.g., send error response)
  }
};

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.error('User not found');
      // Handle user not found (e.g., send error response)
      return;
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (isPasswordValid) {
      // Proceed with login (e.g., generate session, token, etc.)
    } else {
      console.error('Invalid password');
      // Handle invalid password (e.g., send error response)
    }
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error (e.g., send error response)
  }
};
