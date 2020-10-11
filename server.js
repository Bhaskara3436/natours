const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1) Handling uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting Down ...');
  console.log(err.name, err.message);
  // But here it is mandatory
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

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
  .then(() => console.log('DB connection successful'));

const server = app.listen(1500, () => {
  console.log(
    'Listening for your commands in ' + process.env.NODE_ENV + ' mode sir...'
  );
});

//The last central SAFETY NET handlers
// 2) Handling the unhandled promise rejections -- For Asynchronous code
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting Down ...');
  console.log(err.name, err.message);
  server.close(() => {
    //This is optional here...
    process.exit(1);
  });
});
