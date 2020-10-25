const mongoose = require('mongoose');
const logger = require('./logging');

const { MONGO_CONNECTION_STRING } = require('./config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const start = apiStartCallback =>
  db
    .on('error', () => logger.error('MongoDB connection error:'))
    .once('open', apiStartCallback);

module.exports = start;
