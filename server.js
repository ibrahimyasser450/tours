const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: './config.env' });
const app = require('./app');

console.log('🟢 SERVER.JS START');

console.log('DATABASE exists:', !!process.env.DATABASE);

console.log('🟡 BEFORE MONGOOSE CONNECT');

const dbConnection = mongoose.connect(process.env.DATABASE, {
  serverSelectionTimeoutMS: 5000,
});

console.log('🟡 AFTER MONGOOSE CONNECT');

dbConnection
  .then(() => {
    console.log('✅ DB CONNECTION SUCCESSFUL');
  })
  .catch((err) => {
    console.error('❌ DB CONNECTION FAILED:', err.message);
  });
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
