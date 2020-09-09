const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const resultRouter = require('./routes/resultRoutes');

const app = express();
app.use(express.json({ limit: '10kb' }));

app.use('/api/users', userRouter);
app.use('/api/results', resultRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
