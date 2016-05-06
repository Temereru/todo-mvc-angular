var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');


var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  salt: String
});

UserSchema.methods.generateJWT = function() {
  //set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id:  this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, 'SECRET');
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  
  return this.password === hash;
};

var User = mongoose.model('User', UserSchema);

module.exports = User;