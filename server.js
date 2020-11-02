'use strict';

const express = require('express');
const cors = require('cors');

// Middleware
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');

// Routes
const authRoutes = require('./auth/routes/auth-router.js');
const v1Routes = require('./api/v1.js');
const v2Routes = require('./api/v2.js');

const app = express();

// global middleware
app.use(timeStamp);
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Definitions
app.use(authRoutes);
app.use('/api/v1/', v1Routes);
app.use('/api/v2/', v2Routes);

// 404
app.use('*', notFoundHandler);
// 500 Error Handler - last express route!
app.use(errorHandler);

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('Connected to port', port))
}
