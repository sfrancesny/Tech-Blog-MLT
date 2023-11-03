// utils\auth.js
import User from '../app/models/userModel.js';

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

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.error('User not found');
      res.status(401).send('User not found');
      return;
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (isPasswordValid) {
      req.session.isAuthenticated = true;
      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      console.error('Invalid password');
      res.status(401).send('Invalid password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('An error occurred while trying to log in');
  }
};

export const logout = (req, res) => {
  // Clear the session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy the session during logout:', err);
      res.status(500).send('An error occurred while logging out');
    } else {
      // Redirect to the login page or home page
      res.redirect('/login');
    }
  });
}

export { registerUser, loginUser}
