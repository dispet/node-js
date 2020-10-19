const logger = require('./logging');
const notFoundError = require('./notfounderror');
const badRequestError = require('./badrequesterror');

const handle = (err, req, res, next) => {
  if (err instanceof notFoundError || err instanceof badRequestError) {
    logger.error(`Сode ${err.status}: ${err.shortMsg}`);
    res.status(err.status).send({ error: err.shortMsg });
  } else if (err) {
    logger.error(`Internal Server Error: ${err.stack || err.message}`);
    res.sendStatus(500);
  }

  next();
};

process.on('uncaughtException', err => {
  logger.error(`Uncaught exception: ${err.stack || err.message}`);
  logger.info('Shutting down');
  logger.finish(1);
});

process.on('unhandledRejection', (err, p) => {
  logger.error(
    `Unhandled exception: ${err.stack || err.message} at Promise ${p}`
  );
});

module.exports = handle;
