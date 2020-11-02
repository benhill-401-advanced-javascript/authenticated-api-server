'use strict';

module.exports = (req, res, next) => {
  console.log(req.method, req.path);
  console.log('Request Time: ', req.requestTime)
}