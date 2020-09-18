const mongoose = require('mongoose');
const dotenv = require('dotenv'); // to read config.env file

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHTEXCEPTION! SHUTTING DOWN...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
// console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLEDREJECTION! SHUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
});
