const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Load User Model
const User = require('../models/User');

//Load Profile Model
const Profile = require('../models/Profile');

const getUsers = (req, res) => {
  const users = User.find()
    .select('_id name email updated created')
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => console.log(err));
};

const getUserById = (req, res) => {
  console.log('UserId Handle: ', req.params.userId);
  const userId = req.params.userId;

  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;

    console.log(req.profile);
    res.status(200).json(user);
  });
};

const updateUser = async (req, res) => {
  const userFields = {};
  if (req.body.name) userFields.name = req.body.name;
  if (req.body.email) userFields.email = req.body.email;

  console.log('USERFIELDS: ', userFields);

  await User.findOneAndUpdate({ user: req.params.userId }, { $set: userFields })
    .then((user) => {
      console.log('USER ==== ', user);
      res.status(201).json({ user, msg: 'User successfully updated.' });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ error: 'Can not update the user at this time.' });
    });
};

const update = (req, res) => {
  console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA---', req.body);
  const { name, password } = req.body;
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password should be min 6 characters long'
        });
      } else {
        user.password = password;
      }
    }
    user.save((err, updatedUser) => {
      if (err) {
        console.log('USER UPDATE ERROR', err);
        return res.status(400).json({
          err: 'User update failed.'
        });
      }

      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;

      res.json(updatedUser);
    });
  });
};

const deleteUser = (req, res) => {
  let user = req.profile;
  console.log('USER: ', user);
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'Not authorize to delete a resourse.',
        msg: 'Not Authorize.'
      });
    }

    // user.hashed_password = undefined;
    // user.salt = undefined;
    res.json({ msg: 'user successfully deleted.' });
  });
};

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: 'User not found', msg: 'No user found.' });
    }

    // adds profile object in req with user info
    req.profile = user;

    next();
  });
};

module.exports = {
  getUsers,
  userById,
  getUserById,
  updateUser,
  update,
  deleteUser
};
