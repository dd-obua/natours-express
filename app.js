const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());

// Middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Moutning routers
app.use('/api/v1/tours', tourRouter); // middleware and sub application
app.use('/api/v1/users', userRouter);

module.exports = app;
