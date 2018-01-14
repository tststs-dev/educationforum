/**
 * Created by Stas on 24.07.2017.
 */
const nJwt = require('njwt');
const config = require('config');

const Session = require('../db/models/session');
const User = require('../db/models/user');
const crypto = require('./crypto');

module.exports.createAccessToken = function (user) {
  let token = nJwt.create({
      id: user._id,
      email: user.email
    },
    config.jwt.jwtSecret);
  token.setExpiration(new Date().getTime() + (2*24*60*60*1000)); // 2 days
  return crypto.encrypt(String(token));
};

module.exports.createRefreshToken = function (user) {
  let token = nJwt.create({
      id: user._id,
      email: user.email
    },
    config.jwt.jwtSecret);
  token.setExpiration(new Date().getTime() + (30*24*60*60*1000*1000)); // 1 month
  return crypto.encrypt(String(token));
};

module.exports.decodeAccessToken = function (token) {
  return new Promise((resolve, reject) => {
    nJwt.verify(crypto.decrypt(String(token)),config.jwt.jwtSecret,function(err,verifiedJwt){
      if(err){
        if (err.userMessage === 'Jwt is expired') {
          console.log('Token is expired'); // Token has expired
          reject({
            status: 401,
            message: 'Token is expired',
            error: err
          });
        }
        else {
          console.log(err); // Token has been tampered with, etc
          reject({
            status: 409,
            message: 'Bad token',
            error: err
          });
        }
      }
      else{
        resolve(verifiedJwt);
      }
    });
  });
};

module.exports.decodeRefreshToken = function (token) {
  return new Promise((resolve, reject) => {
    nJwt.verify(crypto.decrypt(String(token)),config.jwt.jwtSecret,function(err,verifiedJwt){
      if(err){
        console.log(err); // Token has been tampered with, etc
        reject({
          status: 409,
          message: 'Bad token',
          error: err
        });
      }
      else{
        resolve(verifiedJwt);
      }
    });
  });
};


module.exports.deleteTokens = function (userId) {
  return User.findById(userId)
    .then((user) => {
      return new Promise((resolve, reject) => {
        if (!user) {
          reject ({
            status: 404,
            message: 'User not found'
          })
        }
        else {
          return user;
        }
      })
    })
    .then(user => Session.findOneAndRemove({userId: user._id}))
    .catch((err) => err)
};

