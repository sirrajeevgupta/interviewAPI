const mongoose = require('mongoose');
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, clientOptions);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
