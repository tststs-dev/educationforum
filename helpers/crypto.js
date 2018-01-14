/**
 * Created by Stas on 05.08.2017.
 */
const config = require('config');
const crypto = require('crypto');

module.exports.encrypt = function encrypt (text){
  let cipher = crypto.createCipher(config.crypto.algorithm, config.crypto.password);
  let crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};

module.exports.decrypt = function decrypt (text){
  let decipher = crypto.createDecipher(config.crypto.algorithm, config.crypto.password);
  let dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports.decryptFront = function decrypt (text){
  let decipher = crypto.createDecipher('aes-128-ecb', 'Forum20181ui237tb87x12b69');
  let dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};
