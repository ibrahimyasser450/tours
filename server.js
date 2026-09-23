const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
}
process.on('unhandledRejection', (err) => {
  console.error('DB connection error');
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
});

module.exports = app;
