const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE;

let dbConnectionPromise;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  if (!dbConnectionPromise) {
    console.log('🔄 Connecting to MongoDB...');

    dbConnectionPromise = mongoose
      .connect(DB, {
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => {
        console.log('✅ DB connection successful!');
      })
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
    await connectDB();
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
