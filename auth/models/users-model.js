'use strict';

const chalk = require('chalk');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: 'guest',
    enum: ['guest', 'author', 'editor', 'admit']
  },
});

users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
  console.log(chalk.greenBright('The password is'), this.password);
});

const roles = {
  guest: ['read'],
  author: ['read', 'create'],
  editor: ['read', 'update', 'delete'],
  admin: ['read', 'create', 'update', 'delete'],
}

users.methods.can = function (capability) {
  return roles[this.role].includes(capability);
}

users.methods.generateToken = function () {
  let tokenObject = {
    username: this.username,
    role: this.role,
    permissions: roles[this.role],
  }
  let options = {
    expiresIn: 300,
  }
  let token = jwt.sign(tokenObject, process.env.SECRET, options);
  return token;
}

users.statics.validateBasic = async function (username, password) {
  // Look up the user by the username
  let user = await this.findOne({ username: username });
  // Compare of the password sent against the password in the db
  let isValid = await bcrypt.compare(password, user.password)
  if (isValid) { return user; }
  else { return undefined; }
}

users.statics.authenticateWithToken = async function (token) {
  const parsedToken = jwt.verify(token, process.env.SECRET);
  const user = this.findOne({ username: parsedToken.username })
  return user;
}

module.exports = mongoose.model('users', users);
