'use strict';

const chalk = require('chalk');
const express = require('express');
const router = express.Router();

const userModel = require('../models/users-model.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const oAuth = require('../middleware/oauth.js');
const acl = require('../middleware/acl.js');

router.post('/signup', handleSignUp);
router.post('/signin', basicAuth, handleSignIn);
router.get('/allUsers', bearerAuth, getAllUsers);
router.get('/secret', bearerAuth, handleSecret);
router.get('/article', bearerAuth, acl('update'), userCanUpdate);
router.get('/article', bearerAuth, acl('create'), userCanCreate);
router.get('/article', bearerAuth, acl('read'), userCanRead);
router.get('/oauth', oAuth, handleOauth);

async function handleSignUp(req, res, next) {
  try {
    let obj = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    }
    let record = new userModel(obj);
    let newUser = await record.save();
    let token = record.generateToken();

    let output = {
      token: token,
      user: newUser,
    }
    res.set('auth', token);
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
}

async function handleSignIn(req, res, next) {
  try {
    let obj = {
      token: req.token,
      user: req.user,
    }
    res.set('auth', req.token);
    res.status(200).json(obj);
  } catch (e) {
    next(e);
  }
}

async function getAllUsers(req, res, next) {
  try {
    let allUsers = await userModel.find({});
    res.set('auth', req.token);
    res.status(200).json(allUsers);
  } catch (e) {
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send(`Valid token ${req.user.username}. Thank you!`);
}

function userCanUpdate(req, res, next) {
  res.status(200).send(chalk.greenBright('Authorized to update!'));
}

function userCanCreate(req, res, next) {
  res.status(200).send(chalk.greenBright('Authorized to create!'));
}

function userCanRead(req, res, next) {
  res.status(200).send(chalk.greenBright('Authorized to read!'));
}

function handleOauth(req, res, next) {
  let output = {
    token: req.token,
    user: req.user,
  }
  res.status(200).json(output);
}

module.exports = router;
