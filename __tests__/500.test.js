'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const myServer = supergoose(server.app);

describe('500 error test', () => {
  it('Bad category input should throw 500 error', async () => {
    let obj = {
      name: 'missing description',
    };
    let response = await myServer.post('/api/v1/categories').send(obj);
    expect(response.status).toEqual(500);
  });
});

