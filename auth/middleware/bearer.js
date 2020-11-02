'use strict';

const chalk = require('chalk')
const users = require('../models/users-model.js')

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login')
  }

  try {
    const token = req.headers.authorization.split(' ').pop();
    const validUser = users.authenticateWithToken(token);
    req.user = validUser;
    req.token = token;
    next();
  } catch (e) {
    console.log(e, chalk.inverse.red('ERROR IN BEARER.JS'))
    next('Invalid Login');
  }
}
