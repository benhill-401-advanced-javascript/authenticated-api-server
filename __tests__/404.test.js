'use strict';

const supergoose = require('@code-fellows/supergoose');
const { it } = require('@jest/globals');
const server = require('../server.js');

const request = supergoose(server.app);

describe('404 error test', () => {
  it('Should throw 404 if invalid route', async () => {
    let response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });
});

