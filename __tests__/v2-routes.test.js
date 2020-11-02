'use strict';

const supergoose = require('@code-fellows/supergoose');
const { it } = require('@jest/globals');
const server = require('../server.js');
const myServer = supergoose(server.app);

// Helper Test Function
function propertiesMatch(obj, resultObj) {
  let allMatch = true;
  Object.keys(obj).forEach(key => {
    if (obj[key] !== resultObj[key]) { allMatch = false; }
  });
  return allMatch;
}

describe('Proof of life test', () => {
  it('Proof of life', () => {
    expect(true).toBeTruthy();
  });
});




