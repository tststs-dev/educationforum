/**
 * Created by Stas on 24.07.2017.
 */
const User = require('../db/models/user');
const config = require('config');
const tokenHelper = require('../helpers/token');
const crypto = require('../helpers/crypto');
const mailer = require('../helpers/mailer');
const passwordGenerator = require('generate-password');

module.exports.confirmEmail = function (req, res, next) {
    return Promise.resolve(crypto.decrypt(req.query.hash))
        .then(email => User.findOne({email: email}))
        .then(user => {
            return new Promise((resolve, reject) => {
                if (!user) reject ({
                    status: 404,
                    message: "User with email " + crypto.decrypt(req.query.hash) + " not found"
                });
                else {
                    user.confirmed = true;
                    resolve(user.save());
                }
            })
        })
        .then(() => res.redirect('/login'))
        .catch(err => next(err))
};

module.exports.register = function (req, res, next) {
    let userObj = {
        email: req.body.email,
        passwordHash: crypto.encrypt(req.body.password),
    };

    User.create(userObj)
        .then(user => mailer.sendRegisterMessage(user, crypto.encrypt(user.email)))
        .then(() => {
            res.json({
                success: true
            }).status(200)
        })
        .catch(err => next(err));
};

module.exports.checkEmail = function (req, res, next) {
    return User.findOne({email: req.body.email})
        .then(user => {
            return new Promise((resolve, reject)=> {
                if (user) {
                    console.log('User with email ' + req.body.email + ' have already created');
                    reject({
                        success: false,
                        message: 'User with email ' + req.body.email + ' have already created',
                        status: 409
                    });
                }
                resolve();
            })
        })
        .then(result =>  res.json({success: true,}).status(200))
        .catch(err => next(err));
};

module.exports.login = function (req, res, next) {
  return User.findOne({email: req.body.email})
    .then(foundUser => {
      return new Promise((resolve, reject) => {
        if (!foundUser) {
          console.log('Incorrect username');
          reject({message: 'Incorrect username', status: 422});
        }
        if (foundUser.passwordHash !== crypto.encrypt(req.body.password)) {
          console.log("Incorrect password");
          reject({message: 'Incorrect password', status: 422});
        }
        if (!foundUser.confirmed) {
          console.log("Verify account");
          reject({message: 'Confirm ur email address', status: 403});
        }
        console.log('user with email' + foundUser.email + ' login successfully!!!!!!');
        resolve ({
          user: foundUser,
          accessTokenHash: tokenHelper.createAccessToken(foundUser),
          refreshTokenHash: tokenHelper.createRefreshToken(foundUser),
        });
      })
    })
    .then(loginRes => Session.create({
        userId: loginRes.user._id,
        refreshTokenHash: loginRes.refreshTokenHash,
      })
        .then(() => ({
          accessTokenHash: loginRes.accessTokenHash,
          refreshTokenHash: loginRes.refreshTokenHash
        }))
    )
    .then(session => res.json({
        accessTokenHash: session.accessTokenHash,
        refreshTokenHash: session.refreshTokenHash
      }).status(200)
    )
    //.then(session => res.redirect('/api/mailBox/messages'))
    .catch(err => next(err));
};

module.exports.logout = function (req, res, next) {
  return tokenHelper.deleteTokens(req.user._id)
    .then(() => {
      res.json({
        result: true,
        status: 200
      }).status(200)
    })
    .catch(err => next(err));
};

module.exports.checkAccessToken = function (req, res, next) {
  return tokenHelper.decodeAccessToken(req.get("Authorization"))
    .then(token => User.findById(token.body.id)
      .then(user =>
        new Promise((resolve, reject) => {
          if (user) {
            req.token = token;
            req.user = user;
            return next();
          }
          else {
            reject();
          }
        })
      ))
    .catch(err => next({
      status: 401,
      message: 'Unauthorized'
    }));
};

module.exports.refreshToken = function (req, res, next) {
  return tokenHelper.decodeAccessToken(req.get("Authorization"))
    .then(token => Session.findOne({userId : token.body.id}))
    .then(session =>
      new Promise((resolve, reject) => {
        if (session) {
          if (session.refreshTokenHash === req.get("Authorization")) {
            resolve(session.userId);
          }
          else reject ();
        }
        else reject();
      })
    )
    .then(userId => User.findById(userId))
    .then(user => ({
      user: user,
      accessTokenHash: tokenHelper.createAccessToken(user),
      refreshTokenHash: tokenHelper.createRefreshToken(user),
    }))
    .then(tokens => Session.findOneAndUpdate({userId: tokens.user._id},
      {
        refreshTokenHash: tokens.refreshTokenHash
      }, {'new': true, upsert : true, returnNewDocument : true})
      .then(() => tokens)
    )
    .then(token => res.json({
        accessTokenHash: token.accessTokenHash,
        refreshTokenHash: token.refreshTokenHash
      }).status(200)
    )
    .catch(err => next({
      status: 401,
      message: 'Unauthorized'
    }));
};

/*
 module.exports.resendConfirmMSG = function (req, res, next) {
 let email = req.body.email;
 return User.findOne({email: email})
 .then(user => {
 return new Promise ((resolve, reject) => {
 if (!user) reject({
 result: false,
 message: 'No user with email ' + email,
 status: 200
 });
 if (user.verify) reject({
 result: false,
 message: 'Your account already confirmed',
 status: 200
 });
 resolve(user);
 });
 })
 .then(user => tokenHelper.createVerifyToken(user))
 .then(result => mailer.sendConfirmEmail(result.user, result.token))
 .then(email => res.json({
 result: true,
 email: email
 }).status(200)
 )
 .catch(err => next(err));
 };

 module.exports.recoverPassword = function (req, res, next) {
 let email = req.body.email;
 let newPass;
 let username;

 return User.findOne({email: email})
 .then(user => {
 return new Promise ((resolve, reject) => {
 if (!user) reject ({
 result: false,
 message: 'Incorrect email',
 status: 200
 });
 if (!user.verify) reject ({
 result: false,
 message: 'Confirm your email address',
 status: 200
 });
 username = user.name;
 newPass = passwordGenerator.generate({
 length: 10,
 strict: true,
 numbers: true
 });
 resolve(newPass);
 });

 })
 .then(newPass => User.update({email: email}, { $set: {passwordHash: crypto.encrypt(newPass)}}))
 .then(() => mailer.sendRecoverPass({email: email, name: username}, newPass))
 .then(email => res.json({
 result: true,
 email: email
 }).status(200)
 )
 .catch(err => next(err));
 };*/
