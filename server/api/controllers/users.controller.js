const mongoose = require('mongoose');
const crypto = require('crypto');
const User = mongoose.model('User');

exports.login = function (req, res, next) {
  if (req.session.user) return res.redirect('/');

  checkUser(req.body)
    .then(function (error, user) {
      if (user) {
        req.session.user = {id: user._id, name: user.name};
        res.redirect('/')
      } else {
        return next(error)
      }
    })
    .catch(function (error) {
      return next(error)
    })
};

exports.create = function (req, res, next) {
  createUser(req.body)
    .then(function (result) {
      console.log("User created")
    })
    .catch(function (err) {
      if (err.toJSON().code === 11000) {
        res.status(500).send("This email already exist")
      }
    })
};

exports.logout = function (req, res, next) {
  if (req.session.user) {
    delete req.session.user;

    res.redirect('/')
  }
};

const createUser = function (userData) {
  const user = {
    name: userData.name,
    email: userData.email,
    password: hash(userData.password)
  };

  return new User(user).save();
};

const getUser = function (id) {
  return User.findOne(id)
};

const checkUser = function (userData) {
  return User
    .findOne({email: userData.email})
    .then(function (doc) {
      if (doc.password === hash(userData.password)) {
        console.log("User password is ok");
        return Promise.resolve(doc)
      } else {
        return Promise.reject("Error wrong")
      }
    })
};

function hash(text) {
  return crypto
    .createHash('sha1')
    .update(text)
    .digest('base64');
}