'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const myServer = supergoose(server.app);
const jwt = require('jsonwebtoken');
const { it } = require('@jest/globals');
process.env.SECRET = 'secretForTest';


describe('proof of life', () => {
  it('proof of life', () => {
    expect(true).toBeTruthy();
  });
});

