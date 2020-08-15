const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Load User Model
const User = require('../models/User');

//sendgrid
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signUp = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '10m' }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `REON Account activation link`,
      html: `
                <h1>Please use the following link to activate your REON account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        // console.log('SIGNUP EMAIL SENT', sent)
        return res.json({
          message: `Email has been sent to ${email}. Follow the instruction to activate your REON account`
        });
      })
      .catch((err) => {
        // console.log('SIGNUP EMAIL SENT ERROR', err)
        return res.json({
          message: err.message
        });
      });
  });
};

const accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (
      err,
      decoded
    ) {
      if (err) {
        console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
        return res.status(401).json({
          error: 'Expired link. Signup again'
        });
      }

      const { name, email, password } = jwt.decode(token);

      const user = new User({ name, email, password });

      user.save((err, user) => {
        if (err) {
          console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
          return res.status(401).json({
            error: 'Error saving user in database. Try signup again'
          });
        }
        return res.json({
          message: 'Signup success. Please signin.'
        });
      });
    });
  } else {
    return res.json({
      message: 'Something went wrong. Try again.'
    });
  }
};

const signIn = (req, res) => {
  //find the user based on email
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    //if err or no user
    if (err || !user) {
      return res.status(401).json({
        error: 'User with that email does not exist. Please sign in.'
      });
    }
    //If user is found make sure the email and password match
    //create authenticate method in model and use here
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match'
      });
    }

    //generate a token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 'token' in cookie with expiry date
    res.cookie('token', token, { expire: 3600 });
    //return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: {
        _id,
        email,
        name,
        role
      }
    });
  });
};

const signOut = (req, res) => {
  const cookie = req.cookies;
  for (const prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }

    res.cookie(prop, '', { expire: new Date(0), maxAge: 0, overwrite: true });
    res.clearCookie(prop, '', {
      expire: new Date(0),
      maxAge: 0,
      overwrite: true
    });
  }
  res.clearCookie('token');
  return res.json({ msg: ' Signout successful!.' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist'
      });
    }

    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m'
    });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `REON Password Reset link`,
      html: `
                <h1>Please use the following link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        console.log('RESET PASSWORD LINK ERROR', err);
        return res.status(400).json({
          error: 'Database connection error on user password forgot request'
        });
      } else {
        sgMail
          .send(emailData)
          .then((sent) => {
            // console.log('SIGNUP EMAIL SENT', sent)
            return res.json({
              message: `Email has been sent to ${email}. Follow the instruction to reset your password`
            });
          })
          .catch((err) => {
            // console.log('SIGNUP EMAIL SENT ERROR', err)
            return res.json({
              message: err.message
            });
          });
      }
    });
  });
};

const resetPassword = async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(400).json({
          error: 'Expired link. Try again'
        });
      }

      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Something went wrong. Try later'
          });
        }

        const updatedFields = {
          password: newPassword,
          resetPasswordLink: ''
        };

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: 'Error resetting user password'
            });
          }
          res.json({
            message: `Great! Now you can login with your new password`
          });
        });
      });
    });
  }
};

const currentUser = async (req, res) => {
  // const user = await User.findById(req.user._id).select('-hashed_password');
  // const user = await User.findById(req.user.id).select('_id name email');

  // return res.json({
  //   user,
  // });

  try {
    await User.findById(req.user._id, (err, user) => {
      if (err) {
        return res.status(404).json({
          error: 'no user found'
        });
      }
      console.log(req.profile, req.user);
      res.json({
        user
      });
    }).select('_id name email');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUp,
  accountActivation,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
  currentUser
};
