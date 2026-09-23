const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: './config.env' });

// load the app but not execute it yet or not excute requests
const app = require('./app');

const DB = process.env.DATABASE;

// default null
let dbConnectionPromise;

const connectDB = () => {
  // connection = 0 means disconnected, 1 means connected so return this connection
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  // diconnected, so we need to do new connect to the database
  if (!dbConnectionPromise) {
    console.log('🔄 Connecting to MongoDB...');

    // try to make new connect to the database with a timeout of 10 seconds
    dbConnectionPromise = mongoose
      .connect(DB, {
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => {
        console.log('✅ DB connection successful!');
      })
      // because if this connection failed then we need to set dbConnectionPromise to null so that next time try to do new connect again
      .catch((err) => {
        dbConnectionPromise = null;
        console.error('❌ MongoDB connection failed:', err.message);
        throw err;
      });
  }

  return dbConnectionPromise;
};

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  });
}

const handler = async (req, res) => {
  try {
    // Ensure the database is connected before handling the request
    await connectDB();
    // If the database connection is successful, execute the app and requests
    return app(req, res);
  } catch (err) {
    console.error('Database unavailable:', err.message);

    return res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
};

module.exports = handler;
