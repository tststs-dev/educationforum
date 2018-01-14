/**
 * Created by Stas on 27.07.2017.
 */
const User = require ('../db/models/user');
const crypto = require('../helpers/crypto');

module.exports.validateLogin = function (req, res, next) {
  req.sanitizeBody('email').trim();
  req.sanitizeBody('password').trim();

  req.checkBody('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Incorrect email');

  req.checkBody("password")
    .notEmpty().withMessage('Password is required')
    .matches(/^(?=.*?[A-z])(?=.*?[0-9]).{8,16}$/).withMessage('The password must contain at least one letter and a digit, and it length must be 8-16');

  return req.getValidationResult()
    .then(function(result) {
      if (!result.isEmpty()) {
        next({
          message: 'Validation error',
          result: false,
          errors: result.array(),
          status: 400
        });
      }
      next();
    });
};

module.exports.validateRegister = function (req, res, next) {
  req.sanitizeBody('email').trim();
  req.sanitizeBody('password').trim();
  req.sanitizeBody('confirmPassword').trim();

  req.checkBody('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Incorrect email');


  req.body.password = crypto.decryptFront(req.body.password);
  req.body.confirmPassword = crypto.decryptFront(req.body.confirmPassword);

  req.checkBody("password")
    .notEmpty().withMessage('Password is required')
    .matches(/^(?=.*?[A-z])(?=.*?[0-9]).{8,16}$/).withMessage('The password must contain at least one letter and a digit, and it length must be 8-16');

  return req.getValidationResult()
    .then(function(result) {
      return new Promise((resolve, reject) => {
        if (!result.isEmpty()) reject({
          message: 'Validation error',
          result: false,
          errors: result.array(),
          status: 400
        });
        if (req.body.password !== req.body.confirmPassword) reject({
          message: 'Validation error, passwords do not match',
          result: false,
          status: 400
        });
        resolve();
      })
    })
    .then(() => User.findOne({email: req.body.email}))
    .then(user => {
      return new Promise ((resolve, reject) => {
        if (user) reject({
          message: 'Validation error, user with this email already exists',
          result: false,
          status: 400
        });
        resolve();
      })
    })
    .then(() => next())
    .catch(err => next(err));
};

module.exports.validateConfirmEmail = function (req, res, next) {
  req.sanitizeQuery('hash').trim();

  req.checkQuery("hash")
    .notEmpty().withMessage('Hash is required');


  return req.getValidationResult()
    .then(function(result) {
      return new Promise((resolve, reject) => {
        if (!result.isEmpty()) reject({
          message: 'Validation error',
          result: false,
          errors: result.array(),
          status: 400
        });
        resolve();
      })
    })
    .then(() => next())
    .catch(err => next(err));
};

module.exports.validateFreeEmail = function (req, res, next) {
  req.sanitizeBody('email').trim();

  req.checkBody('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Incorrect email');

  return req.getValidationResult()
    .then(function(result) {
      if (!result.isEmpty()) {
        next({
          message: 'Validation error',
          result: false,
          errors: result.array(),
          status: 400
        });
      }
      next();
    });
};
