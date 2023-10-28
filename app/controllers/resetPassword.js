import { Router } from 'express';
const router = Router();
import { hash } from 'bcrypt';
import { User } from '../models';
import { randomBytes } from 'crypto';
import { createTransport } from 'nodemailer';

// transporter for sending emails
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'YourEmail@gmail.com',
    pass: 'YourEmailPassword'
  }
});

// Route to request a password reset
router.post('/requestReset', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'No account found with that email address.' });
    }

    const token = randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@minoritieslovetech.com',
      subject: 'MLT Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/resetPassword/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email: ', err);
        return res.status(500).json(err);
      }
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent successfully!' });
    });
  } catch (err) {
    console.error('Error during the password reset request: ', err);
    res.status(500).json(err);
  }
});

// route to render the password reset form
router.get('/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // render the reset password form
    res.render('resetPassword', { token: req.params.token });
  } catch (err) {
    console.error('Error during password reset: ', err);
    res.status(500).json(err);
  }
});

// route to update the password
router.post('/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    const hashedPassword = await hash(req.body.password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@minoritieslovetech.com',
      subject: 'Your password has been changed',
      text: `Hello,\n\nThis is a confirmation that the password for your account "${user.email}" has just been changed.\n`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email: ', err);
        return res.status(500).json(err);
      }
      console.log('Confirmation email sent: ' + info.response);
      res.json({ message: 'Password updated successfully!' });
    });
  } catch (err) {
    console.error('Error during password update: ', err);
    res.status(500).json(err);
  }
});

export default router;
