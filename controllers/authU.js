const jwt = require('jsonwebtoken');

//Load User Model
const User = require('../models/User');
//sendgrid
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(403).json({ errors: [{ msg: 'Email is taken!' }] });
    }

    user = new User({
      name,
      email,
      password
    });

    const payload = {
      user: {
        id: user._id
      }
    };

    const token = jwt.sign(payload, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: '5 days'
    });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
      <h1>Please use the following link to activate your account</h1>
      <p>${process.env.CLIENT_URL}/auth/activate</p>
      <hr/>
      <p>This email may contain sensitive information</p>
      <p>${process.env.CLIENT_URL}</p>`
    };

    sgMail
    .send(emailData).then((sent) => {
      console.log('SIGNUP EMAIL SENT', sent);
      return res.json({
        message: `Email has been sent to ${email}.Follow the instructions to activate your account`
      });
    })
    .catch(err => {
      // console.log('SIGNUP EMAIL SENT ERROR', err)
      return res.json({
          message: err.message
      });
  });

    // user.save((err, user) => {
    //   if (err) {
    //     return res
    //       .status(401)
    //       .json({ error: 'Error saving user in the database.' });
    //   }

    // });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
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

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m'
    });
  });
};

const resetPassword = async (req, res) => {};

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
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
  currentUser
};
